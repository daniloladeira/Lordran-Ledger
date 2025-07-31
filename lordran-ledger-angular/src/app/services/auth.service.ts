import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode, JwtPayload } from 'jwt-decode';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface TokenResponse {
  access: string;
  refresh: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:8000/api';
  private readonly ACCESS_TOKEN_KEY = 'access_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.checkTokenOnInit();
  }

  private checkTokenOnInit(): void {
    if (isPlatformBrowser(this.platformId) && this.hasValidToken()) {
      this.isAuthenticatedSubject.next(true);
    }
  }

  login(credentials: LoginRequest): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.API_URL}/token/`, credentials)
      .pipe(
        tap(response => {
          this.setTokens(response.access, response.refresh);
          this.isAuthenticatedSubject.next(true);
        })
      );
  }

  logout(): void {
    this.clearTokens();
    this.isAuthenticatedSubject.next(false);
    this.currentUserSubject.next(null);
  }

  refreshToken(): Observable<TokenResponse> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    return this.http.post<TokenResponse>(`${this.API_URL}/token/refresh/`, {
      refresh: refreshToken
    }).pipe(
      tap(response => {
        this.setTokens(response.access, response.refresh);
      })
    );
  }

  isAuthenticated(): boolean {
    
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }
    
    const token = this.getAccessToken();
    if (!token) {
      return false;
    }

    const isExpired = this.isTokenExpired();
    
    const result = !isExpired;
    return result;
  }

  isTokenExpired(): boolean {
    
    const token = this.authenticatedToken();
    if (!token) {
      return true;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const expiration = decoded.exp ? decoded.exp * 1000 : null;
      
      if (!expiration) {
        return true;
      }

      const isExpired = expiration < Date.now();
      return isExpired;
    } catch (e) {
      return true;
    }
  }

  // Método compatível com o padrão do professor
  authenticatedToken(): string | null {
    
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem(this.ACCESS_TOKEN_KEY);
      return token;
    }
    return null;
  }

  getAccessToken(): string | null {
    return this.authenticatedToken();
  }

  getRefreshToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.REFRESH_TOKEN_KEY);
    }
    return null;
  }

  private setTokens(accessToken: string, refreshToken: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
      localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
    }
  }

  private clearTokens(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.ACCESS_TOKEN_KEY);
      localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    }
  }

  private hasValidToken(): boolean {
    return this.getAccessToken() !== null && !this.isTokenExpired();
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/profile/`);
  }
}

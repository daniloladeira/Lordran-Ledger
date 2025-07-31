import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Weapon } from '../models/weapon.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ApiWeaponService {
  private apiUrl = 'http://localhost:8000/artorias_api/weapons/';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getAccessToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getWeapons(): Observable<Weapon[]> {
    return this.http.get<Weapon[]>(this.apiUrl, {
      headers: this.getAuthHeaders(),
    });
  }

  getWeaponById(id: number): Observable<Weapon> {
    return this.http.get<Weapon>(`${this.apiUrl}${id}/`, {
      headers: this.getAuthHeaders(),
    });
  }

  addWeapon(weapon: Weapon): Observable<Weapon> {
    return this.http.post<Weapon>(this.apiUrl, weapon, {
      headers: this.getAuthHeaders(),
    });
  }

  updateWeapon(id: number, weapon: Weapon): Observable<Weapon> {
    return this.http.put<Weapon>(`${this.apiUrl}${id}/`, weapon, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteWeapon(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`, {
      headers: this.getAuthHeaders(),
    });
  }
}

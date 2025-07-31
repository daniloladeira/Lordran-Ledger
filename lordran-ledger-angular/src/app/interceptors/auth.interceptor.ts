import { HttpEvent, HttpHandlerFn, HttpRequest, HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  console.log('🚀 [AUTH INTERCEPTOR] Interceptor started for:', req.url);
  
  // Skip auth for login endpoints and static resources
  if (req.url.includes('/api/token') || req.url.includes('/images/')) {
    console.log('⏭️ [AUTH INTERCEPTOR] Skipping auth for login endpoint or static resource');
    return next(req);
  }

  const authService = inject(AuthService);

  // Check if token is expired
  if (authService.isTokenExpired()) {
    console.log('⏰ [AUTH INTERCEPTOR] Token expired, redirecting to login');
    const router = inject(Router);
    authService.logout();
    router.navigate(['/login']);
    return new Observable<HttpEvent<unknown>>((observer) => {
      observer.complete();
    });
  }

  // Add token to request
  const token = authService.authenticatedToken();
  console.log('🔑 [AUTH INTERCEPTOR] Token retrieved:', token ? `${token.substring(0, 20)}...` : 'NULL');
  
  if (token) {
    console.log('📤 [AUTH INTERCEPTOR] Adding Authorization header');
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('✅ [AUTH INTERCEPTOR] Request cloned with auth header');
    console.log('📋 [AUTH INTERCEPTOR] Headers:', cloned.headers.keys());

    return next(cloned).pipe(
      catchError(error => {
        console.log('❌ [AUTH INTERCEPTOR] Error caught:', error);
        if (error instanceof HttpErrorResponse && error.status === 401) {
          console.log('🚫 [AUTH INTERCEPTOR] 401 error detected, logging out user');
          authService.logout();
          inject(Router).navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }

  console.log('❌ [AUTH INTERCEPTOR] No token available, continuing without auth header');
  return next(req);
};

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
  
  // Skip auth for login endpoints and static resources
  if (req.url.includes('/api/token') || req.url.includes('/images/')) {
    return next(req);
  }

  const authService = inject(AuthService);

  // Check if token is expired
  if (authService.isTokenExpired()) {
    const router = inject(Router);
    authService.logout();
    router.navigate(['/login']);
    return new Observable<HttpEvent<unknown>>((observer) => {
      observer.complete();
    });
  }

  // Add token to request
  const token = authService.authenticatedToken();
  
  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next(cloned).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          authService.logout();
          inject(Router).navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }

  return next(req);
};

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Weapon } from '../models/weapon.model';

@Injectable({
  providedIn: 'root',
})

export class ApiWeaponService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8000/artorias_api/weapons/';

  getWeapons(): Observable<Weapon[]> {
    return this.http.get<Weapon[]>(this.apiUrl);
  }

  getWeaponById(id: number): Observable<Weapon> {
    return this.http.get<Weapon>(`${this.apiUrl}${id}/`);
  }

  addWeapon(weapon: Weapon): Observable<Weapon> {
    return this.http.post<Weapon>(this.apiUrl, weapon);
  }

  updateWeapon(id: number, weapon: Weapon): Observable<Weapon> {
    return this.http.put<Weapon>(`${this.apiUrl}${id}/`, weapon);
  }

  deleteWeapon(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
  }
}

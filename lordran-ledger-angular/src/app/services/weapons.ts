import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Weapon {
  id: string;
  name: string;
  image: string;
  description: string;
  category: string;
  weight: number;
  attack: { name: string; amount: number }[];
  defence: { name: string; amount: number }[];
  scalesWith: { name: string; scaling: string }[];
  requiredAttributes: { name: string; amount: number }[];
}

interface WeaponResponse {
  data: Weapon[];
}

@Injectable({
  providedIn: 'root',
})
export class WeaponsService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://eldenring.fanapis.com/api/weapons?limit=5';

  getWeapons(): Observable<Weapon[]> {
    return this.http.get<WeaponResponse>(this.apiUrl).pipe(
      map((res) => res.data)
    );
  }
}

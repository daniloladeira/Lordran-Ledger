import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Spell } from '../models/spell.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ApiSpellService {
  private apiUrl = 'http://localhost:8000/artorias_api/spells/';

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

  getSpells(): Observable<Spell[]> {
    console.log('🪄 [SPELL SERVICE] Making GET request to:', this.apiUrl);
    return this.http.get<Spell[]>(this.apiUrl, {
      headers: this.getAuthHeaders(),
    });
  }

  getSpellById(id: number): Observable<Spell> {
    return this.http.get<Spell>(`${this.apiUrl}${id}/`, {
      headers: this.getAuthHeaders(),
    });
  }

  addSpell(spell: Spell): Observable<Spell> {
    return this.http.post<Spell>(this.apiUrl, spell, {
      headers: this.getAuthHeaders(),
    });
  }

  updateSpell(id: number, spell: Spell): Observable<Spell> {
    return this.http.put<Spell>(`${this.apiUrl}${id}/`, spell, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteSpell(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`, {
      headers: this.getAuthHeaders(),
    });
  }
}

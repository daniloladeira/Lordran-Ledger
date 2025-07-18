import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Spell } from '../models/spell.model';

@Injectable({
  providedIn: 'root',
})
export class ApiSpellService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8000/artorias_api/spells/';

  getSpells(): Observable<Spell[]> {
    return this.http.get<Spell[]>(this.apiUrl);
  }

  getSpellById(id: number): Observable<Spell> {
    return this.http.get<Spell>(`${this.apiUrl}${id}/`);
  }

  addSpell(spell: Spell): Observable<Spell> {
    return this.http.post<Spell>(this.apiUrl, spell);
  }

  updateSpell(id: number, spell: Spell): Observable<Spell> {
    return this.http.put<Spell>(`${this.apiUrl}${id}/`, spell);
  }

  deleteSpell(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeaponCardComponent } from '../components/weapons/weapons.component';
import { ApiWeaponService } from '../services/weapon.service';
import { Weapon } from '../models/weapon.model';

@Component({
  selector: 'app-weapons-page',
  standalone: true,
  styleUrl: './weapon.page.component.scss',
  imports: [CommonModule, WeaponCardComponent],
  template: `
    <div class="cards-grid-container">
      <app-weapon-card
        *ngFor="let weapon of weapons"
        [weapon]="weapon"
        (view)="onViewWeapon($event)"
        (edit)="onEditWeapon($event)"
        (delete)="onDeleteWeapon($event)"
      ></app-weapon-card>
    </div>
  `,
})
export class WeaponsPageComponent implements OnInit {
  weapons: Weapon[] = [];

  constructor(private weaponsService: ApiWeaponService) {}

  ngOnInit(): void {
  this.weaponsService.getWeapons().subscribe({
    next: (data) => {
      console.log('Armas recebidas:', data);
      this.weapons = data;
    },
    error: (err) => console.error('Erro ao buscar armas:', err),
  });
}

  onViewWeapon(weapon: Weapon): void {
    console.log('Visualizar arma:', weapon);
  }

  onEditWeapon(weapon: Weapon): void {
    console.log('Editar arma:', weapon);
  }

  onDeleteWeapon(weapon: Weapon): void {
    if (confirm(`Tem certeza que quer deletar a arma ${weapon.name}?`)) {
      console.log('Arma deletada:', weapon);
    }
  }
}

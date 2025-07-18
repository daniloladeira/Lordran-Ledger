import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

export interface Weapon {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  weight: number;
  attack: { name: string; amount: number }[];
  defence: { name: string; amount: number }[];
  scalesWith: { name: string; scaling: string }[];
  requiredAttributes: { name: string; amount: number }[];
}

@Component({
  selector: 'app-weapon-card',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule],
  template: `
    <p-card [style]="{ width: '100%', overflow: 'hidden' }" styleClass="weapon-card">
      <ng-template pTemplate="header">
        <img
          [src]="weapon.image || 'https://via.placeholder.com/400x200?text=No Image'"
          [alt]="weapon.name"
          class="card-image"
        />
      </ng-template>

      <ng-template pTemplate="title">
        {{ weapon.name }}
      </ng-template>

      <ng-template pTemplate="subtitle">
        {{ weapon.category }} • Peso: {{ weapon.weight }}
      </ng-template>

      <ng-template pTemplate="content">
        <p>{{ weapon.description }}</p>

        <h5>Ataques:</h5>
        <ul class="specs-lista">
          <li *ngFor="let atk of weapon.attack">
            {{ atk.name }}: {{ atk.amount }}
          </li>
        </ul>

        <h5>Defesas:</h5>
        <ul class="specs-lista">
          <li *ngFor="let def of weapon.defence">
            {{ def.name }}: {{ def.amount }}
          </li>
        </ul>

        <h5>Escalas com atributos:</h5>
        <ul class="specs-lista">
          <li *ngFor="let scale of weapon.scalesWith">
            {{ scale.name }}: {{ scale.scaling }}
          </li>
        </ul>

        <h5>Atributos requeridos:</h5>
        <ul class="specs-lista">
          <li *ngFor="let req of weapon.requiredAttributes">
            {{ req.name }}: {{ req.amount }}
          </li>
        </ul>
      </ng-template>

      <ng-template pTemplate="footer">
        <div class="btn-container">
          <button pButton type="button" icon="pi pi-eye" label="Ver" (click)="view.emit(weapon)"></button>
          <button pButton type="button" icon="pi pi-pencil" label="Editar" (click)="edit.emit(weapon)"></button>
          <button pButton type="button" icon="pi pi-trash" label="Excluir" severity="danger" (click)="delete.emit(weapon)"></button>
        </div>
      </ng-template>
    </p-card>
  `,
  styles: [`
    .card-image {
      height: 200px;
      object-fit: cover;
    }
    
    .specs-lista {
      display: flex;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }

    .btn-container {
      display: flex;
      justify-content: space-between;
      gap: 0.5rem;
    }
  `]
})
export class WeaponCardComponent {
  @Input() weapon!: Weapon;
  @Output() view = new EventEmitter<Weapon>();
  @Output() edit = new EventEmitter<Weapon>();
  @Output() delete = new EventEmitter<Weapon>();
}

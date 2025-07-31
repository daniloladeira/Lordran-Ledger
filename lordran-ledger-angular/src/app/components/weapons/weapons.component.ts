import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Weapon } from '../../models/weapon.model';

@Component({
  selector: 'app-weapon-card',
  standalone: true,
  styleUrls: ['./weapons.component.scss'],
  imports: [CommonModule, CardModule, ButtonModule],
  template: `
    <p-card [style]="{ width: '25rem', overflow: 'hidden', padding: '15px' }" class="weapon-card">
      <ng-template pTemplate="header">
        <img
          [src]="weapon.image || 'https://via.placeholder.com/400x200?text=No Image'"
          [alt]="weapon.name"
          class="weapon-image"
        />
      </ng-template>

      <ng-template pTemplate="title">
        <h4>{{ weapon.name }}</h4>
        <span class="weapon-type">{{ weapon.type | titlecase }}</span>
      </ng-template>

      <p class="weapon-description">
        {{ weapon.description || 'Sem descrição' }}
      </p>

      <div class="weapon-section">
        <h5>Informações</h5>
        <ul>
          <li>Dano Físico: {{ weapon.physical_damage }}</li>
          <li>Peso: {{ weapon.weight }}</li>
        </ul>
      </div>

      <div class="weapon-section">
        <h5>Requisitos</h5>
        <ul>
          <li>Força: {{ weapon.strength_required }}</li>
          <li>Destreza: {{ weapon.dexterity_required }}</li>
        </ul>
      </div>

      <ng-template pTemplate="footer">
        <div class="weapon-actions">
          <button
            pButton
            severity="secondary"
            type="button"
            icon="pi pi-eye"
            label="Ver"
            (click)="view.emit(weapon)"
          ></button>
          <button
            pButton
            type="button"
            icon="pi pi-pencil"
            label="Editar"
            (click)="edit.emit(weapon)"
          ></button>
          <button
            pButton
            severity="danger"
            type="button"
            icon="pi pi-trash"
            label="Excluir"
            (click)="delete.emit(weapon)"
          ></button>
        </div>
      </ng-template>
    </p-card>
  `,
})
export class WeaponCardComponent {
  @Input() weapon!: Weapon;
  @Output() view = new EventEmitter<Weapon>();
  @Output() edit = new EventEmitter<Weapon>();
  @Output() delete = new EventEmitter<Weapon>();
}

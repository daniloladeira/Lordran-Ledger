import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Weapon } from '../../models/weapon.model';

@Component({
  selector: 'app-weapon-card',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule],
  template: `
    <p-card
      [style]="{ width: '25rem', overflow: 'hidden' }"
      class="weapon-card"
    >
      <ng-template #header>
        <img
          [src]="
            weapon.image || 'https://via.placeholder.com/400x200?text=No+Image'
          "
          [alt]="weapon.name"
          class="weapon-image"
        />
      </ng-template>

      <ng-template #title>
        {{ weapon.name }}
      </ng-template>

      <ng-template #subtitle>
        {{ weapon.type | titlecase }} • Peso: {{ weapon.weight }}
      </ng-template>

      <p class="weapon-description">
        {{ weapon.description }}
      </p>

      <div class="weapon-section">
        <h5>Dano</h5>
        <ul>
          <li>Físico: {{ weapon.physical_damage }}</li>
          <li>Mágico: {{ weapon.magic_damage }}</li>
          <li>Fogo: {{ weapon.fire_damage }}</li>
          <li>Raio: {{ weapon.lightning_damage }}</li>
          <li>Crítico: {{ weapon.critical }}</li>
        </ul>
      </div>

      <div class="weapon-section">
        <h5>Durabilidade</h5>
        <p>{{ weapon.durability }}</p>
      </div>

      <div class="weapon-section">
        <h5>Atributos Requeridos</h5>
        <ul>
          <li>Força: {{ weapon.strength_required }}</li>
          <li>Destreza: {{ weapon.dexterity_required }}</li>
          <li>Inteligência: {{ weapon.intelligence_required }}</li>
          <li>Fé: {{ weapon.faith_required }}</li>
        </ul>
      </div>

      <ng-template #footer>
        <div class="weapon-actions">
          <button
            pButton
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
            type="button"
            icon="pi pi-trash"
            label="Excluir"
            severity="danger"
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

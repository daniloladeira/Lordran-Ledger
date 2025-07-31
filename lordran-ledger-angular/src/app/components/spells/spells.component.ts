import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Spell } from '../../models/spell.model';

@Component({
  selector: 'app-spell-card',
  standalone: true,
  styleUrls: ['./spells.component.scss'],
  imports: [CommonModule, CardModule, ButtonModule],
  template: `
    <p-card [style]="{ width: '25rem', overflow: 'hidden', padding: '15px' }" class="spell-card">
      <ng-template pTemplate="header">
        <img
          src="https://via.placeholder.com/400x200?text=Spell"
          [alt]="spell.name"
          class="spell-image"
        />
      </ng-template>

      <ng-template pTemplate="title">
        {{ spell.name }}
      </ng-template>

      <ng-template pTemplate="subtitle">
        {{ spell.school | titlecase }}
      </ng-template>

      <p class="spell-description">
        {{ spell.description || 'Sem descrição' }}
      </p>

      <div class="spell-section">
        <h5>Custo</h5>
        <ul>
          <li>FP: {{ spell.cost_fp }}</li>
        </ul>
      </div>

      <div class="spell-section">
        <h5>Requisitos</h5>
        <ul>
          <li>Inteligência: {{ spell.intelligence_required }}</li>
        </ul>
      </div>

      <div class="spell-section">
        <h5>Tipo</h5>
        <ul>
          <li *ngIf="spell.is_offensive">Ofensivo</li>
          <li *ngIf="!spell.is_offensive">Defensivo</li>
        </ul>
      </div>

      <ng-template pTemplate="footer">
        <div class="spell-actions">
          <button
            pButton
            severity="secondary"
            type="button"
            icon="pi pi-eye"
            label="Ver"
            (click)="view.emit(spell)"
          ></button>
          <button
            pButton
            type="button"
            icon="pi pi-pencil"
            label="Editar"
            (click)="edit.emit(spell)"
          ></button>
          <button
            pButton
            type="button"
            icon="pi pi-trash"
            label="Excluir"
            severity="danger"
            (click)="delete.emit(spell)"
          ></button>
        </div>
      </ng-template>
    </p-card>
  `,
})
export class SpellCardComponent {
  @Input() spell!: Spell;
  @Output() view = new EventEmitter<Spell>();
  @Output() edit = new EventEmitter<Spell>();
  @Output() delete = new EventEmitter<Spell>();
}

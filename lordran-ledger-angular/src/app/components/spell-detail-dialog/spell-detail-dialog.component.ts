import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; // para *ngIf e pipes
import { DialogModule } from 'primeng/dialog'; // p-dialog
import { ButtonModule } from 'primeng/button'; // p-button

import type { Spell } from '../../models/spell.model';

@Component({
  selector: 'app-spell-detail-dialog',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule],
  template: `
    <p-dialog
      [(visible)]="displayDetailDialog"
      header="Detalhes do Feitiço"
      [modal]="true"
      [closable]="true"
      [style]="{ width: '600px' }"
      *ngIf="selectedSpell"
      (onHide)="onClose()"
    >
      <div class="detail-content">
        <div class="detail-header">
          <img
            [src]="selectedSpell.image || 'https://via.placeholder.com/100x100?text=No+Image'"
            [alt]="selectedSpell.name"
            class="detail-image"
          />
          <div>
            <h2>{{ selectedSpell.name }}</h2>
            <span>{{ selectedSpell.school | titlecase }}</span>
          </div>
        </div>

        <div class="detail-description">
          <h4>Descrição</h4>
          <p>{{ selectedSpell.description }}</p>
        </div>

        <h4>Detalhes</h4>
        <ul>
          <li>Slots Necessários: {{ selectedSpell.slots_required }}</li>
          <li>Usos: {{ selectedSpell.uses }}</li>
          <li>Custo FP: {{ selectedSpell.cost_fp }}</li>
          <li>Custo Stamina: {{ selectedSpell.cost_stamina }}</li>
        </ul>

        <h4>Atributos Requeridos</h4>
        <ul>
          <li>Inteligência: {{ selectedSpell.intelligence_required }}</li>
          <li>Fé: {{ selectedSpell.faith_required }}</li>
        </ul>

        <h4>Tipo</h4>
        <ul>
          <li>Ofensivo: {{ selectedSpell.is_offensive ? 'Sim' : 'Não' }}</li>
          <li>Buff: {{ selectedSpell.is_buff ? 'Sim' : 'Não' }}</li>
          <li>Cura: {{ selectedSpell.is_heal ? 'Sim' : 'Não' }}</li>
        </ul>
      </div>

      <ng-template pTemplate="footer">
        <button pButton label="Fechar" icon="pi pi-times" (click)="onClose()"></button>
      </ng-template>
    </p-dialog>
  `,
  styles: [`
    .detail-header {
      display: flex;
      gap: 1rem;
      align-items: center;
      margin-bottom: 1rem;
    }

    .detail-image {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 4px;
    }

    ul {
      list-style: none;
      padding-left: 0;
      margin-top: 0.5rem;
      margin-bottom: 1rem;
    }
  `]
})
export class SpellDetailDialogComponent {
  @Input() selectedSpell: Spell | null = null;
  @Input() displayDetailDialog = false;
  @Output() displayDetailDialogChange = new EventEmitter<boolean>();

  onClose() {
    this.displayDetailDialog = false;
    this.displayDetailDialogChange.emit(false);
  }
}

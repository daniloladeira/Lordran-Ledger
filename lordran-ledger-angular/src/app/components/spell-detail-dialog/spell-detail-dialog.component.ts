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
          <li>Custo FP: {{ selectedSpell.cost_fp }}</li>
        </ul>

        <h4>Informações</h4>
        <ul>
          <li>Inteligência Requerida: {{ selectedSpell.intelligence_required }}</li>
          <li>Ofensivo: {{ selectedSpell.is_offensive ? 'Sim' : 'Não' }}</li>
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

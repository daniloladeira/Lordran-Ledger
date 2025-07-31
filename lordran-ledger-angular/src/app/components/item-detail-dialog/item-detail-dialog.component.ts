import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; // para *ngIf e pipes
import { DialogModule } from 'primeng/dialog'; // p-dialog
import { ButtonModule } from 'primeng/button'; // p-button

import type { Weapon } from '../../models/weapon.model';

@Component({
  selector: 'app-item-detail-dialog',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule],
  template: `
    <p-dialog
      [(visible)]="displayDetailDialog"
      header="Detalhes da Arma"
      [modal]="true"
      [closable]="true"
      [style]="{ width: '600px' }"
      *ngIf="selectedItem"
      (onHide)="onClose()"
    >
      <div class="detail-content">
        <div class="detail-header">
          <img
            [src]="selectedItem.image || 'https://via.placeholder.com/100x100?text=No Image'"
            [alt]="selectedItem.name"
            class="detail-image"
          />
          <div>
            <h2>{{ selectedItem.name }}</h2>
            <span>{{ selectedItem.type | titlecase }}</span>
          </div>
        </div>

        <div class="detail-description">
          <h4>Descrição</h4>
          <p>{{ selectedItem.description || 'Sem descrição' }}</p>
        </div>

        <h4>Informações</h4>
        <ul>
          <li>Dano Físico: {{ selectedItem.physical_damage }}</li>
          <li>Peso: {{ selectedItem.weight }}</li>
        </ul>

        <h4>Atributos Requeridos</h4>
        <ul>
          <li>Força: {{ selectedItem.strength_required }}</li>
          <li>Destreza: {{ selectedItem.dexterity_required }}</li>
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
export class ItemDetailDialogComponent {
  @Input() selectedItem: Weapon | null = null;
  @Input() displayDetailDialog = false;
  @Output() displayDetailDialogChange = new EventEmitter<boolean>();

  onClose() {
    this.displayDetailDialog = false;
    this.displayDetailDialogChange.emit(false);
  }
}

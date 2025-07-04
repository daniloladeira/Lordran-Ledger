import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para *ngIf, pipes como titlecase, currency
import { DialogModule } from 'primeng/dialog'; // Para p-dialog
import { ButtonModule } from 'primeng/button'; // Para p-button

// Importe a interface Item
import type { Item } from '../../models/item.model';

@Component({
  selector: 'app-item-detail-dialog', // Seletor para usar este diálogo
  standalone: true,
  imports: [
    CommonModule,
    DialogModule, // Módulo do p-dialog
    ButtonModule  // Módulo do p-button
  ],
  template: `
    <p-dialog
      [(visible)]="displayDetailDialog"
      header="Item Details"
      [modal]="true"
      [closable]="true"
      [style]="{ width: '600px' }"
      styleClass="detail-dialog"
      (onHide)="onClose()"
      *ngIf="selectedItem"
    >
      <div class="detail-content">
        <div class="detail-header">
          <!-- Imagem do item -->
          <img
            [src]="selectedItem.imageUrl || 'https://via.placeholder.com/100x100?text=No Image'"
            alt="{{ selectedItem.name || 'Item Image' }}"
            class="detail-image"
            *ngIf="selectedItem.imageUrl"
          >
          <div>
            <h2 class="detail-name" [class]="getRarityClass(selectedItem.rarity)">
              {{ selectedItem.name }}
            </h2>
            <span class="detail-type">{{ selectedItem.type | titlecase }}</span>
          </div>
        </div>

        <div class="detail-stats">
          <div class="detail-stat">
            <span class="detail-label">ID:</span>
            <span class="detail-value">{{ selectedItem.id }}</span>
          </div>
          <div class="detail-stat">
            <span class="detail-label">Value:</span>
            <span class="detail-value">{{ selectedItem.value | currency : 'USD' : 'symbol' : '1.2-2' }}</span>
          </div>
          <div class="detail-stat">
            <span class="detail-label">Souls:</span>
            <span class="detail-value souls">{{ selectedItem.souls }}</span>
          </div>
          <div class="detail-stat">
            <span class="detail-label">Rarity:</span>
            <span class="detail-value" [class]="getRarityClass(selectedItem.rarity)">
              {{ selectedItem.rarity | titlecase }}
            </span>
          </div>
          <div class="detail-stat">
            <span class="detail-label">Status:</span>
            <span class="detail-value" [class]="selectedItem.equipped ? 'equipped' : 'unequipped'">
              {{ selectedItem.equipped ? 'Equipped' : 'Not Equipped' }}
            </span>
          </div>
        </div>

        <div class="detail-description">
          <h4>Description</h4>
          <p>{{ selectedItem.description || 'No description available.' }}</p>
        </div>
      </div>

      <ng-template pTemplate="footer">
        <p-button
          label="Close"
          icon="pi pi-times"
          (onClick)="onClose()"
          severity="secondary" >
        </p-button>
      </ng-template>
    </p-dialog>
  `,
  styleUrl: './item-detail-dialog.component.scss' // Aponta para o arquivo de estilos
})
export class ItemDetailDialogComponent implements OnInit {
  @Input() selectedItem: Item | null = null; // Recebe o item a ser exibido
  @Input() displayDetailDialog: boolean = false; // Controla a visibilidade do diálogo

  // Mude o nome do Output de 'dialogClosed' para 'displayDetailDialogChange'
  @Output() displayDetailDialogChange = new EventEmitter<boolean>(); // Para two-way binding

  ngOnInit() {
    // console.log('Dialog Init - Item:', this.selectedItem); // Para depuração
  }

  onClose() {
    this.displayDetailDialog = false; // Fecha o diálogo localmente
    this.displayDetailDialogChange.emit(this.displayDetailDialog); // Notifica o componente pai
  }

  // Método para aplicar classes de CSS baseadas na raridade
  getRarityClass(rarity: Item['rarity']): string {
    switch (rarity) {
      case 'common':
        return 'rarity-common';
      case 'rare':
        return 'rarity-rare';
      case 'legendary':
        return 'rarity-legendary';
      case 'unique':
        return 'rarity-unique';
      default:
        return '';
    }
  }
}
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-item-detail-dialog',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule],
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
          <div>
            <h2 class="detail-name" [class]="getRarityClass(selectedItem.rarity)">
              {{ selectedItem.name }}
            </h2>
            <span class="detail-type">{{ selectedItem.type | titlecase }}</span>
          </div>
        </div>

        <div class="detail-stats">
          <div class="detail-stat">
            <span class="detail-label">Value:</span>
            <span class="detail-value">{{ selectedItem.value }}</span>
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
          severity="secondary">
        </p-button>
      </ng-template>
    </p-dialog>
  `,
  styleUrls: ['./item-detail-dialog.component.scss']
})
export class ItemDetailDialogComponent {
  @Input() selectedItem: {
    name: string;
    type: string;
    rarity: string;
    description?: string;
    value: number;
    souls: number;
    equipped: boolean;
  } | null = null;

  @Input() displayDetailDialog: boolean = false;

  @Input() onClose: () => void = () => {};

  getRarityClass(rarity: string): string {
    const r = rarity.toLowerCase();
    return {
      common: 'rarity-common',
      rare: 'rarity-rare',
      epic: 'rarity-epic',
      legendary: 'rarity-legendary',
    }[r] || '';
  }
}

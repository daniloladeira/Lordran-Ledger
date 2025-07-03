import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule, Card, Button],
  template: `
    <p-card
      [style]="{ width: '100%', overflow: 'hidden' }"
      styleClass="item-card"
    >
      <ng-template pTemplate="header">
        <img
          [src]="item.imageUrl"
          alt="Item Image"
          class="card-image"
        />
      </ng-template>

      <ng-template pTemplate="title">
        {{ item.name }}
      </ng-template>

      <ng-template pTemplate="subtitle">
        {{ item.type | titlecase }} • {{ item.rarity | titlecase }}
      </ng-template>

      <ng-template pTemplate="content">
        <p class="card-description">
          {{ item.description }}
        </p>
      </ng-template>

      <ng-template pTemplate="footer">
        <div class="btn-container">
          <p-button
            icon="pi pi-eye"
            label="View"
            severity="secondary"
            [outlined]="true"
            class="card-button"
            (onClick)="viewDetails.emit(item)"
          ></p-button>
          <p-button
            icon="pi pi-pencil"
            label="Edit"
            severity="success"
            class="card-button"
            (onClick)="editItem.emit(item)"
          ></p-button>
          <p-button
            icon="pi pi-trash"
            label="Delete"
            severity="danger"
            class="card-button"
            (onClick)="deleteItem.emit(item)"
          ></p-button>
        </div>
      </ng-template>
    </p-card>
  `,
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent {
  @Input() item!: {
    name: string;
    type: string;
    rarity: string;
    description: string;
    imageUrl: string;
  };

  @Output() viewDetails = new EventEmitter<any>();
  @Output() editItem = new EventEmitter<any>();
  @Output() deleteItem = new EventEmitter<any>();
}

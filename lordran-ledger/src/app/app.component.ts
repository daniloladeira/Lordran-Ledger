import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { ItemService } from './services/item.service';
import { Item, ItemForm } from './models/item.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    CheckboxModule,
    ToastModule,
    ConfirmDialogModule,
  ],
  providers: [MessageService, ConfirmationService],
  template: `
    <p-toast></p-toast>
    <p-confirmDialog></p-confirmDialog>

    <div class="app-container">
      <h1>Lordran Ledger</h1>
      <button pButton label="Add Item" icon="pi pi-plus" (click)="openNewItemDialog()"></button>

      <div class="items-list">
        <div *ngFor="let item of items" class="item-entry">
          <span>{{ item.name }} ({{ item.type }})</span>
          <button pButton icon="pi pi-eye" class="p-button-text" (click)="openDetailDialog(item)"></button>
          <button pButton icon="pi pi-pencil" class="p-button-text" (click)="openEditDialog(item)"></button>
          <button pButton icon="pi pi-trash" class="p-button-text" (click)="deleteItem(item)"></button>
        </div>
      </div>

      <p-dialog
        [(visible)]="displayDialog"
        [header]="isEditing ? 'Edit Item' : 'Add Item'"
        [modal]="true"
        [style]="{ width: '500px' }"
        (onHide)="resetForm()"
      >
        <div class="field">
          <label>Name</label>
          <input type="text" pInputText [(ngModel)]="itemForm.name" />
        </div>

        <div class="field">
          <label>Type</label>
          <p-dropdown [options]="typeOptions" [(ngModel)]="itemForm.type" placeholder="Select Type"></p-dropdown>
        </div>

        <div class="field">
          <label>Rarity</label>
          <p-dropdown [options]="rarityOptions" [(ngModel)]="itemForm.rarity" placeholder="Select Rarity"></p-dropdown>
        </div>

        <div class="field">
          <label>Value</label>
          <input type="number" pInputText [(ngModel)]="itemForm.value" />
        </div>

        <div class="field">
          <label>Souls</label>
          <input type="number" pInputText [(ngModel)]="itemForm.souls" />
        </div>

        <div class="field-checkbox">
          <p-checkbox [(ngModel)]="itemForm.equipped" [binary]="true"></p-checkbox>
          <label>Equipped</label>
        </div>

        <div class="field">
          <label>Description</label>
          <textarea pInputText [(ngModel)]="itemForm.description" rows="3"></textarea>
        </div>

        <ng-template pTemplate="footer">
          <button pButton label="Cancel" icon="pi pi-times" class="p-button-text" (click)="cancelDialog()"></button>
          <button pButton label="Save" icon="pi pi-check" (click)="saveItem()"></button>
        </ng-template>
      </p-dialog>
    </div>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  items: Item[] = [];
  displayDialog = false;
  displayDetailDialog = false;
  selectedItem: Item | null = null;
  isEditing = false;

  itemForm: ItemForm = {
    name: '',
    type: 'weapon',
    value: 0,
    rarity: 'common',
    equipped: false,
    description: '',
    souls: 0,
  };

  typeOptions = [
    { label: 'Weapon', value: 'weapon' },
    { label: 'Armor', value: 'armor' },
    { label: 'Ring', value: 'ring' },
    { label: 'Consumable', value: 'consumable' },
  ];

  rarityOptions = [
    { label: 'Common', value: 'common' },
    { label: 'Rare', value: 'rare' },
    { label: 'Legendary', value: 'legendary' },
    { label: 'Unique', value: 'unique' },
  ];

  constructor(
    private itemService: ItemService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.itemService.getItems().subscribe((items) => {
      this.items = items;
    });
  }

  openNewItemDialog() {
    this.resetForm();
    this.isEditing = false;
    this.displayDialog = true;
  }

  openEditDialog(item: Item) {
    this.itemForm = { ...item };
    this.selectedItem = item;
    this.isEditing = true;
    this.displayDialog = true;
  }

  openDetailDialog(item: Item) {
    this.selectedItem = item;
    this.displayDetailDialog = true;
  }

  saveItem() {
    if (this.isValidForm()) {
      if (this.isEditing && this.selectedItem) {
        this.itemService.updateItem(this.selectedItem.id, this.itemForm);
        this.messageService.add({
          severity: 'success',
          summary: 'Item Updated',
          detail: 'The item has been updated successfully',
        });
      } else {
        this.itemService.addItem(this.itemForm);
        this.messageService.add({
          severity: 'success',
          summary: 'Item Added',
          detail: 'New item has been added to your inventory',
        });
      }
      this.displayDialog = false;
      this.resetForm();
    }
  }

  deleteItem(item: Item) {
    this.confirmationService.confirm({
      message: `Are you sure you want to discard ${item.name}?`,
      header: 'Confirm Deletion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.itemService.deleteItem(item.id);
        this.messageService.add({
          severity: 'warn',
          summary: 'Item Discarded',
          detail: 'The item has been removed from your inventory',
        });
      },
    });
  }

  isValidForm(): boolean {
    return this.itemForm.name.trim() !== '' && this.itemForm.value >= 0 && this.itemForm.souls >= 0;
  }

  resetForm() {
    this.itemForm = {
      name: '',
      type: 'weapon',
      value: 0,
      rarity: 'common',
      equipped: false,
      description: '',
      souls: 0,
    };
    this.selectedItem = null;
  }

  cancelDialog() {
    this.displayDialog = false;
    this.resetForm();
  }
}

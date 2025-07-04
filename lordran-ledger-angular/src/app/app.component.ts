// src/app/app.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { Header } from './components/header/header.component';
import { CardComponent } from './components/card/card.component';
import { ItemDetailDialogComponent } from './components/item-detail-dialog/item-detail-dialog.component';
import { ItemFormDialogComponent } from './components/item-form-dialog/item-form-dialog.component';

import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast'; // <--- Importe ToastModule aqui!
import { MessageService } from 'primeng/api'; // <--- Importe MessageService aqui!

import type { Item, ItemForm } from './models/item.model';
import { ItemService } from './services/item.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    Header,
    CardComponent,
    ItemDetailDialogComponent,
    ItemFormDialogComponent,
    ButtonModule,
    ToastModule // <--- Adicione ToastModule aos imports aqui!
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  styles: [`
    :host {
      display: block;
      height: 100%;
    }
  `]
})
export class AppComponent implements OnInit {
  protected title = 'Lordran Ledger Inventory';
  protected items$!: Observable<Item[]>;

  protected displayDetailDialog: boolean = false;
  protected selectedItem: Item | null = null;

  protected displayFormDialog: boolean = false;
  protected editingItem: Item | null = null;
  protected isEditing: boolean = false;

  // Injete o MessageService no construtor
  constructor(private itemService: ItemService, private messageService: MessageService) {}

  ngOnInit() {
    this.items$ = this.itemService.getItems();
  }

  onViewDetails(item: Item): void {
    this.selectedItem = item;
    this.displayDetailDialog = true;
  }

  onDetailDialogClosed(): void {
    this.selectedItem = null;
    this.displayDetailDialog = false;
  }

  onAddItem(): void {
    this.editingItem = null;
    this.isEditing = false;
    this.displayFormDialog = true;
  }

  onEditItem(item: Item): void {
    this.editingItem = item;
    this.isEditing = true;
    this.displayFormDialog = true;
  }

  onSaveItem(itemForm: ItemForm): void {
    if (this.isEditing && this.editingItem) {
      this.itemService.updateItem(this.editingItem.id, itemForm);
      this.messageService.add({severity:'success', summary:'Success', detail:`Item '${itemForm.name}' updated successfully!`}); // Mensagem de sucesso
    } else {
      this.itemService.addItem(itemForm);
      this.messageService.add({severity:'success', summary:'Success', detail:`Item '${itemForm.name}' added successfully!`}); // Mensagem de sucesso
    }
    this.displayFormDialog = false;
    this.editingItem = null;
  }

  onFormDialogClosed(): void {
    this.displayFormDialog = false;
    this.editingItem = null;
  }

  onDeleteItem(item: Item): void {
    // Em um projeto real, use um modal de confirmação do PrimeNG (p-confirmDialog)
    // em vez de `confirm()`, que bloqueia a UI do navegador.
    if (confirm(`Are you sure you want to delete ${item.name}?`)) {
      this.itemService.deleteItem(item.id);
      this.messageService.add({severity:'info', summary:'Deleted', detail:`Item '${item.name}' deleted.`}); // Mensagem de informação
    }
  }
}
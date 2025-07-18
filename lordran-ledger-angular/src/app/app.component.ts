// src/app/app.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { Header } from './components/header/header.component';
import { CardComponent } from './components/card/card.component';
import { ItemDetailDialogComponent } from './components/item-detail-dialog/item-detail-dialog.component';
import { ItemFormDialogComponent } from './components/item-form-dialog/item-form-dialog.component';
import { WeaponCardComponent } from './components/weapons/weapons.component';

import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { WeaponsService, Weapon } from './services/weapons';

import type { Item, ItemForm } from './models/item.model';
import { ItemService } from './services/item.service';

import { RouterOutlet } from '@angular/router';

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
    WeaponCardComponent,
    ToastModule,
    RouterOutlet
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

  weapons: Weapon[] = [];

  constructor(
    private itemService: ItemService,
    private messageService: MessageService,
    private weaponsService: WeaponsService
  ) {}

  ngOnInit() {
    this.items$ = this.itemService.getItems();

    this.weaponsService.getWeapons().subscribe({
      next: (data) => this.weapons = data,
      error: (err) => console.error('Erro ao buscar armas:', err),
    });
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
      this.messageService.add({severity:'success', summary:'Success', detail:`Item '${itemForm.name}' updated successfully!`});
    } else {
      this.itemService.addItem(itemForm);
      this.messageService.add({severity:'success', summary:'Success', detail:`Item '${itemForm.name}' added successfully!`});
    }
    this.displayFormDialog = false;
    this.editingItem = null;
  }

  onFormDialogClosed(): void {
    this.displayFormDialog = false;
    this.editingItem = null;
  }

  onDeleteItem(item: Item): void {
    if (confirm(`Are you sure you want to delete ${item.name}?`)) {
      this.itemService.deleteItem(item.id);
      this.messageService.add({severity:'info', summary:'Deleted', detail:`Item '${item.name}' deleted.`});
    }
  }

  onViewWeapon(weapon: Weapon): void {
    console.log('Visualizar arma:', weapon);
  }

  onEditWeapon(weapon: Weapon): void {
    console.log('Editar arma:', weapon);
  }

  onDeleteWeapon(weapon: Weapon): void {
    if (confirm(`Tem certeza que quer deletar a arma ${weapon.name}?`)) {
      console.log('Arma deletada:', weapon);
    }
  }
}

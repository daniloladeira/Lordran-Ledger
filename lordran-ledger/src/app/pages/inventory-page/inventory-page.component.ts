import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { Item, ItemForm } from '../../models/item.model';
import { ItemService } from '../../services/item.service';

import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { ItemCardComponent } from '../../components/item-card/item-card.component';
import { ItemFormDialogComponent } from '../../components/item-form-dialog/item-form-dialog.component';
import { ItemDetailDialogComponent } from '../../components/item-detail-dialog/item-detail-dialog.component';

@Component({
  selector: 'app-inventory-page',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    ConfirmDialogModule,
    ItemCardComponent,
    ItemFormDialogComponent,
    ItemDetailDialogComponent,
  ],
  templateUrl: './inventory-page.component.html',
  styleUrls: ['./inventory-page.component.scss'],
  providers: [MessageService, ConfirmationService], // Só se quiser instância própria, senão remova
})
export class InventoryPage {
  private itemService = inject(ItemService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  items$: Observable<Item[]> = this.itemService.getItems();

  displayFormDialog = false;
  isEditing = false;
  currentItem: Item | null = null;

  displayDetailDialog = false;
  selectedItem: Item | null = null;

  openNewItemDialog(): void {
    this.isEditing = false;
    this.currentItem = null;
    this.displayFormDialog = true;
  }

  openEditDialog(item: Item): void {
    this.currentItem = item;
    this.isEditing = true;
    this.displayFormDialog = true;
  }

  openDetailDialog(item: Item): void {
    this.selectedItem = item;
    this.displayDetailDialog = true;
  }

  saveItem(itemForm: ItemForm): void {
    if (this.isEditing && this.currentItem) {
      this.itemService.updateItem(this.currentItem.id, itemForm);
      this.messageService.add({
        severity: 'success',
        summary: 'Item Atualizado',
        detail: 'O item foi atualizado com sucesso',
      });
    } else {
      this.itemService.addItem(itemForm);
      this.messageService.add({
        severity: 'success',
        summary: 'Item Adicionado',
        detail: 'Novo item foi adicionado ao seu inventário',
      });
    }
    this.displayFormDialog = false;
  }

  deleteItem(item: Item): void {
    this.confirmationService.confirm({
      message: `Tem certeza de que deseja descartar ${item.name}?`,
      header: 'Confirmar Exclusão',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.itemService.deleteItem(item.id);
        this.messageService.add({
          severity: 'warn',
          summary: 'Item Descartado',
          detail: 'O item foi removido do seu inventário',
        });
      },
    });
  }

  onFormDialogClose(visible: boolean): void {
    this.displayFormDialog = visible;
  }

  onDetailDialogClose(visible: boolean): void {
    this.displayDetailDialog = visible;
  }
}

import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG Modules
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectItem } from 'primeng/api'; // Para SelectItem
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
// Interfaces do seu modelo
import type { Item, ItemForm } from '../../models/item.model';

@Component({
  selector: 'app-item-form-dialog',
  standalone: true, // Componente Standalone
  imports: [
    CommonModule,
    FormsModule, // IMPORTE FormsModule para usar [(ngModel)]
    DialogModule,
    InputTextModule,
    InputNumberModule,
    CheckboxModule,
    ButtonModule,
  ],
  templateUrl: './item-form-dialog.component.html', // Aponta para o arquivo HTML
  styleUrl: './item-form-dialog.component.scss' // Aponta para o arquivo SCSS
})
export class ItemFormDialogComponent implements OnChanges {
  @Input() displayDialog: boolean = false;
  @Input() item: Item | null = null;
  @Input() isEditing: boolean = false;

  @Output() save = new EventEmitter<ItemForm>();
  @Output() displayDialogChange = new EventEmitter<boolean>(); // <--- ESSENCIAL PARA O TWO-WAY BINDING

  itemForm: ItemForm = {
    name: '',
    type: 'weapon',
    value: 0,
    rarity: 'common',
    equipped: false,
    description: '',
    souls: 0,
  };

  // Options for the 'type' dropdown
  typeOptions: SelectItem[] = [
    { label: 'Weapon', value: 'weapon' },
    { label: 'Armor', value: 'armor' },
    { label: 'Ring', value: 'ring' },
    { label: 'Consumable', value: 'consumable' },
  ];

  // Options for the 'rarity' dropdown
  rarityOptions: SelectItem[] = [
    { label: 'Common', value: 'common' },
    { label: 'Rare', value: 'rare' },
    { label: 'Legendary', value: 'legendary' },
    { label: 'Unique', value: 'unique' },
  ];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['displayDialog'] && changes['displayDialog'].currentValue === true) {
      if (this.isEditing && this.item) {
        this.itemForm = { ...this.item };
      } else {
        this.resetForm();
      }
    }
  }

  onSave(): void {
    if (this.isValidForm()) {
      this.save.emit(this.itemForm); // Emit the form data to the parent
      this.onCancel(); // Close dialog after saving
    }
  }

  onCancel(): void {
    this.displayDialog = false; // Update internal state
    this.displayDialogChange.emit(false); // Notify parent to close via two-way binding
    this.resetForm(); // Reset form for next use
  }

  private isValidForm(): boolean {
    return this.itemForm.name.trim() !== '' && this.itemForm.value >= 0 && this.itemForm.souls >= 0;
  }

  private resetForm(): void {
    this.itemForm = {
      name: '',
      type: 'weapon',
      value: 0,
      rarity: 'common',
      equipped: false,
      description: '',
      souls: 0,
    };
  }
}
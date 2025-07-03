import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG - Standalone Components
import { Dialog } from 'primeng/dialog';
import { InputText } from 'primeng/inputtext';
import { Dropdown } from 'primeng/dropdown';
import { InputNumber } from 'primeng/inputnumber';
import { Checkbox } from 'primeng/checkbox';
import { Button } from 'primeng/button';
import { InputTextarea } from 'primeng/inputtextarea';

import { Item, ItemForm } from '../../models/item.model';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-item-form-dialog',
  standalone: true,
  templateUrl: './item-form-dialog.component.html',
  styleUrls: ['./item-form-dialog.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    Dialog,
    InputText,
    Dropdown,
    InputNumber,
    Checkbox,
    Button,
    InputTextarea,
  ],
})
export class ItemFormDialogComponent implements OnChanges {
  @Input() displayDialog: boolean = false;
  @Input() item: Item | null = null;
  @Input() isEditing: boolean = false;

  @Output() save = new EventEmitter<ItemForm>();
  @Output() dialogVisibleChange = new EventEmitter<boolean>();

  itemForm: ItemForm = {
    name: '',
    type: 'weapon',
    value: 0,
    rarity: 'common',
    equipped: false,
    description: '',
    souls: 0,
  };

  typeOptions: SelectItem[] = [
    { label: 'Weapon', value: 'weapon' },
    { label: 'Armor', value: 'armor' },
    { label: 'Ring', value: 'ring' },
    { label: 'Consumable', value: 'consumable' },
  ];

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
      this.save.emit(this.itemForm);
      this.onCancel();
    }
  }

  onCancel(): void {
    this.displayDialog = false;
    this.dialogVisibleChange.emit(false);
    this.resetForm();
  }

  private isValidForm(): boolean {
    return (
      this.itemForm.name.trim() !== '' &&
      this.itemForm.value >= 0 &&
      this.itemForm.souls >= 0
    );
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

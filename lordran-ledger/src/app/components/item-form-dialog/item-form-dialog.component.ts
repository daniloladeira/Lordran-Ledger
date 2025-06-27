// shared/components/item-form-dialog/item-form-dialog.component.ts
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Item, ItemForm } from '../../models/item.model';
import { SelectItem } from 'primeng/api'; // For PrimeNG Dropdown options

@Component({
  selector: 'app-item-form-dialog',
  templateUrl: './item-form-dialog.component.html',
  styleUrls: ['./item-form-dialog.component.scss']
})
export class ItemFormDialogComponent implements OnChanges {
  // Input property to control dialog visibility
  @Input() displayDialog: boolean = false;
  // Input property for the item to be edited (null for new item)
  @Input() item: Item | null = null;
  // Input property to indicate if the form is for editing an existing item
  @Input() isEditing: boolean = false;

  // Output event for when the item is saved (added or updated)
  @Output() save = new EventEmitter<ItemForm>();
  // Output event to notify the parent component of dialog visibility changes
  @Output() dialogVisibleChange = new EventEmitter<boolean>();

  // Form model for item data
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

  /**
   * Lifecycle hook that responds to changes in input properties.
   * Used to initialize the form when the dialog becomes visible or when editing an item.
   * @param changes SimpleChanges object containing changes to input properties.
   */
  ngOnChanges(changes: SimpleChanges): void {
    // Check if displayDialog input changed to true, indicating dialog opening
    if (changes['displayDialog'] && changes['displayDialog'].currentValue === true) {
      // If editing, populate the form with the provided item data
      if (this.isEditing && this.item) {
        // Deep copy the item to avoid direct modification of the original object
        this.itemForm = { ...this.item };
      } else {
        // If adding a new item, reset the form
        this.resetForm();
      }
    }
  }

  /**
   * Handles the save action of the form.
   * Emits the itemForm data if valid, then closes the dialog.
   */
  onSave(): void {
    if (this.isValidForm()) {
      this.save.emit(this.itemForm); // Emit the form data to the parent
      this.onCancel(); // Close dialog after saving
    }
  }

  /**
   * Handles the cancel action of the form.
   * Closes the dialog and resets the form.
   */
  onCancel(): void {
    this.displayDialog = false; // Update internal state
    this.dialogVisibleChange.emit(false); // Notify parent to close
    this.resetForm(); // Reset form for next use
  }

  /**
   * Validates the form inputs.
   * @returns True if the form is valid, false otherwise.
   */
  private isValidForm(): boolean {
    return this.itemForm.name.trim() !== '' && this.itemForm.value >= 0 && this.itemForm.souls >= 0;
  }

  /**
   * Resets the item form to its initial empty state.
   */
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

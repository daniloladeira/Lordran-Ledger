// shared/components/item-detail-dialog/item-detail-dialog.component.ts
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-item-detail-dialog',
  templateUrl: './item-detail-dialog.component.html',
  styleUrls: ['./item-detail-dialog.component.scss']
})
export class ItemDetailDialogComponent implements OnChanges {
  // Input property to control dialog visibility
  @Input() displayDetailDialog: boolean = false;
  // Input property for the selected item to display details
  @Input() selectedItem: Item | null = null;

  // Output event to notify the parent component of dialog visibility changes
  @Output() dialogVisibleChange = new EventEmitter<boolean>();

  /**
   * Lifecycle hook that responds to changes in input properties.
   * Clears the selected item when the dialog is closed.
   * @param changes SimpleChanges object containing changes to input properties.
   */
  ngOnChanges(changes: SimpleChanges): void {
    // If displayDetailDialog changes to false, reset selectedItem
    if (changes['displayDetailDialog'] && !changes['displayDetailDialog'].currentValue) {
      this.selectedItem = null;
    }
  }

  /**
   * Handles the close action of the detail dialog.
   * Updates internal state and notifies the parent component.
   */
  onClose(): void {
    this.displayDetailDialog = false; // Update internal state
    this.dialogVisibleChange.emit(false); // Notify parent to close
  }

  /**
   * Determines the appropriate PrimeIcons class based on the item's type.
   * @param type The type of the item (e.g., 'weapon', 'armor').
   * @returns The PrimeIcons class string.
   */
  getTypeIcon(type: string): string {
    const icons: { [key: string]: string } = {
      weapon: 'pi pi-bolt',
      armor: 'pi pi-shield',
      ring: 'pi pi-circle',
      consumable: 'pi pi-heart',
    };
    // Returns the corresponding icon or a default box icon if not found
    return icons[type.toLowerCase()] || 'pi pi-box';
  }

  /**
   * Generates a CSS class based on the item's rarity for styling.
   * @param rarity The rarity of the item (e.g., 'common', 'rare').
   * @returns A CSS class string (e.g., 'rarity-common').
   */
  getRarityClass(rarity: string): string {
    return `rarity-${rarity.toLowerCase()}`;
  }
}

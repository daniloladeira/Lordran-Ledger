// shared/components/item-card/item-card.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent {
  // Input property to receive the item data from the parent component
  @Input() item!: Item; // Non-null assertion, assumes parent will always pass an item

  // Output events to notify the parent component of user actions
  @Output() viewDetails = new EventEmitter<Item>();
  @Output() editItem = new EventEmitter<Item>();
  @Output() deleteItem = new EventEmitter<Item>();

  /**
   * Determines the appropriate PrimeIcons class based on the item's type.
   * @param type The type of the item (e.g., 'weapon', 'armor').
   * @returns The PrimeIcons class string.
   */
  getTypeIcon(type: string): string {
    const icons: { [key: string]: string } = {
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

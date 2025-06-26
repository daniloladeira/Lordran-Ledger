import { Component, type OnInit } from "@angular/core"
import { Item, ItemForm } from "./models/item.model"
import { ItemService } from "./services/item.service"
import { MessageService, ConfirmationService } from "primeng/api"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  items: Item[] = []
  displayDialog = false
  displayDetailDialog = false
  selectedItem: Item | null = null
  isEditing = false

  itemForm: ItemForm = {
    name: "",
    type: "weapon",
    value: 0,
    rarity: "common",
    equipped: false,
    description: "",
    souls: 0,
  }

  typeOptions = [
    { label: "Weapon", value: "weapon" },
    { label: "Armor", value: "armor" },
    { label: "Ring", value: "ring" },
    { label: "Consumable", value: "consumable" },
  ]

  rarityOptions = [
    { label: "Common", value: "common" },
    { label: "Rare", value: "rare" },
    { label: "Legendary", value: "legendary" },
    { label: "Unique", value: "unique" },
  ]

  constructor(
    private itemService: ItemService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit() {
    this.itemService.getItems().subscribe((items) => {
      this.items = items
    })
  }

  openNewItemDialog() {
    this.resetForm()
    this.isEditing = false
    this.displayDialog = true
  }

  openEditDialog(item: Item) {
    this.itemForm = {
      name: item.name,
      type: item.type,
      value: item.value,
      rarity: item.rarity,
      equipped: item.equipped,
      description: item.description,
      souls: item.souls,
    }
    this.selectedItem = item
    this.isEditing = true
    this.displayDialog = true
  }

  openDetailDialog(item: Item) {
    this.selectedItem = item
    this.displayDetailDialog = true
  }

  saveItem() {
    if (this.isValidForm()) {
      if (this.isEditing && this.selectedItem) {
        this.itemService.updateItem(this.selectedItem.id, this.itemForm)
        this.messageService.add({
          severity: "success",
          summary: "Item Updated",
          detail: "The item has been updated successfully",
        })
      } else {
        this.itemService.addItem(this.itemForm)
        this.messageService.add({
          severity: "success",
          summary: "Item Added",
          detail: "New item has been added to your inventory",
        })
      }
      this.displayDialog = false
      this.resetForm()
    }
  }

  deleteItem(item: Item) {
    this.confirmationService.confirm({
      message: `Are you sure you want to discard ${item.name}?`,
      header: "Confirm Deletion",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.itemService.deleteItem(item.id)
        this.messageService.add({
          severity: "warn",
          summary: "Item Discarded",
          detail: "The item has been removed from your inventory",
        })
      },
    })
  }

  private isValidForm(): boolean {
    return this.itemForm.name.trim() !== "" && this.itemForm.value >= 0 && this.itemForm.souls >= 0
  }

  private resetForm() {
    this.itemForm = {
      name: "",
      type: "weapon",
      value: 0,
      rarity: "common",
      equipped: false,
      description: "",
      souls: 0,
    }
    this.selectedItem = null
  }

  getRarityClass(rarity: string): string {
    return `rarity-${rarity}`
  }

  getTypeIcon(type: string): string {
    const icons = {
      weapon: "pi pi-bolt",
      armor: "pi pi-shield",
      ring: "pi pi-circle",
      consumable: "pi pi-heart",
    }
    return icons[type as keyof typeof icons] || "pi pi-box"
  }
}

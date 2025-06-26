import { Injectable } from "@angular/core"
import { BehaviorSubject, type Observable } from "rxjs" // Remover 'type' do Observable
import type { Item, ItemForm } from "../models/item.model"

@Injectable({
  providedIn: "root",
})
export class ItemService {
  private items: Item[] = [
    {
      id: 1,
      name: "Estus Flask",
      type: "consumable",
      value: 100,
      rarity: "common",
      equipped: true,
      description: "Undead treasure that restores HP",
      souls: 0,
    },
    {
      id: 2,
      name: "Zweihander",
      type: "weapon",
      value: 85,
      rarity: "rare",
      equipped: false,
      description: "Ultra greatsword with devastating power",
      souls: 2000,
    },
    {
      id: 3,
      name: "Ring of Favor and Protection",
      type: "ring",
      value: 95,
      rarity: "legendary",
      equipped: true,
      description: "Increases HP, stamina and equip load",
      souls: 5000,
    },
  ]

  private itemsSubject = new BehaviorSubject<Item[]>(this.items)
  private nextId = 4

  getItems(): Observable<Item[]> {
    return this.itemsSubject.asObservable()
  }

  getItemById(id: number): Item | undefined {
    return this.items.find((item) => item.id === id)
  }

  addItem(itemForm: ItemForm): void {
    const newItem: Item = {
      id: this.nextId++,
      ...itemForm,
    }
    this.items.push(newItem)
    this.itemsSubject.next([...this.items])
  }

  updateItem(id: number, itemForm: ItemForm): void {
    const index = this.items.findIndex((item) => item.id === id)
    if (index !== -1) {
      this.items[index] = { id, ...itemForm }
      this.itemsSubject.next([...this.items])
    }
  }

  deleteItem(id: number): void {
    this.items = this.items.filter((item) => item.id !== id)
    this.itemsSubject.next([...this.items])
  }
}

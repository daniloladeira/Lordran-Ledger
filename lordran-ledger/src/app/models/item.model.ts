export interface Item {
  id: number
  name: string
  type: "weapon" | "armor" | "ring" | "consumable"
  value: number
  rarity: "common" | "rare" | "legendary" | "unique"
  equipped: boolean
  description: string
  souls: number
  imageUrl?: string
}

export interface ItemForm {
  name: string
  type: "weapon" | "armor" | "ring" | "consumable"
  value: number
  rarity: "common" | "rare" | "legendary" | "unique"
  equipped: boolean
  description: string
  souls: number
  imageUrl?: string
}

export interface Weapon {
  id: number;
  name: string;
  description: string;
  type: string;
  image: string;
  physical_damage: number;
  magic_damage: number;
  fire_damage: number;
  lightning_damage: number;
  critical: number;
  durability: number;
  weight: number;
  strength_required: number;
  dexterity_required: number;
  intelligence_required: number;
  faith_required: number;
  created_at: Date;
}

export interface Weapon {
  id: number;
  name: string;
  description?: string;  // Opcional
  type: string;
  physical_damage: number;
  weight: number;
  
  // Campos opcionais
  image?: string;
  strength_required: number;
  dexterity_required: number;
  created_at: Date;
}

// Interface para criação de nova arma (sem id e created_at)
export interface CreateWeapon {
  name: string;
  description?: string;
  type: string;
  physical_damage: number;
  weight: number;
  image?: string;
  strength_required?: number;
  dexterity_required?: number;
}

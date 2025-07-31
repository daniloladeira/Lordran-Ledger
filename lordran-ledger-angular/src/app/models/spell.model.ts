export interface Spell {
  id: number;
  name: string;
  description?: string;  // Opcional
  school: 'sorcery' | 'pyromancy' | 'miracle' | 'hex';
  cost_fp: number;           // Focus Points Cost
  intelligence_required: number;
  is_offensive: boolean;
  created_at?: Date;         // Opcional, geralmente definido pelo backend
}

// Interface para criação de nova spell (sem id e created_at)
export interface CreateSpell {
  name: string;
  description?: string;
  school: 'sorcery' | 'pyromancy' | 'miracle' | 'hex';
  cost_fp?: number;
  intelligence_required?: number;
  is_offensive?: boolean;
}

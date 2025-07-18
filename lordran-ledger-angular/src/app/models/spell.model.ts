export interface Spell {
  id: number;               // Pode ser opcional se for criado no backend
  name: string;
  image?: string;            // Opcional, pode ser removido se não for necessário
  description: string;
  school: 'sorcery' | 'pyromancy' | 'miracle' | 'hex';
  slots_required: number;
  uses: number;
  cost_fp: number;           // Focus Points Cost
  cost_stamina: number;
  intelligence_required: number;
  faith_required: number;
  is_offensive: boolean;
  is_buff: boolean;
  is_heal: boolean;
  created_at?: Date;         // Opcional, geralmente definido pelo backend
}

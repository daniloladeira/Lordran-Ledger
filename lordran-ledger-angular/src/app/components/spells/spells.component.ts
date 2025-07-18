import { Component } from '@angular/core';

export interface Spell {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  type: string;
}

@Component({
  selector: 'app-spells',
  standalone: true,
  imports: [],
  template: `
    
  `,
  styleUrl: './spells.scss'
})
export class Spells {

}

import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core'; // Importe Output e EventEmitter
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

import { Item } from '../../models/item.model';

@Component({
  selector: 'app-item-card',
  standalone: true,
  templateUrl: './card.component.html',
  imports: [
    CardModule,
    ButtonModule,
    CommonModule, // Adicione CommonModule aqui para usar pipes e diretivas
  ],
  styleUrl: './item-card.component.scss',
})
export class CardComponent implements OnInit {
  @Input() item!: Item; 

  @Output() viewDetails = new EventEmitter<Item>();
  @Output() editItem = new EventEmitter<Item>();
  @Output() deleteItem = new EventEmitter<Item>();

  ngOnInit() {
    if (!this.item) {
      console.warn('CardComponent: No item provided via @Input().');
    }
  }

}

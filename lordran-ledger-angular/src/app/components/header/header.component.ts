import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ RouterModule ],
  template: 
  `
  <header>
    <h1 class="header-title">Lordran Ledger</h1>
    <nav>
      <a routerLink="/home">Home</a>
      <a routerLink="/weapons">Weapons</a>
      <a routerLink="/spells">Spells</a>
    </nav>
  </header>
  `,
  styleUrl: './header.scss'
})
export class Header {

}

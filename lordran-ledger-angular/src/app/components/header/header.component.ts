import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  template: 
  `
  <header>
    <h1 class="header-title">Lordran Ledger</h1>
    <nav>
      <a routerLink="/home">Home</a>
      <a routerLink="/about">About</a>
      <a routerLink="/contact">Contact</a>
    </nav>
  </header>
  `,
  styleUrl: './header.scss'
})
export class Header {

}

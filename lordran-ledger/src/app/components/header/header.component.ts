import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ RouterModule ],
  templateUrl: './header.component.html',
  template: `
  <header class="header">
  <div class="header-content">
    <div class="header-left">
      <a routerLink="/" class="logo-link">
        <h1 class="logo-title">Lordran Ledger</h1>
      </a>
    </div>
    <div class="header-right">
      <nav class="main-nav">
        <ul>
          <li><a routerLink="/inventory">Inventory</a></li>
          <li><a routerLink="/spells">Spells</a></li>
          <li><a routerLink="/quests">Quests</a></li>
          <li>
            <a routerLink="/profile" class="nav-icon" title="Profile">
              <i class="pi pi-user"></i>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</header>
  `,
})
export class HeaderComponent {}

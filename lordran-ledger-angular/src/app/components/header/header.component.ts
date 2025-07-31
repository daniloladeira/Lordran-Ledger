import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ RouterModule, ButtonModule ],
  template: 
  `
  <header>
    <h1 class="header-title">Lordran Ledger</h1>
    <nav>
      <a routerLink="/home">Home</a>
      <a routerLink="/weapons">Weapons</a>
      <a routerLink="/spells">Spells</a>
      <p-button 
        label="Logout" 
        icon="pi pi-sign-out" 
        severity="danger" 
        size="small"
        (onClick)="logout()"
        class="logout-btn"
      />
    </nav>
  </header>
  `,
  styleUrl: './header.scss'
})
export class Header {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

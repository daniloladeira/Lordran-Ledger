import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Header } from '../../components/header/header.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterModule, Header],
  template: `
  <app-header></app-header>
  <main class="main-layout">
    <router-outlet></router-outlet>
  </main>
  `,
  styleUrl: './main-layout.scss'
})
export class MainLayoutComponent {

}

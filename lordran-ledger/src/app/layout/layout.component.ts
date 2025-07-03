import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "../components/header/header.component";
import { Toast } from "primeng/toast";
import { ConfirmDialog } from "primeng/confirmdialog";

@Component({
  standalone: true,
  selector: 'app-layout',
  imports: [HeaderComponent, RouterOutlet, Toast, ConfirmDialog],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  template: `<app-header></app-header>
  <main class="main-content">
    <router-outlet></router-outlet>
  </main>
  <p-toast></p-toast>
  <p-confirmDialog></p-confirmDialog>
  <footer class="footer">
    <p>&copy; 2023 Lordran Ledger</p>
  </footer>`,
})

export class LayoutComponent {}
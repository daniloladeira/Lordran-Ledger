import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { InventoryPage } from './pages/inventory-page/inventory-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: '/inventory', pathMatch: 'full' },
      { path: 'inventory', component: InventoryPage },
    ]
  }
]
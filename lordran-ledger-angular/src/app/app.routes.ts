import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { WeaponsPageComponent } from './pages/weapons.page.component';
import { SpellsPageComponent } from './pages/spells.page.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'weapons', pathMatch: 'full' },
      { path: 'weapons', component: WeaponsPageComponent },
      { path: 'spells', component: SpellsPageComponent }
    ]
  },
  { path: '**', redirectTo: 'weapons' }
];

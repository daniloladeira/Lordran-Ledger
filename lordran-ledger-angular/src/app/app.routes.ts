import { Routes } from '@angular/router';
import { WeaponCardComponent } from './components/weapons/weapons.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { WeaponsPageComponent } from './pages/weapons.page.component';
import { SpellsPageComponent } from './pages/spells.page.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'weapons', pathMatch: 'full' },
      { path: 'weapons', component: WeaponsPageComponent },
      { path: 'spells', component: SpellsPageComponent }
    ]
  },
  { path: '**', redirectTo: 'weapons' }
];

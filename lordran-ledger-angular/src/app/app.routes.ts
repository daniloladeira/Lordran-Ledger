import { Routes } from '@angular/router';
import { WeaponCardComponent } from './components/weapons/weapons.component';
import { Spells } from './components/spells/spells.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { WeaponsPageComponent } from './pages/weapons.page.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'weapons', pathMatch: 'full' },
      { path: 'weapons', component: WeaponsPageComponent },
      { path: 'spells', component: Spells }
    ]
  },
  { path: '**', redirectTo: 'weapons' }
];

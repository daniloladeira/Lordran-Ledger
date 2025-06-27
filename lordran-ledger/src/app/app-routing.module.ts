// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryPage } from './pages/inventory-page/inventory-page.component'; // Importa diretamente a página de inventário

// Defina as rotas da sua aplicação
const routes: Routes = [
  // Redireciona o caminho raiz (vazio) para '/inventory'
  // pathMatch: 'full' garante que a correspondência seja exata para o caminho vazio
  { path: '', redirectTo: 'inventory', pathMatch: 'full' },

  // Define a rota para a página de inventário
  // Quando a URL for '/inventory', o InventoryPage será carregado
  { path: 'inventory', component: InventoryPage },

  // Rota curinga (wildcard route): Para qualquer caminho que não corresponda às rotas acima
  // Redireciona de volta para '/inventory'
  { path: '**', redirectTo: 'inventory' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Configura o módulo de roteamento raiz com as rotas definidas
  exports: [RouterModule] // Exporta o RouterModule para que as diretivas de roteamento (como <router-outlet>) estejam disponíveis em toda a aplicação
})
export class AppRoutingModule { }

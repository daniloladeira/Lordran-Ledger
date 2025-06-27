// src/app/app.module.ts
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms"; // Necessário para ngModel em formulários

// PrimeNG Modules (TODOS agora importados diretamente no AppModule nesta arquitetura simplificada)
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card"; // Adicionei caso seja usado implicitamente ou para consistência
import { DialogModule } from "primeng/dialog";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputNumberModule } from "primeng/inputnumber";
import { DropdownModule } from "primeng/dropdown";
import { CheckboxModule } from "primeng/checkbox";
import { ToastModule } from "primeng/toast";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { TooltipModule } from "primeng/tooltip";
import { TagModule } from "primeng/tag"; // Adicionei caso seja usado implicitamente ou para consistência

// PrimeNG Services (fornecidos globalmente, então importados aqui)
import { MessageService, ConfirmationService } from "primeng/api";

import { AppRoutingModule } from "./app-routing.module"; // Módulo de roteamento principal
import { AppComponent } from "./app.component"; // Componente raiz da aplicação

// Importa TODOS os componentes customizados que são usados na aplicação
// (incluindo aqueles que são parte de "pages" e "components")
import { InventoryPage } from './pages/inventory-page/inventory-page.component';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { ItemFormDialogComponent } from './components/item-form-dialog/item-form-dialog.component';
import { ItemDetailDialogComponent } from './components/item-detail-dialog/item-detail-dialog.component';

@NgModule({
  declarations: [
    AppComponent,               // Componente raiz
    InventoryPage,              // Página principal do inventário
    ItemCardComponent,          // Componente de exibição de item
    ItemFormDialogComponent,    // Componente de diálogo de formulário de item
    ItemDetailDialogComponent,  // Componente de diálogo de detalhes de item
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,              // Essencial para formulários com ngModel
    AppRoutingModule,         // Para o roteamento da aplicação

    // Módulos do PrimeNG importados aqui para que todos os componentes os reconheçam
    ButtonModule,
    CardModule,
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    DropdownModule,
    CheckboxModule,
    ToastModule,
    ConfirmDialogModule,
    TooltipModule,
    TagModule,
  ],
  providers: [
    MessageService,     // Provedor global para mensagens do PrimeNG
    ConfirmationService, // Provedor global para diálogos de confirmação do PrimeNG
  ],
  bootstrap: [AppComponent], // Componente de inicialização da aplicação
})
export class AppModule {}

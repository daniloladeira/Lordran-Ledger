import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { FormsModule } from "@angular/forms"

// PrimeNG Modules
import { ButtonModule } from "primeng/button"
import { CardModule } from "primeng/card"
import { DialogModule } from "primeng/dialog"
import { InputTextModule } from "primeng/inputtext"
import { InputTextareaModule } from "primeng/inputtextarea"
import { InputNumberModule } from "primeng/inputnumber"
import { DropdownModule } from "primeng/dropdown"
import { CheckboxModule } from "primeng/checkbox"
import { ToastModule } from "primeng/toast"
import { ConfirmDialogModule } from "primeng/confirmdialog"
import { TooltipModule } from "primeng/tooltip"
import { TagModule } from "primeng/tag"

// PrimeNG Services
import { MessageService, ConfirmationService } from "primeng/api"

import { AppComponent } from "./app.component"

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
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
  providers: [MessageService, ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule {}

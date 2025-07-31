import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpellCardComponent } from '../components/spells/spells.component';
import { ApiSpellService } from '../services/spell.service';
import { Spell } from '../models/spell.model';

import { SpellDetailDialogComponent } from '../components/spell-detail-dialog/spell-detail-dialog.component';
import { SpellFormDialogComponent } from '../components/spell-form-dialog/spell-form-dialog.component';

// PrimeNG imports
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-spells-page',
  standalone: true,
  styleUrls: ['./spells.page.component.scss'],
  providers: [MessageService],
  imports: [
    CommonModule,
    SpellCardComponent,
    SpellDetailDialogComponent,
    SpellFormDialogComponent,
    ButtonModule,
    ToolbarModule,
    ToastModule
  ],
  template: `
    <div class="page-container">
      <!-- Toolbar -->
      <p-toolbar styleClass="mb-4">
        <ng-template pTemplate="start">
          <div class="toolbar-left">
            <h2 class="page-title m-0">Feitiços</h2>
            <span class="spells-count">({{spells.length}} itens)</span>
          </div>
        </ng-template>
        
        <ng-template pTemplate="end">
          <div class="toolbar-actions">
            <p-button 
              label="Adicionar" 
              icon="pi pi-plus" 
              severity="success"
              (onClick)="openAddDialog()"
              class="add-button"
            />
            <p-button 
              icon="pi pi-refresh" 
              severity="secondary"
              (onClick)="loadSpells()"
              [loading]="isLoading"
              pTooltip="Atualizar lista"
              tooltipPosition="bottom"
            />
          </div>
        </ng-template>
      </p-toolbar>

      <!-- Grid de Cards -->
            <!-- Grid de Feitiços -->
      <div class="spells-grid" *ngIf="!isLoading">
        <app-spell-card
          *ngFor="let spell of spells"
          [spell]="spell"
          (view)="openDetailDialog($event)"
          (edit)="openEditDialog($event)"
          (delete)="onDeleteSpell($event)"
        ></app-spell-card>
        
        <!-- Mensagem quando não há feitiços -->
        <div *ngIf="spells.length === 0" class="no-results">
          <i class="pi pi-info-circle" style="font-size: 3rem; color: var(--text-color-secondary);"></i>
          <p>Nenhum feitiço cadastrado</p>
        </div>
      </div>
    </div>

    <!-- Toast para notificações -->
    <p-toast />

    <!-- Modal Detalhes -->
    <app-spell-detail-dialog
      [selectedSpell]="selectedSpell"
      [(displayDetailDialog)]="showDetailDialog"
    ></app-spell-detail-dialog>

    <!-- Modal Formulário -->
    <app-spell-form-dialog
      [spell]="selectedSpell"
      [isEditing]="isEditing"
      [(displayDialog)]="showFormDialog"
      (save)="onSaveSpell($event)"
    ></app-spell-form-dialog>
  `,
})
export class SpellsPageComponent implements OnInit {
  spells: Spell[] = [];
  selectedSpell: Spell | null = null;
  isLoading: boolean = false;

  showDetailDialog = false;
  showFormDialog = false;
  isEditing = false;

  constructor(
    private spellsService: ApiSpellService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadSpells();
  }

  loadSpells() {
    this.isLoading = true;
    this.spellsService.getSpells().subscribe({
      next: (data) => {
        this.spells = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao carregar feitiços'
        });
      },
    });
  }

  openDetailDialog(spell: Spell) {
    this.selectedSpell = spell;
    this.showDetailDialog = true;
  }

  openEditDialog(spell: Spell) {
    this.selectedSpell = spell;
    this.isEditing = true;
    this.showFormDialog = true;
  }

  openAddDialog() {
    this.selectedSpell = null;
    this.isEditing = false;
    this.showFormDialog = true;
  }

  onSaveSpell(spell: Spell) {
    if (this.isEditing) {
      this.spellsService.updateSpell(spell.id, spell).subscribe({
        next: (updated) => {
          this.spells = this.spells.map((s) =>
            s.id === updated.id ? updated : s
          );
          this.showFormDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Feitiço atualizado com sucesso!'
          });
        },
        error: (err) => {
          console.error(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao atualizar feitiço'
          });
        },
      });
    } else {
      this.spellsService.addSpell(spell).subscribe({
        next: (created) => {
          this.spells.push(created);
          this.showFormDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Novo feitiço adicionado com sucesso!'
          });
        },
        error: (err) => {
          console.error(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao adicionar feitiço'
          });
        },
      });
    }
  }

  onDeleteSpell(spell: Spell) {
    if (confirm(`Confirma exclusão do feitiço ${spell.name}?`)) {
      this.spellsService.deleteSpell(spell.id).subscribe({
        next: () => {
          this.spells = this.spells.filter((s) => s.id !== spell.id);
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Feitiço excluído com sucesso!'
          });
        },
        error: (err) => {
          console.error(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao excluir feitiço'
          });
        },
      });
    }
  }
}

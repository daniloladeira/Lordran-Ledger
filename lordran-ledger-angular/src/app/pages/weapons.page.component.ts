import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeaponCardComponent } from '../components/weapons/weapons.component';
import { ApiWeaponService } from '../services/weapon.service';
import { ItemDetailDialogComponent } from '../components/item-detail-dialog/item-detail-dialog.component';
import { ItemFormDialogComponent } from '../components/item-form-dialog/item-form-dialog.component';
import { Weapon } from '../models/weapon.model';
import { AuthService } from '../services/auth.service';

// PrimeNG imports
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-weapons-page',
  standalone: true,
  styleUrls: ['./weapon.page.component.scss'],
  providers: [MessageService],
  imports: [
    CommonModule,
    WeaponCardComponent,
    ItemDetailDialogComponent,
    ItemFormDialogComponent,
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
            <h2 class="page-title m-0">Armas</h2>
            <span class="weapons-count">({{weapons.length}} itens)</span>
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
              (onClick)="loadWeapons()"
              [loading]="isLoading"
              pTooltip="Atualizar lista"
              tooltipPosition="bottom"
            />
          </div>
        </ng-template>
      </p-toolbar>

      <!-- Grid de Cards -->
            <!-- Grid de Armas -->
      <div class="weapons-grid" *ngIf="!isLoading">
        <app-weapon-card
          *ngFor="let weapon of weapons"
          [weapon]="weapon"
          (view)="openDetailDialog($event)"
          (edit)="openEditDialog($event)"
          (delete)="onDeleteWeapon($event)"
        ></app-weapon-card>
        
        <!-- Mensagem quando não há armas -->
        <div *ngIf="weapons.length === 0" class="no-results">
          <i class="pi pi-info-circle" style="font-size: 3rem; color: var(--text-color-secondary);"></i>
          <p>Nenhuma arma cadastrada</p>
        </div>
      </div>
    </div>

    <!-- Toast para notificações -->
    <p-toast />

    <!-- Modal Detalhes -->
    <app-item-detail-dialog
      [selectedItem]="selectedWeapon"
      [(displayDetailDialog)]="showDetailDialog"
    ></app-item-detail-dialog>

    <!-- Modal Formulário -->
    <app-item-form-dialog
      [item]="selectedWeapon"
      [isEditing]="isEditing"
      [(displayDialog)]="showFormDialog"
      (save)="onSaveWeapon($event)"
    ></app-item-form-dialog>
  `,
})
export class WeaponsPageComponent implements OnInit {
  weapons: Weapon[] = [];
  selectedWeapon: Weapon | null = null;
  isLoading: boolean = false;

  showDetailDialog = false;
  showFormDialog = false;
  isEditing = false;

  constructor(
    private weaponsService: ApiWeaponService,
    private messageService: MessageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadWeapons();
  }

  loadWeapons() {
    console.log('🏹 [WEAPONS PAGE] Starting to load weapons...');
    console.log('🔍 [WEAPONS PAGE] User authenticated?', this.authService.isAuthenticated());
    console.log('🔑 [WEAPONS PAGE] Current access token:', this.authService.getAccessToken()?.substring(0, 20) + '...');
    
    this.isLoading = true;
    this.weaponsService.getWeapons().subscribe({
      next: (data) => {
        console.log('✅ [WEAPONS PAGE] Successfully loaded weapons:', data);
        this.weapons = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('💥 [WEAPONS PAGE] Error loading weapons:', err);
        console.error('💥 [WEAPONS PAGE] Error details:', {
          status: err.status,
          statusText: err.statusText,
          url: err.url,
          error: err.error
        });
        this.isLoading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao carregar armas'
        });
      },
    });
  }

  openDetailDialog(weapon: Weapon) {
    this.selectedWeapon = weapon;
    this.showDetailDialog = true;
  }

  openEditDialog(weapon: Weapon) {
    this.selectedWeapon = weapon;
    this.isEditing = true;
    this.showFormDialog = true;
  }

  openAddDialog() {
    this.selectedWeapon = null;
    this.isEditing = false;
    this.showFormDialog = true;
  }

  onSaveWeapon(weapon: Weapon) {
    if (!weapon.image) {
      delete (weapon as Partial<Weapon>).image;
    }

    if (this.isEditing) {
      this.weaponsService.updateWeapon(weapon.id, weapon).subscribe({
        next: (updated) => {
          this.weapons = this.weapons.map((w) =>
            w.id === updated.id ? updated : w
          );
          this.showFormDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Arma atualizada com sucesso!'
          });
        },
        error: (err) => {
          console.error(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao atualizar arma'
          });
        },
      });
    } else {
      this.weaponsService.addWeapon(weapon).subscribe({
        next: (created) => {
          this.weapons.push(created);
          this.showFormDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Nova arma adicionada com sucesso!'
          });
        },
        error: (err) => {
          console.error(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao adicionar arma'
          });
        },
      });
    }
  }

  onDeleteWeapon(weapon: Weapon) {
    if (confirm(`Confirma exclusão da arma ${weapon.name}?`)) {
      this.weaponsService.deleteWeapon(weapon.id).subscribe({
        next: () => {
          this.weapons = this.weapons.filter((w) => w.id !== weapon.id);
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Arma excluída com sucesso!'
          });
        },
        error: (err) => {
          console.error(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao excluir arma'
          });
        },
      });
    }
  }
}

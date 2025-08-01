import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Weapon } from '../../models/weapon.model';

@Component({
  selector: 'app-weapons-table',
  standalone: true,
  styleUrls: ['./weapons.component.scss'],
  imports: [CommonModule, TableModule, ButtonModule],
  template: `
    <p-table 
      [value]="weapons" 
      [paginator]="true" 
      [rows]="10"
      [showCurrentPageReport]="true"
      showGridlines
      [rowsPerPageOptions]="[10, 25, 50]"
      currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} armas"
      [globalFilterFields]="['name', 'type', 'description']"
      styleClass="p-datatable-striped"
    >
      <ng-template pTemplate="header">
        <tr>
          <th>Nome</th>
          <th>Tipo</th>
          <th>Dano Físico</th>
          <th>Peso</th>
          <th>STR</th>
          <th>DEX</th>
          <th>Ações</th>
        </tr>
      </ng-template>
      
      <ng-template pTemplate="body" let-weapon>
        <tr>
          <td>
            <div class="weapon-name">
              <strong>{{ weapon.name }}</strong>
              <small *ngIf="weapon.description" class="weapon-description">
                {{ weapon.description }}
              </small>
            </div>
          </td>
          <td>
            <span class="weapon-type-badge">{{ weapon.type | titlecase }}</span>
          </td>
          <td>
            <span class="damage-value">{{ weapon.physical_damage }}</span>
          </td>
          <td>
            <span class="weight-value">{{ weapon.weight }}</span>
          </td>
          <td>
            <span class="stat-value">{{ weapon.strength_required }}</span>
          </td>
          <td>
            <span class="stat-value">{{ weapon.dexterity_required }}</span>
          </td>
          <td>
            <div class="action-buttons">
              <p-button
                icon="pi pi-eye"
                severity="secondary"
                size="small"
                [text]="true"
                (onClick)="view.emit(weapon)"
                pTooltip="Ver detalhes"
              />
              <p-button
                icon="pi pi-pencil"
                severity="info"
                size="small"
                [text]="true"
                (onClick)="edit.emit(weapon)"
                pTooltip="Editar"
              />
              <p-button
                icon="pi pi-trash"
                severity="danger"
                size="small"
                [text]="true"
                (onClick)="delete.emit(weapon)"
                pTooltip="Excluir"
              />
            </div>
          </td>
        </tr>
      </ng-template>
      
      <ng-template pTemplate="emptymessage">
        <tr>
          <td colspan="7" class="text-center">
            <div class="empty-message">
              <i class="pi pi-info-circle" style="font-size: 2rem; color: var(--text-color-secondary);"></i>
              <p>Nenhuma arma cadastrada</p>
            </div>
          </td>
        </tr>
      </ng-template>
    </p-table>
  `,
})
export class WeaponsTableComponent {
  @Input() weapons: Weapon[] = [];
  @Output() view = new EventEmitter<Weapon>();
  @Output() edit = new EventEmitter<Weapon>();
  @Output() delete = new EventEmitter<Weapon>();
}

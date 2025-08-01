import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Spell } from '../../models/spell.model';

@Component({
  selector: 'app-spells-table',
  standalone: true,
  styleUrls: ['./spells.component.scss'],
  imports: [CommonModule, TableModule, ButtonModule],
  template: `
    <p-table 
      [value]="spells" 
      [paginator]="true" 
      [rows]="10"
      [showCurrentPageReport]="true"
      [rowsPerPageOptions]="[10, 25, 50]"
      currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} feitiços"
      [globalFilterFields]="['name', 'school', 'description']"
      styleClass="p-datatable-striped"
    >
      <ng-template pTemplate="header">
        <tr>
          <th>Nome</th>
          <th>Escola</th>
          <th>Custo FP</th>
          <th>INT</th>
          <th>Tipo</th>
          <th>Ações</th>
        </tr>
      </ng-template>
      
      <ng-template pTemplate="body" let-spell>
        <tr>
          <td>
            <div class="spell-name">
              <strong>{{ spell.name }}</strong>
              <small *ngIf="spell.description" class="spell-description">
                {{ spell.description }}
              </small>
            </div>
          </td>
          <td>
            <span class="school-badge" [ngClass]="'school-' + spell.school">
              {{ spell.school | titlecase }}
            </span>
          </td>
          <td>
            <span class="fp-cost">{{ spell.cost_fp }}</span>
          </td>
          <td>
            <span class="stat-value">{{ spell.intelligence_required }}</span>
          </td>
          <td>
            <span class="spell-type" [ngClass]="{ 'offensive': spell.is_offensive, 'defensive': !spell.is_offensive }">
              {{ spell.is_offensive ? 'Ofensivo' : 'Defensivo' }}
            </span>
          </td>
          <td>
            <div class="action-buttons">
              <p-button
                icon="pi pi-eye"
                severity="secondary"
                size="small"
                [text]="true"
                (onClick)="view.emit(spell)"
                pTooltip="Ver detalhes"
              />
              <p-button
                icon="pi pi-pencil"
                severity="info"
                size="small"
                [text]="true"
                (onClick)="edit.emit(spell)"
                pTooltip="Editar"
              />
              <p-button
                icon="pi pi-trash"
                severity="danger"
                size="small"
                [text]="true"
                (onClick)="delete.emit(spell)"
                pTooltip="Excluir"
              />
            </div>
          </td>
        </tr>
      </ng-template>
      
      <ng-template pTemplate="emptymessage">
        <tr>
          <td colspan="6" class="text-center">
            <div class="empty-message">
              <i class="pi pi-info-circle" style="font-size: 2rem; color: var(--text-color-secondary);"></i>
              <p>Nenhum feitiço cadastrado</p>
            </div>
          </td>
        </tr>
      </ng-template>
    </p-table>
  `,
})
export class SpellsTableComponent {
  @Input() spells: Spell[] = [];
  @Output() view = new EventEmitter<Spell>();
  @Output() edit = new EventEmitter<Spell>();
  @Output() delete = new EventEmitter<Spell>();
}

import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { SelectItem } from 'primeng/api';

import type { Spell } from '../../models/spell.model';

@Component({
  selector: 'app-spell-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    CheckboxModule,
  ],
  template: `
    <p-dialog
      [(visible)]="displayDialog"
      header="{{ isEditing ? 'Editar Feitiço' : 'Adicionar Feitiço' }}"
      [modal]="true"
      [closable]="true"
      [style]="{ width: '600px' }"
      (onHide)="onCancel()"
    >
      <form (ngSubmit)="onSave()" #spellForm="ngForm">
        <div class="p-fluid p-formgrid p-grid">

          <div class="p-field p-col-12 p-md-6">
            <label for="name">Nome</label>
            <input
              id="name"
              type="text"
              pInputText
              [(ngModel)]="spellFormModel.name"
              name="name"
              required
            />
          </div>

          <div class="p-field p-col-12 p-md-6">
            <label for="school">Escola</label>
            <select
              id="school"
              [(ngModel)]="spellFormModel.school"
              name="school"
              class="p-inputtext p-component p-element"
              required
            >
              <option value="" disabled>
                Selecione a escola
              </option>
              <option *ngFor="let option of schoolOptions" [value]="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>

          <div class="p-field p-col-12 p-md-6">
            <label for="cost_fp">Custo FP</label>
            <p-inputNumber
              id="cost_fp"
              [(ngModel)]="spellFormModel.cost_fp"
              name="cost_fp"
              [min]="0"
              [mode]="'decimal'"
            ></p-inputNumber>
          </div>

          <div class="p-field p-col-12 p-md-6">
            <label for="intelligence_required">Inteligência Requerida</label>
            <p-inputNumber
              id="intelligence_required"
              [(ngModel)]="spellFormModel.intelligence_required"
              name="intelligence_required"
              [min]="0"
            ></p-inputNumber>
          </div>

          <div class="p-field p-col-12">
            <label for="description">Descrição</label>
            <textarea
              id="description"
              rows="3"
              pInputTextarea
              [(ngModel)]="spellFormModel.description"
              name="description"
              class="p-inputtextarea p-component p-element"
              placeholder="Descrição do feitiço..."
            ></textarea>
          </div>

          <div class="p-field p-col-12">
            <div class="p-field-checkbox">
              <p-checkbox
                inputId="is_offensive"
                [(ngModel)]="spellFormModel.is_offensive"
                name="is_offensive"
                binary="true"
              ></p-checkbox>
              <label for="is_offensive">Feitiço Ofensivo</label>
            </div>
          </div>

        </div>

        <p-footer>
          <button
            pButton
            type="submit"
            label="Salvar"
            [disabled]="!spellForm.form.valid"
          ></button>
          <button
            pButton
            type="button"
            label="Cancelar"
            class="p-button-secondary"
            (click)="onCancel()"
          ></button>
        </p-footer>
      </form>
    </p-dialog>
  `,
  styles: [`
    .p-fluid .p-field {
      margin-bottom: 1.5rem;
    }

    .p-field label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: var(--text-color);
      font-size: 0.875rem;
    }

    .p-formgrid {
      display: grid;
      gap: 1rem;
      padding: 1.5rem;
    }

    .p-col-12 {
      grid-column: span 12;
    }

    .p-col-6 {
      grid-column: span 6;
    }

    @media (min-width: 768px) {
      .p-formgrid {
        grid-template-columns: repeat(12, 1fr);
      }
    }

    @media (max-width: 767px) {
      .p-formgrid {
        grid-template-columns: 1fr;
      }
      
      .p-col-6 {
        grid-column: span 1;
      }
    }

    .p-field-checkbox {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .p-field-checkbox label {
      margin-bottom: 0;
      cursor: pointer;
    }

    /* Estilos específicos para select nativo */
    select.p-inputtext {
      padding: 0.75rem;
      border: 1px solid var(--surface-border);
      border-radius: 4px;
      background: var(--surface-0);
      color: var(--text-color);
      font-size: 0.875rem;
      width: 100%;
    }

    select.p-inputtext:focus {
      border-color: var(--primary-color);
      box-shadow: 0 0 0 2px rgba(var(--primary-color-rgb), 0.2);
      outline: none;
    }

    /* Footer styles */
    :host ::ng-deep .p-dialog .p-dialog-footer {
      display: flex;
      gap: 0.75rem;
      justify-content: flex-end;
      padding: 1rem 1.5rem;
      border-top: 1px solid var(--surface-border);
    }
  `],
})
export class SpellFormDialogComponent implements OnChanges {
  @Input() displayDialog = false;
  @Input() spell: Spell | null = null;
  @Input() isEditing = false;

  @Output() save = new EventEmitter<Spell>();
  @Output() displayDialogChange = new EventEmitter<boolean>();

  spellFormModel: Partial<Spell> = {};

  schoolOptions: SelectItem[] = [
    { label: 'Sorcery', value: 'sorcery' },
    { label: 'Pyromancy', value: 'pyromancy' },
    { label: 'Miracle', value: 'miracle' },
    { label: 'Hex', value: 'hex' },
  ];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['displayDialog'] && this.displayDialog) {
      this.spellFormModel = this.isEditing && this.spell ? { ...this.spell } : this.getEmptySpell();
    }
  }

  onSave() {
    this.save.emit(this.spellFormModel as Spell);
    this.onCancel();
  }

  onCancel() {
    this.displayDialog = false;
    this.displayDialogChange.emit(false);
  }

  private getEmptySpell(): Spell {
    return {
      id: 0,
      name: '',
      description: '',
      school: 'sorcery',
      cost_fp: 0,
      intelligence_required: 0,
      is_offensive: true,
      created_at: new Date(),
    };
  }
}

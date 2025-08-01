import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    ReactiveFormsModule,
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
      <form [formGroup]="spellForm" (ngSubmit)="onSave()">
        <div class="p-fluid p-formgrid p-grid">

          <div class="p-field p-col-12 p-md-6">
            <label for="name">Nome</label>
            <input
              id="name"
              type="text"
              pInputText
              formControlName="name"
              required
              [class.ng-invalid]="spellForm.get('name')?.invalid && spellForm.get('name')?.touched"
            />
            <small *ngIf="spellForm.get('name')?.invalid && spellForm.get('name')?.touched" class="p-error">
              Nome é obrigatório
            </small>
          </div>

          <div class="p-field p-col-12 p-md-6">
            <label for="school">Escola</label>
            <select
              id="school"
              formControlName="school"
              class="p-inputtext p-component p-element"
              required
              [class.ng-invalid]="spellForm.get('school')?.invalid && spellForm.get('school')?.touched"
            >
              <option value="" disabled>
                Selecione a escola
              </option>
              <option *ngFor="let option of schoolOptions" [value]="option.value">
                {{ option.label }}
              </option>
            </select>
            <small *ngIf="spellForm.get('school')?.invalid && spellForm.get('school')?.touched" class="p-error">
              Escola é obrigatória
            </small>
          </div>

          <div class="p-field p-col-12 p-md-6">
            <label for="cost_fp">Custo FP</label>
            <p-inputNumber
              id="cost_fp"
              formControlName="cost_fp"
              [min]="0"
              [mode]="'decimal'"
            ></p-inputNumber>
          </div>

          <div class="p-field p-col-12 p-md-6">
            <label for="intelligence_required">Inteligência Requerida</label>
            <p-inputNumber
              id="intelligence_required"
              formControlName="intelligence_required"
              [min]="0"
            ></p-inputNumber>
          </div>

          <div class="p-field p-col-12">
            <label for="description">Descrição</label>
            <textarea
              id="description"
              rows="3"
              pInputTextarea
              formControlName="description"
              class="p-inputtextarea p-component p-element"
              placeholder="Descrição do feitiço..."
            ></textarea>
          </div>

          <div class="p-field p-col-12">
            <div class="p-field-checkbox">
              <p-checkbox
                inputId="is_offensive"
                formControlName="is_offensive"
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
  styles: [
    `
      .p-error {
        color: #e74c3c;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        display: block;
      }
      
      .ng-invalid.ng-touched {
        border-color: #e74c3c !important;
      }
      
      .p-field {
        margin-bottom: 1rem;
      }
    `,
  ],
})
export class SpellFormDialogComponent implements OnChanges {
  @Input() displayDialog = false;
  @Input() spell: Spell | null = null;
  @Input() isEditing = false;

  @Output() save = new EventEmitter<Spell>();
  @Output() displayDialogChange = new EventEmitter<boolean>();

  spellForm: FormGroup;

  schoolOptions: SelectItem[] = [
    { label: 'Sorcery', value: 'sorcery' },
    { label: 'Pyromancy', value: 'pyromancy' },
    { label: 'Miracle', value: 'miracle' },
    { label: 'Hex', value: 'hex' },
  ];

  constructor(private fb: FormBuilder) {
    this.spellForm = this.createForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['displayDialog'] && this.displayDialog) {
      const spell = this.isEditing && this.spell ? this.spell : this.getEmptySpell();
      this.spellForm.patchValue(spell);
    }
  }

  onSave() {
    if (this.spellForm.valid) {
      this.save.emit(this.spellForm.value as Spell);
      this.onCancel();
    } else {
      // Marca todos os campos como touched para mostrar os erros
      Object.keys(this.spellForm.controls).forEach(key => {
        this.spellForm.get(key)?.markAsTouched();
      });
      console.log('Formulário inválido:', this.spellForm.errors);
      console.log('Controles inválidos:', Object.keys(this.spellForm.controls).filter(key => this.spellForm.get(key)?.invalid));
    }
  }

  onCancel() {
    this.displayDialog = false;
    this.displayDialogChange.emit(false);
    this.spellForm.reset();
    // Reset para valores padrão após o reset
    this.spellForm.patchValue(this.getEmptySpell());
  }

  private createForm(): FormGroup {
    return this.fb.group({
      id: [0],
      name: ['', Validators.required],
      description: [''],
      school: ['sorcery', Validators.required],
      cost_fp: [0, [Validators.min(0)]],
      intelligence_required: [0, [Validators.min(0)]],
      is_offensive: [true],
      created_at: [new Date()]
    });
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

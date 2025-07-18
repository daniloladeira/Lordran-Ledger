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
              class="p-inputtext p-component"
              required
            >
              <option [ngValue]="null" disabled selected>
                Selecione a escola
              </option>
              <option *ngFor="let option of schoolOptions" [value]="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>

          <div class="p-field p-col-12 p-md-6">
            <label for="slots_required">Slots Necessários</label>
            <p-inputNumber
              id="slots_required"
              [(ngModel)]="spellFormModel.slots_required"
              name="slots_required"
              [min]="1"
              [mode]="'decimal'"
              required
            ></p-inputNumber>
          </div>

          <div class="p-field p-col-12 p-md-6">
            <label for="uses">Usos</label>
            <p-inputNumber
              id="uses"
              [(ngModel)]="spellFormModel.uses"
              name="uses"
              [min]="1"
              [mode]="'decimal'"
              required
            ></p-inputNumber>
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
            <label for="cost_stamina">Custo Stamina</label>
            <p-inputNumber
              id="cost_stamina"
              [(ngModel)]="spellFormModel.cost_stamina"
              name="cost_stamina"
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

          <div class="p-field p-col-12 p-md-6">
            <label for="faith_required">Fé Requerida</label>
            <p-inputNumber
              id="faith_required"
              [(ngModel)]="spellFormModel.faith_required"
              name="faith_required"
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
            ></textarea>
          </div>

          <div class="p-field p-col-12 p-md-4">
            <p-checkbox
              inputId="is_offensive"
              [(ngModel)]="spellFormModel.is_offensive"
              name="is_offensive"
              binary="true"
            ></p-checkbox>
            <label for="is_offensive">Ofensivo</label>
          </div>

          <div class="p-field p-col-12 p-md-4">
            <p-checkbox
              inputId="is_buff"
              [(ngModel)]="spellFormModel.is_buff"
              name="is_buff"
              binary="true"
            ></p-checkbox>
            <label for="is_buff">Buff</label>
          </div>

          <div class="p-field p-col-12 p-md-4">
            <p-checkbox
              inputId="is_heal"
              [(ngModel)]="spellFormModel.is_heal"
              name="is_heal"
              binary="true"
            ></p-checkbox>
            <label for="is_heal">Cura</label>
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
  styles: [``],
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
      slots_required: 1,
      uses: 1,
      cost_fp: 0,
      cost_stamina: 0,
      intelligence_required: 0,
      faith_required: 0,
      is_offensive: true,
      is_buff: false,
      is_heal: false,
      created_at: new Date(),
      image: '',
    };
  }
}

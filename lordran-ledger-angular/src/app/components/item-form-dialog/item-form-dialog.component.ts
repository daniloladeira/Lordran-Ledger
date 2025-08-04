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
import { SelectItem } from 'primeng/api';

import type { Weapon } from '../../models/weapon.model';

@Component({
  selector: 'app-item-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
  ],
  template: `
    <p-dialog
      [(visible)]="displayDialog"
      header="{{ isEditing ? 'Editar Arma' : 'Adicionar Arma' }}"
      [modal]="true"
      [closable]="true"
      [style]="{ width: '600px' }"
      (onHide)="onCancel()"
    >
      <form [formGroup]="weaponForm" (ngSubmit)="onSave()">
        <div class="p-fluid p-formgrid p-grid">
          <div class="p-field p-col-12 p-md-6">
            <label for="name">Nome</label>
            <input
              id="name"
              type="text"
              pInputText
              formControlName="name"
              required
            />
          </div>

          <div class="p-field p-col-12 p-md-6">
            <label for="type">Tipo</label>
            <select
              id="type"
              formControlName="type"
              class="p-inputtext p-component"
              required
            >
              <option value="" disabled>
                Selecione o tipo
              </option>
              <option *ngFor="let option of typeOptions" [value]="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>

          <div class="p-field p-col-12 p-md-6">
            <label for="weight">Peso</label>
            <p-inputNumber
              id="weight"
              formControlName="weight"
              [min]="0"
              [mode]="'decimal'"
              [step]="0.1"
            ></p-inputNumber>
          </div>

          <div class="p-field p-col-12 p-md-6">
            <label for="physical_damage">Dano Físico</label>
            <p-inputNumber
              id="physical_damage"
              formControlName="physical_damage"
              [min]="0"
            ></p-inputNumber>
          </div>

          <div class="p-field p-col-12 p-md-6">
            <label for="strength_required">Força Requerida</label>
            <p-inputNumber
              id="strength_required"
              formControlName="strength_required"
              [min]="0"
            ></p-inputNumber>
          </div>

          <div class="p-field p-col-12 p-md-6">
            <label for="dexterity_required">Destreza Requerida</label>
            <p-inputNumber
              id="dexterity_required"
              formControlName="dexterity_required"
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
            ></textarea>
          </div>
        </div>

        <p-footer>
          <button
            pButton
            type="submit"
            label="Salvar"
            [disabled]="!weaponForm.valid"
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
      /* Seu CSS aqui */
    `,
  ],
})
export class ItemFormDialogComponent implements OnChanges {
  @Input() displayDialog = false;
  @Input() item: Weapon | null = null;
  @Input() isEditing = false;

  @Output() save = new EventEmitter<Weapon>();
  @Output() displayDialogChange = new EventEmitter<boolean>();

  weaponForm: FormGroup;

  typeOptions: SelectItem[] = [
    { label: 'Sword', value: 'sword' },
    { label: 'Axe', value: 'axe' },
    { label: 'Bow', value: 'bow' },
    { label: 'Spear', value: 'spear' },
    { label: 'Greatsword', value: 'greatsword' },
    { label: 'Katana', value: 'katana' },
    { label: 'Fist', value: 'fist' },
    { label: 'Halberd', value: 'halberd' },
    { label: 'Magic', value: 'magic' },
  ];

  constructor(private fb: FormBuilder) {
    this.weaponForm = this.createForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['displayDialog'] && this.displayDialog) {
      const weapon = this.isEditing && this.item ? this.item : this.getEmptyWeapon();
      this.weaponForm.patchValue(weapon);
    }
  }

  onSave() {
    if (this.weaponForm.valid) {
      const formValue = this.weaponForm.value;
      
      // Cria o objeto com apenas os campos necessários (SEM image)
      const weaponData: any = {
        name: formValue.name,
        description: formValue.description || '',
        type: formValue.type,
        physical_damage: formValue.physical_damage,
        weight: formValue.weight,
        strength_required: formValue.strength_required,
        dexterity_required: formValue.dexterity_required
      };
      
      // Adiciona id apenas se estiver editando
      if (this.isEditing && this.item?.id) {
        weaponData.id = this.item.id;
      }
      
      console.log('Dados da arma sendo enviados (sem image):', weaponData);
      this.save.emit(weaponData as Weapon);
      this.onCancel();
    } else {
      console.log('Formulário inválido:', this.weaponForm.errors);
      console.log('Controles inválidos:', Object.keys(this.weaponForm.controls).filter(key => this.weaponForm.get(key)?.invalid));
    }
  }

  onCancel() {
    this.displayDialog = false;
    this.displayDialogChange.emit(false);
    this.weaponForm.reset();
    // Reset para valores padrão após o reset
    this.weaponForm.patchValue(this.getEmptyWeapon());
  }

  private createForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      description: [''],
      type: ['', Validators.required],
      physical_damage: [0, [Validators.min(10)]],
      weight: [[Validators.min(0)]],
      strength_required: [10, [Validators.min(0)]],
      dexterity_required: [10, [Validators.min(0)]]
    });
  }

  private getEmptyWeapon(): any {
    return {
      name: '',
      description: '',
      type: '',
      physical_damage: 0,
      weight: 1.0,
      strength_required: 10,
      dexterity_required: 10
    };
  }
}

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
import { SelectItem } from 'primeng/api';

import type { Weapon } from '../../models/weapon.model';

@Component({
  selector: 'app-item-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
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
      <form (ngSubmit)="onSave()" #weaponForm="ngForm">
        <div class="p-fluid p-formgrid p-grid">
          <div class="p-field p-col-12 p-md-6">
            <label for="name">Nome</label>
            <input
              id="name"
              type="text"
              pInputText
              [(ngModel)]="weaponFormModel.name"
              name="name"
              required
            />
          </div>

          <div class="p-field p-col-12 p-md-6">
            <label for="type">Tipo</label>
            <select
              id="type"
              [(ngModel)]="weaponFormModel.type"
              name="type"
              class="p-inputtext p-component"
              required
            >
              <option [ngValue]="null" disabled selected>
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
              [(ngModel)]="weaponFormModel.weight"
              name="weight"
              [min]="0"
              [mode]="'decimal'"
              [step]="0.1"
            ></p-inputNumber>
          </div>

          <div class="p-field p-col-12 p-md-6">
            <label for="physical_damage">Dano Físico</label>
            <p-inputNumber
              id="physical_damage"
              [(ngModel)]="weaponFormModel.physical_damage"
              name="physical_damage"
              [min]="0"
            ></p-inputNumber>
          </div>

          <div class="p-field p-col-12 p-md-6">
            <label for="strength_required">Força Requerida</label>
            <p-inputNumber
              id="strength_required"
              [(ngModel)]="weaponFormModel.strength_required"
              name="strength_required"
              [min]="0"
            ></p-inputNumber>
          </div>

          <div class="p-field p-col-12 p-md-6">
            <label for="dexterity_required">Destreza Requerida</label>
            <p-inputNumber
              id="dexterity_required"
              [(ngModel)]="weaponFormModel.dexterity_required"
              name="dexterity_required"
              [min]="0"
            ></p-inputNumber>
          </div>

          <div class="p-field p-col-12">
            <label for="description">Descrição</label>
            <textarea
              id="description"
              rows="3"
              pInputTextarea
              [(ngModel)]="weaponFormModel.description"
              name="description"
            ></textarea>
          </div>
        </div>

        <p-footer>
          <button
            pButton
            type="submit"
            label="Salvar"
            [disabled]="!weaponForm.form.valid"
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

  weaponFormModel: Partial<Weapon> = {};

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['displayDialog'] && this.displayDialog) {
      this.weaponFormModel =
        this.isEditing && this.item ? { ...this.item } : this.getEmptyWeapon();
    }
  }

  onSave() {
    this.save.emit(this.weaponFormModel as Weapon);
    this.onCancel();
  }

  onCancel() {
    this.displayDialog = false;
    this.displayDialogChange.emit(false);
  }

  private getEmptyWeapon(): Weapon {
    return {
      id: 0,
      name: '',
      description: '',
      type: '',
      physical_damage: 0,
      weight: 1.0,
      strength_required: 10,
      dexterity_required: 10,
      created_at: new Date(),
      image: '',
    };
  }
}

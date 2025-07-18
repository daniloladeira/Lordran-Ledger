import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeaponCardComponent } from '../components/weapons/weapons.component';
import { ApiWeaponService } from '../services/weapon.service';
import { ItemDetailDialogComponent } from '../components/item-detail-dialog/item-detail-dialog.component';
import { ItemFormDialogComponent } from '../components/item-form-dialog/item-form-dialog.component';
import { Weapon } from '../models/weapon.model';

@Component({
  selector: 'app-weapons-page',
  standalone: true,
  styleUrls: ['./weapon.page.component.scss'],
  imports: [
    CommonModule,
    WeaponCardComponent,
    ItemDetailDialogComponent,
    ItemFormDialogComponent,
  ],
  template: `
    <div class="cards-grid-container">
      <app-weapon-card
        *ngFor="let weapon of weapons"
        [weapon]="weapon"
        (view)="openDetailDialog($event)"
        (edit)="openEditDialog($event)"
        (delete)="onDeleteWeapon($event)"
      ></app-weapon-card>
    </div>

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

    <button pButton label="Adicionar Arma" (click)="openAddDialog()"></button>
  `,
})
export class WeaponsPageComponent implements OnInit {
  weapons: Weapon[] = [];
  selectedWeapon: Weapon | null = null;

  showDetailDialog = false;
  showFormDialog = false;
  isEditing = false;

  constructor(private weaponsService: ApiWeaponService) {}

  ngOnInit(): void {
    this.loadWeapons();
  }

  loadWeapons() {
    this.weaponsService.getWeapons().subscribe({
      next: (data) => (this.weapons = data),
      error: (err) => console.error(err),
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
        },
        error: (err) => console.error(err),
      });
    } else {
      this.weaponsService.addWeapon(weapon).subscribe({
        next: (created) => {
          this.weapons.push(created);
          this.showFormDialog = false;
        },
        error: (err) => console.error(err),
      });
    }
  }

  onDeleteWeapon(weapon: Weapon) {
    if (confirm(`Confirma exclusão da arma ${weapon.name}?`)) {
      this.weaponsService.deleteWeapon(weapon.id).subscribe({
        next: () => {
          this.weapons = this.weapons.filter((w) => w.id !== weapon.id);
        },
        error: (err) => console.error(err),
      });
    }
  }
}

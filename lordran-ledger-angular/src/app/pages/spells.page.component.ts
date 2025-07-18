import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpellCardComponent } from '../components/spells/spells.component';
import { ApiSpellService } from '../services/spell.service';
import { Spell } from '../models/spell.model';

import { SpellDetailDialogComponent } from '../components/spell-detail-dialog/spell-detail-dialog.component';
import { SpellFormDialogComponent } from '../components/spell-form-dialog/spell-form-dialog.component';

@Component({
  selector: 'app-spells-page',
  standalone: true,
  styleUrls: ['./spells.page.component.scss'],
  imports: [
    CommonModule,
    SpellCardComponent,
    SpellDetailDialogComponent,
    SpellFormDialogComponent,
  ],
  template: `
    <div class="cards-grid-container">
      <app-spell-card
        *ngFor="let spell of spells"
        [spell]="spell"
        (view)="openDetailDialog($event)"
        (edit)="openEditDialog($event)"
        (delete)="onDeleteSpell($event)"
      ></app-spell-card>
    </div>

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

    <button pButton label="Adicionar Feitiço" (click)="openAddDialog()"></button>
  `,
})
export class SpellsPageComponent implements OnInit {
  spells: Spell[] = [];
  selectedSpell: Spell | null = null;

  showDetailDialog = false;
  showFormDialog = false;
  isEditing = false;

  constructor(private spellsService: ApiSpellService) {}

  ngOnInit(): void {
    this.loadSpells();
  }

  loadSpells() {
    this.spellsService.getSpells().subscribe({
      next: (data) => (this.spells = data),
      error: (err) => console.error(err),
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
    if (!spell.image) {
      delete (spell as Partial<Spell>).image;
    }

    if (this.isEditing) {
      this.spellsService.updateSpell(spell.id, spell).subscribe({
        next: (updated) => {
          this.spells = this.spells.map((s) =>
            s.id === updated.id ? updated : s
          );
          this.showFormDialog = false;
        },
        error: (err) => console.error(err),
      });
    } else {
      this.spellsService.addSpell(spell).subscribe({
        next: (created) => {
          this.spells.push(created);
          this.showFormDialog = false;
        },
        error: (err) => console.error(err),
      });
    }
  }

  onDeleteSpell(spell: Spell) {
    if (confirm(`Confirma exclusão do feitiço ${spell.name}?`)) {
      this.spellsService.deleteSpell(spell.id).subscribe({
        next: () => {
          this.spells = this.spells.filter((s) => s.id !== spell.id);
        },
        error: (err) => console.error(err),
      });
    }
  }
}

import { Component, OnInit, Input, inject } from '@angular/core'; // importando componentes basicos do angular
import { Bean } from '../bean'; // importantando a interface Bean
import { BeanInsertService } from './bean-insert.service';
import { Router } from '@angular/router'; // importando o router
import { catchError, of, tap } from 'rxjs'; // importando operadores rxjs
import { FormGroup, ReactiveFormsModule } from '@angular/forms'; // importando form group e reactive forms para formularios reativos
import { CommonModule } from '@angular/common'; // importando o commom module para usar ngIf e ngFor
import { NzButtonModule } from 'ng-zorro-antd/button'; // importando o modulo de botoes do ng zorro
import { NzLayoutModule } from 'ng-zorro-antd/layout';

@Component({
  selector: 'app-bean-insert-panel',
  imports: [CommonModule, ReactiveFormsModule, NzButtonModule, NzLayoutModule],
  template: `
    <form *ngIf="formGroup" [formGroup]="formGroup">
      <nz-header>
        <ng-content></ng-content>

        <button nz-button nzType="primary" (click)="insert()" [disabled]="formGroup.invalid">
          <nz-icon nzType="plus"></nz-icon>
          Adicionar
        </button>
      </nz-header>
    </form>
  `,
})
export class BeanInsertPanelComponen<T extends Bean, I>  {
  @Input() formGroup!: FormGroup; // input do formulario reativo

  @Input()
  createBean!: () => I;

  @Input()
  beanInsertService!: BeanInsertService<T, I>;

  @Input()
  beanName!: string;

  @Input()
  routerName!: string;

  private readonly router = inject(Router); // injetando o router

  insert() {
    if (this.formGroup.valid) {
      this.beanInsertService
        .insert(this.createBean())
        .pipe(
          catchError((error) => {
            console.error(`Erro ao inserir ${this.beanName}:`, error);
            return of(null); // Retorna um observable vazio em caso de erro
          }),
          tap((bean) => {
            this.router.navigate([`/${this.routerName}`]); // redireciona para a rota do bean
            console.log(`Bean ${this.beanName} inserido com sucesso:`, bean);
          })
        )
        .subscribe();
    }
  }

  cancelInsert() {
    this.router.navigate([`/${this.routerName}`]); // redireciona para a rota do bean
  }
}

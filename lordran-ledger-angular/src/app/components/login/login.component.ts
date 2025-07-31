import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

// PrimeNG imports
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    MessageModule,
    FloatLabelModule
  ],
  template: `
    <div class="login-container">
      <div class="login-wrapper">
        <p-card header="Lordran Ledger - Login" styleClass="login-card">
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            
            <div class="field">
              <p-floatlabel>
                <input 
                  id="username"
                  type="text" 
                  pInputText 
                  formControlName="username"
                  [class.ng-invalid]="loginForm.get('username')?.invalid && loginForm.get('username')?.touched"
                />
                <label for="username">Usuário</label>
              </p-floatlabel>
              <small 
                class="p-error" 
                *ngIf="loginForm.get('username')?.invalid && loginForm.get('username')?.touched"
              >
                Usuário é obrigatório
              </small>
            </div>

            <div class="field">
              <p-floatlabel>
                <p-password 
                  id="password"
                  formControlName="password"
                  [feedback]="false"
                  [toggleMask]="true"
                  styleClass="w-full"
                  inputStyleClass="w-full"
                  [class.ng-invalid]="loginForm.get('password')?.invalid && loginForm.get('password')?.touched"
                />
                <label for="password">Senha</label>
              </p-floatlabel>
              <small 
                class="p-error" 
                *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched"
              >
                Senha é obrigatória
              </small>
            </div>

            <p-message 
              *ngIf="errorMessage" 
              severity="error" 
              [text]="errorMessage"
              styleClass="w-full mb-3"
            />

            <div class="button-container">
              <p-button 
                type="submit"
                label="Entrar"
                icon="pi pi-sign-in"
                [loading]="isLoading"
                [disabled]="loginForm.invalid"
                styleClass="w-full"
              />
            </div>
          </form>
        </p-card>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 1rem;
    }

    .login-wrapper {
      width: 100%;
      max-width: 400px;
    }

    .login-card {
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      border-radius: 12px;
      overflow: hidden;
    }

    .field {
      margin-bottom: 1.5rem;
    }

    .button-container {
      margin-top: 2rem;
    }

    :host ::ng-deep {
      .p-card-header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        text-align: center;
        font-weight: 600;
        font-size: 1.2rem;
        padding: 1.5rem;
      }

      .p-card-content {
        padding: 2rem;
      }

      .p-floatlabel {
        width: 100%;
      }

      .p-inputtext, .p-password input {
        width: 100%;
      }

      .p-button {
        height: 3rem;
        font-weight: 600;
      }

      .p-message {
        margin-bottom: 1rem;
      }
    }
  `]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const credentials = this.loginForm.value;

      this.authService.login(credentials).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Login error:', error);
          
          if (error.status === 401) {
            this.errorMessage = 'Usuário ou senha inválidos';
          } else if (error.status === 0) {
            this.errorMessage = 'Erro de conexão. Verifique se o servidor está rodando.';
          } else {
            this.errorMessage = 'Erro interno do servidor. Tente novamente.';
          }
        }
      });
    }
  }
}

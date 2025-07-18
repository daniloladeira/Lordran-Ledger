// src/app/app.config.ts

import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

import Lara from '@primeng/themes/lara';
// import Vela from '@primeng/themes/vela'; // Removed because the module does not exist

import { MessageService } from 'primeng/api'; // <--- Importe MessageService aqui!

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Lara, // Changed to Lara theme as Vela is not available
        options: {
          darkModeSelector: '.app-dark'
        },
      },
    }),
    MessageService // <--- Adicione MessageService aos providers aqui!
  ]
};
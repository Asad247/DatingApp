import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { InitService } from '../init-service';
import { lastValueFrom } from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withViewTransitions()),
    provideHttpClient(),
    provideAppInitializer(async () => {
      const initService = inject(InitService);

      try {
        // 1. Run your init logic
        await lastValueFrom(initService.init());

        // 2. Add a manual "cozy" delay (1500ms)
        await new Promise(resolve => setTimeout(resolve, 1000));

      } finally {
        const splash = document.getElementById('initial-splash');
        if (splash) {
          // Optional: add tailwind fade class before removing
          splash.classList.add('opacity-0');
          setTimeout(() => splash.remove(), 300);
        }
      }
    })
  ]
};

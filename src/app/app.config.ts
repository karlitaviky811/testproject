import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './core/services/auth_service';
import { PurchaseService } from './core/services/purchase_service';

const I18N_CONFIG = {
  defaultLanguage: 'en', // this name need to be the same as the JSON file
  loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [HttpClient],
  },
};
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}
export const appConfig: ApplicationConfig = {
  providers: [
    AuthService,
    PurchaseService,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(),
    provideHttpClient(),
    importProvidersFrom(TranslateModule.forRoot(I18N_CONFIG)),
    importProvidersFrom([BrowserAnimationsModule]),
  ],
};

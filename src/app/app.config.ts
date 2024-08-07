import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './core/services/auth_service';
import { provideNgxStripe } from 'ngx-stripe';
import { CartService } from './core/services/cart_service';
import { authInterceptor } from './core/interceptors/auth.interceptor';

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
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withInterceptors([authInterceptor])),
    AuthService,
    CartService,
    provideNgxStripe(),
    importProvidersFrom(TranslateModule.forRoot(I18N_CONFIG)),
    importProvidersFrom([BrowserAnimationsModule]),
  ],
};

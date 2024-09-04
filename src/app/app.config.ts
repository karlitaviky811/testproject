import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

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
import { UsersService } from './core/services/users_service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SpinnerService } from './core/services/spinner_service';
import { PurchaseService } from './core/services/purchase_service';
import { RouteEventsService } from './core/services/route_event_service';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaModule, RecaptchaV3Module } from "ng-recaptcha-2";
import { RobotService } from './core/services/robot_service';
import { StrategyService } from './core/services/strategy_service';

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
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(),
    provideHttpClient(withInterceptors([authInterceptor])),
    AuthService,
    CartService,
    PurchaseService,
    UsersService,
    ConfirmationService, 
    MessageService,
    SpinnerService,
    PurchaseService,
    RobotService,
    RouteEventsService,
    StrategyService,
    importProvidersFrom(RecaptchaModule),
    { provide: RECAPTCHA_V3_SITE_KEY, useValue: '6LcKPjQqAAAAAL2kpt1WlZiXGv01bwvTnFmstpR1' },
    provideNgxStripe(),
    importProvidersFrom(TranslateModule.forRoot(I18N_CONFIG)),
    importProvidersFrom([BrowserAnimationsModule]),
 
  ],

  
};

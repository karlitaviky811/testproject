import { Routes } from '@angular/router';
import { LandingLayoutComponent } from './layouts/landing-layout/landing-layout.component';
import { ROUTE_LANDING } from './modules/landings/landings.routes';
import { ROUTE_SIGN_IN } from './modules/auth/auth.routes';
import { ROUTE_ADMIN } from './modules/admin/admin.routes';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { authGuardGuard } from './core/guards/auth-guard.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/site',
        pathMatch: 'full',
      
    },
    {
        path: 'site',
        component: LandingLayoutComponent,
        children: [
            ...ROUTE_LANDING,
        ]
    },
    {
        path: 'admin',
        component: AdminLayoutComponent,
        children: [
            ...ROUTE_ADMIN,
        ],
        canActivate: [authGuardGuard]
    },
    ...ROUTE_SIGN_IN,
];

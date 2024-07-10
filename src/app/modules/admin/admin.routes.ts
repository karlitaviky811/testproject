import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

export const ROUTE_ADMIN: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'profile',
    },
    {
        path: 'profile',
        loadComponent: () => import('./profile/profile.component'),
    },
    {
        path: 'shopping',
        loadComponent: () => import('./shopping/shopping.component'),
    },
    {
        path: 'shopping-detail/:id',
        loadComponent: () => import('./shopping-detail/shopping-detail.component'),
    },
    {
        path: 'robots-license',
        loadComponent: () => import('./robots-license/robots-license.component'),
    },
    {
        path: 'downloads',
        loadComponent: () => import('./downloads/downloads.component'),
    },
    
];
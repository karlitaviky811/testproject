import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

export const ROUTE_SIGN_IN: Routes = [
    {
        path: 'sign-in',
        pathMatch: 'full',
        loadComponent: () => import('./sign-in/sign-in.component'),
    },
    {
        path: 'register',
        pathMatch: 'full',
        loadComponent: () => import('./register/register.component'),
    },
];
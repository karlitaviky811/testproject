import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";

export const ROUTE_LANDING: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./home/home.component'),
    },
    {
        path: 'products',
        loadComponent: () => import('./products/products.component'),
    },
    {
        path: 'products-detail',
        loadComponent: () => import('./products-detail/products-detail.component'),
    },
    {
        path: 'contact',
        loadComponent: () => import('./contact/contact.component'),
    },
    {
        path: 'about',
        loadComponent: () => import('./about/about.component'),
    },
    {
        path: 'robots',
        loadComponent: () => import('./robots/robots.component'),
    },
    {
        path: 'robot-detail/:id',
        loadComponent: () => import('./robot-detail/robot-detail.component'),
    },
    {
        path: 'purchasing-process/:id',
        loadComponent: () => import('./purchasing-process/purchasing-process.component'),
    },
    {
        path: 'shopping-cart',
        loadComponent: () => import('./shopping-cart/shopping-cart.component'),
    },
    {
        path: 'robot-strategies',
        loadComponent: () => import('./robot-strategies/robot-strategies.component'),
    },
    {
        path: 'payment-methods',
        loadComponent: () => import('./payment-methods/payment-methods.component'),
    },
];
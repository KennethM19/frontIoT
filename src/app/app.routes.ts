import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { SignalsComponent } from './pages/signals/signals.component';

export const routes: Routes = [
    {
        path:'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(() => DashboardComponent)
    },
    {
        path:'login',
        loadComponent: () => import('./auth/login/login.component').then(() => LoginComponent)
    },
    {
        path:'señales',
        loadComponent: () => import('./pages/signals/signals.component').then(() => SignalsComponent)
    }
];

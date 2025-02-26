import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './guard/auth/auth.guard';

export const routes: Routes = [
    {
        path:'dashboard',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(() => DashboardComponent)
    },
    {
        path:'login',
        loadComponent: () => import('./auth/login/login.component').then(() => LoginComponent)
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    }
];

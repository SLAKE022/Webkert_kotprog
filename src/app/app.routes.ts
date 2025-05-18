import { Routes } from '@angular/router';
import { authGuard, publicGuard } from './shared/guards/auth.guard';
export const routes: Routes = [
  // Alapértelmezett útvonal -> Home
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  // Oldalak lazy-loaddal
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    canActivate: [authGuard]
  },
  {
    path: 'products',
    loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent),
    canActivate: [authGuard]
  },
  {
    path: 'add',
    loadComponent: () => import('./pages/add/add.component').then(m => m.AddComponent),
    canActivate: [authGuard]
  },
  /*{
    path: 'update/:id',
    loadComponent: () => import('./pages/update/update.component').then(m => m.UpdateComponent),
    canActivate: [authGuard]
  },*/
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [authGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
    canActivate: [publicGuard]
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/signup/signup.component').then(m => m.SignupComponent),
    canActivate: [publicGuard]
  },

  // Wildcard – 404
  {
    path: '**',
    loadComponent: () => import('./shared/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent)
  },
];

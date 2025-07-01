import { Routes } from '@angular/router';

export const routes: Routes = [
    {
    path: '',
    loadComponent: () => import('./home/home').then(m => m.Home),
    title: 'Home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home').then(m => m.Home),
    title: 'Home',
    pathMatch: 'full'
  },
  {
    path: 'code',
    loadComponent: () => import('./code/code').then(m => m.Code),
    title: 'Code',
    pathMatch: 'full'
  }
];

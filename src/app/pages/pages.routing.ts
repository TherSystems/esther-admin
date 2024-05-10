import { Routes } from '@angular/router';

export const pagesRouting: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
  },

  {
    path: 'empleados',
    loadChildren: () => import('./empleados/empleados.module').then(m => m.EmpleadosModule),
  },
];

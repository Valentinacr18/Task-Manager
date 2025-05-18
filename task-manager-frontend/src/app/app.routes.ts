import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then((m) => m.DashboardComponent)
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./pages/task-form/task-form.component').then((m) => m.TaskFormComponent)
  }
];
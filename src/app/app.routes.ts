import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'calculator-page',
    loadComponent: () => import('./calculator/calculator.page').then((m) => m.CalculatorPage),
  },
  
  //Pagina de inicio
  {
    path: '',
    redirectTo: 'calculator-page',
    pathMatch: 'full',
  },
];

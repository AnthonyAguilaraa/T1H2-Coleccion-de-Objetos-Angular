import { Routes } from '@angular/router';
import { Alquiler } from './Componentes/alquiler/alquiler';
import { Inicio } from './Componentes/inicio/inicio';

export const routes: Routes = [
  { path: '', component: Inicio },
  { path: '**', redirectTo: '' }
];
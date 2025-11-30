import { Routes } from '@angular/router';
import { Inicio } from './Componentes/inicio/inicio';
import { Alquiler } from './Componentes/alquiler/alquiler';
import { Devolucion } from './Componentes/devolucion/devolucion';
import { Reportes } from './Componentes/reportes/reportes';
import { Administrar } from './Componentes/administrar/administrar';
import { AlquilerResumen } from './Componentes/alquiler-resumen/alquiler-resumen';
import { DevolucionResumen } from './Componentes/devolucion-resumen/devolucion-resumen';
import { ReportesResume } from './Componentes/reportes-resume/reportes-resume';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: Inicio },
  { path: 'alquiler', component: Alquiler },
  { path: 'devoluciones', component: Devolucion },
  { path: 'reportes', component: Reportes },
  { path: 'administrar', component: Administrar },
  { path: 'alquilerResumen', component: AlquilerResumen },
  { path: 'devolucionesResumen', component: DevolucionResumen },
  { path: 'reportesResumen', component: ReportesResume },
  { path: '**', redirectTo: 'inicio' }
];
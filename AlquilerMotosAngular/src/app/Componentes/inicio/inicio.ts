// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { Devolucion } from '../devolucion/devolucion';
// import { Reportes } from '../reportes/reportes';
// import { Alquiler } from '../alquiler/alquiler';

// @Component({
//   selector: 'app-inicio',
//   imports: [],
//   templateUrl: './inicio.html',
//   styleUrl: './inicio.css',
// })
// export class Inicio {

//}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Alquiler } from '../alquiler/alquiler';
import { Devolucion } from '../devolucion/devolucion';
import { Reportes } from '../reportes/reportes';
import { Administrar } from '../administrar/administrar';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, Alquiler, Devolucion, Reportes, Administrar],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio {}

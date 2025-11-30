import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Devolucion } from '../devolucion/devolucion';
import { Reportes } from '../reportes/reportes';
import { Alquiler } from '../alquiler/alquiler';

// @Component({
//   selector: 'app-inicio',
//   imports: [],
//   templateUrl: './inicio.html',
//   styleUrl: './inicio.css',
// })
// export class Inicio {

//}

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    CommonModule, 
    Alquiler, 
    Devolucion, 
    Reportes
  ],
  template: `
    <div class="container py-4">
      <h1 class="text-center mb-4 text-success fw-bold">ECO-MOVE S.A.</h1>
      
      <div class="row">
        <div class="col-md-5">
          <app-alquiler></app-alquiler>
        </div>

        <div class="col-md-7">
          <app-devolucion></app-devolucion>
          <app-reportes></app-reportes>
        </div>
      </div>
    </div>
  `
})
export class Inicio {

}

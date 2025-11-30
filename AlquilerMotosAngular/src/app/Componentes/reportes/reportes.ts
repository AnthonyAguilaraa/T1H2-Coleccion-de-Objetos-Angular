// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-reportes',
//   imports: [],
//   templateUrl: './reportes.html',
//   styleUrl: './reportes.css',
// })
// export class Reportes {

// }

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EcoMoveService } from '../../Servicios/eco-move.service';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-light p-3 rounded mt-4 border">
      <h4 class="text-secondary">Consultas y Estadísticas</h4>
      <button class="btn btn-sm btn-outline-secondary mb-3" (click)="actualizar()">Actualizar Reportes</button>
      
      <div class="row">
        <div class="col-md-6">
          <h6>1. Clientes Recurrentes</h6>
          <ul class="list-group mb-2">
            <li class="list-group-item" *ngFor="let c of recurrentes">{{c.nombre}}</li>
          </ul>
        </div>
        <div class="col-md-6">
          <h6>4. Total Recaudado (Caja)</h6>
          <h2 class="text-success">{{totalDinero | currency}}</h2>
        </div>
      </div>
    </div>
  `
})
export class Reportes {
  recurrentes: any[] = [];
  totalDinero = 0;

  constructor(private service: EcoMoveService) {
    // Suscribirse a cambios en alquileres para actualizar reportes automáticamente
    this.service.alquileres$.subscribe(() => this.actualizar());
  }

  actualizar() {
    this.recurrentes = this.service.getClientesRecurrentes();
    this.totalDinero = this.service.getTotalRecaudado();
  }
}
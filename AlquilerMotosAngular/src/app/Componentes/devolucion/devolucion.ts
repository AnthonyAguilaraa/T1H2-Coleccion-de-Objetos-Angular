// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-devolucion',
//   imports: [],
//   templateUrl: './devolucion.html',
//   styleUrl: './devolucion.css',
// })
// export class Devolucion {

// }

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EcoMoveService } from '../../Servicios/eco-move.service';

@Component({
  selector: 'app-devolucion',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card mt-4 shadow-sm">
      <div class="card-header bg-warning">REQUERIMIENTO 03: Devoluciones Pendientes</div>
      <div class="card-body">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Vehículo</th>
              <th>F. Tentativa</th>
              <th>Depósito</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let a of service.alquileres$ | async">
              <ng-container *ngIf="a.estado === 'ACTIVO'">
                <td>{{a.vehiculoCodigo}}</td>
                <td>{{a.fechaTentativa | date:'dd/MM/yyyy'}}</td>
                <td>{{a.deposito | currency}}</td>
                <td>
                  <button class="btn btn-sm btn-danger" (click)="devolver(a.id)">
                    Devolver
                  </button>
                </td>
              </ng-container>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class Devolucion {
  constructor(public service: EcoMoveService) {}

  devolver(id: number) {
    // Simulación simple de input fecha
    const fechaStr = prompt("Ingrese fecha real (YYYY-MM-DD):", new Date().toISOString().split('T')[0]);
    if(fechaStr) {
      const res = this.service.procesarDevolucion(id, new Date(fechaStr));
      alert(res);
    }
  }
}
// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-reportes',
//   imports: [],
//   templateUrl: './reportes.html',
//   styleUrl: './reportes.css',
// })
// export class Reportes {

// }

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EcoMoveService } from '../../Servicios/eco-move.service';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reportes.html',
  styleUrl: './reportes.css'
})
export class Reportes {

  recurrentes: any[] = [];
  totalDinero = 0;

  private service = inject(EcoMoveService);

  constructor() {
    // Auto-actualización cuando cambian los alquileres
    this.service.alquileres$.subscribe(() => this.actualizar());
  }

  actualizar() {
    this.recurrentes = this.service.getClientesRecurrentes();
    this.totalDinero = this.service.getTotalRecaudado();
  }
}

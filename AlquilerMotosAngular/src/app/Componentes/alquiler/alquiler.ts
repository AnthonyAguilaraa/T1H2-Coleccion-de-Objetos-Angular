// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-alquiler',
//   imports: [],
//   templateUrl: './alquiler.html',
//   styleUrl: './alquiler.css',
// })
// export class Alquiler {

// }

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EcoMoveService } from '../../Servicios/eco-move.service';

@Component({
  selector: 'app-alquiler',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './alquiler.html',
  styleUrl: './alquiler.css'
})
export class Alquiler implements OnInit {

  clienteId!: number;
  vehiculoCod!: string;
  fInicio!: string;
  fTentativa!: string;
  mensaje = '';

  clientes$: any;
  vehiculos$: any;

  constructor(private service: EcoMoveService) {}

  ngOnInit() {
    this.clientes$ = this.service.clientes$;
    this.vehiculos$ = this.service.vehiculos$;
  }

  registrar() {
    if (!this.clienteId || !this.vehiculoCod) {
      this.mensaje = "Seleccione cliente y vehículo";
      return;
    }

    if (!this.fInicio || !this.fTentativa) {
      this.mensaje = "Ingrese las fechas";
      return;
    }

    this.mensaje = this.service.crearAlquiler(
      Number(this.clienteId),
      this.vehiculoCod,
      new Date(this.fInicio),
      new Date(this.fTentativa)
    );
  }
}

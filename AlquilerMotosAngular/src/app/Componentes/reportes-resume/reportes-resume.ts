import { Component, inject } from '@angular/core';
import { EcoMoveService } from '../../Servicios/eco-move.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reportes-resume',
  imports: [CommonModule],
  templateUrl: './reportes-resume.html',
  styleUrl: './reportes-resume.css',
})
export class ReportesResume {

   // LISTAS A MOSTRAR
  clientesMultialquiler: any[] = [];
  vehiculosPopulares: any[] = [];
  alquileresConDescuentos: any[] = [];
  clientesConMultaAlta: any[] = [];

  totalRecaudado: number = 0;

  private service = inject(EcoMoveService);

  constructor() {
    // Actualiza cada vez que cambia un alquiler
    this.service.alquileres$.subscribe(() => this.actualizar());
  }

  actualizar() {
    this.clientesMultialquiler = this.service.getClientesConMasDeUnAlquiler();
    this.vehiculosPopulares = this.service.getVehiculosMasAlquilados();
    this.alquileresConDescuentos = this.service.getAlquileresConDescuentosCompletos();
    this.clientesConMultaAlta = this.service.getClientesConMultaMayorDeposito();
    this.totalRecaudado = this.service.getTotalRecaudadoGeneral();
  }
}

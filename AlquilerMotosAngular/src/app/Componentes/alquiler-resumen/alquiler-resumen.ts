import { Component, OnInit } from '@angular/core';
import { EcoMoveService } from '../../Servicios/eco-move.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-alquiler-resumen',
  imports: [CommonModule, FormsModule],
  templateUrl: './alquiler-resumen.html',
  styleUrl: './alquiler-resumen.css',
})
export class AlquilerResumen implements OnInit {

  clienteId!: number;
  vehiculoCod!: string;
  fInicio!: string;
  fTentativa!: string;

  mensaje = '';

  clientes$;
  vehiculos$;

  resumen: any = null;

  constructor(private service: EcoMoveService) {
    this.clientes$ = this.service.clientes$;
    this.vehiculos$ = this.service.vehiculos$;
  }

  ngOnInit() {}

  // =========================
  // CÁLCULO DEL RESUMEN
  // =========================
  calcularResumen() {
    if (!this.clienteId || !this.vehiculoCod || !this.fInicio || !this.fTentativa) {
      this.resumen = null;
      return;
    }

    const cliente = this.service.clientes$.getValue().find(c => c.id == this.clienteId);
    const vehiculo = this.service.vehiculos$.getValue().find(v => v.codigo == this.vehiculoCod);

    if (!cliente || !vehiculo) {
      this.resumen = null;
      return;
    }

    const f1 = new Date(this.fInicio);
    const f2 = new Date(this.fTentativa);

    const dias = Math.max(1, Math.ceil((f2.getTime() - f1.getTime()) / (1000 * 3600 * 24)));
    const importe = dias * vehiculo.tarifaDia;

    const descExtendido = dias > 5 ? importe * 0.15 : 0;
    const subtotal = importe - descExtendido;

    const descFrecuente = cliente.esFrecuente ? subtotal * 0.10 : 0;
    const deposito = importe * 0.12;

    const total = importe - descExtendido - descFrecuente + deposito;

    this.resumen = {
      cliente: cliente.nombre,
      vehiculo: vehiculo.nombre,
      dias,
      importe,
      descExtendido,
      descFrecuente,
      deposito,
      total
    };
  }

  // =========================
  // REGISTRAR ALQUILER
  // =========================
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

    this.calcularResumen(); 
  }
}
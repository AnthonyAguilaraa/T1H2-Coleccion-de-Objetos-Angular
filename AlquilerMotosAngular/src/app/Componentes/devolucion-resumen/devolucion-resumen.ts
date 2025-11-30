import { Component, inject, OnInit } from '@angular/core';
import { EcoMoveService } from '../../Servicios/eco-move.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-devolucion-resumen',
  imports: [CommonModule, FormsModule],
  templateUrl: './devolucion-resumen.html',
  styleUrl: './devolucion-resumen.css',
})
export class DevolucionResumen implements OnInit {

  alquileres$!: Observable<any[]>;
  private service = inject(EcoMoveService);

  fechaReal!: string;

  resumen: any = null;
  seleccionado: any = null;

  ngOnInit() {
    this.alquileres$ = this.service.alquileres$;
  }

  // CARGAR ALQUILER PARA MOSTRAR RESUMEN
  devolver(a: any) {
    this.seleccionado = a;
    this.fechaReal = "";
    this.resumen = null;
  }

  // CALCULAR RESUMEN
  // calcular() {
  //   if (!this.fechaReal || !this.seleccionado) return;

  //   const a = this.seleccionado;
    
  //   const veh = this.service.vehiculos$.getValue()
  //     .find(v => v.codigo === a.vehiculoCodigo);

  //   const cliente = this.service.clientes$.getValue()
  //     .find(c => c.id === a.clienteId);

  //   const fIni = new Date(a.fechaInicio);
  //   const fTen = new Date(a.fechaTentativa);
  //   const fDev = new Date(this.fechaReal);

  //   const dias = Math.ceil((fTen.getTime() - fIni.getTime()) / 86400000);
  //   const diasMora = Math.max(0, Math.ceil((fDev.getTime() - fTen.getTime()) / 86400000));

  //   const importe = dias * veh.tarifaDia;

  //   const descExt = dias > 5 ? importe * 0.15 : 0;
  //   const sub1 = importe - descExt;
  //   const descFrecuente = cliente.esFrecuente ? sub1 * 0.10 : 0;

  //   const deposito = importe * 0.12;

  //   const multa = diasMora * (veh.tarifaDia * 0.10);

  //   const depositoDevuelto = Math.max(0, deposito - multa);

  //   const subtotalFinal =
  //     importe - descExt - descFrecuente + multa - depositoDevuelto;

  //   this.resumen = {
  //     cliente: cliente.nombre,
  //     vehiculo: veh.nombre,
  //     dias,
  //     diasMora,
  //     importe,
  //     descExt,
  //     descFrecuente,
  //     deposito,
  //     multa,
  //     depositoDevuelto,
  //     subtotalFinal
  //   };
  // }

  calcular() {
  if (!this.fechaReal || !this.seleccionado) return;

  const a = this.seleccionado;
  
  const veh = this.service.vehiculos$.getValue()
    .find(v => v.codigo === a.vehiculoCodigo);

  const cliente = this.service.clientes$.getValue()
    .find(c => c.id === a.clienteId);

  // VALIDACIÓN NECESARIA
  if (!veh || !cliente) {
    console.error("Vehículo o cliente no encontrado");
    return;
  }

  const fIni = new Date(a.fechaInicio);
  const fTen = new Date(a.fechaTentativa);
  const fDev = new Date(this.fechaReal);

  const dias = Math.ceil((fTen.getTime() - fIni.getTime()) / 86400000);
  const diasMora = Math.max(0, Math.ceil((fDev.getTime() - fTen.getTime()) / 86400000));

  const importe = dias * veh.tarifaDia;

  const descExt = dias > 5 ? importe * 0.15 : 0;
  const sub1 = importe - descExt;
  const descFrecuente = cliente.esFrecuente ? sub1 * 0.10 : 0;

  const deposito = importe * 0.12;

  const multa = diasMora * (veh.tarifaDia * 0.10);

  const depositoDevuelto = Math.max(0, deposito - multa);

  const subtotalFinal =
    importe - descExt - descFrecuente + multa - depositoDevuelto;

  this.resumen = {
    cliente: cliente.nombre,
    vehiculo: veh.nombre,
    dias,
    diasMora,
    importe,
    descExt,
    descFrecuente,
    deposito,
    multa,
    depositoDevuelto,
    subtotalFinal
  };
}

  // CONFIRMAR DEVOLUCIÓN
  confirmar() {
    if (!this.seleccionado || !this.fechaReal) return;

    alert(this.service.procesarDevolucion(this.seleccionado.id, new Date(this.fechaReal)));

    this.resumen = null;
    this.seleccionado = null;
  }
}
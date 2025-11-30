import { Component } from '@angular/core';
import { EcoMoveService } from '../../Servicios/eco-move.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-administrar',
  imports: [CommonModule, FormsModule],
  templateUrl: './administrar.html',
  styleUrl: './administrar.css',
})
export class Administrar {

  // Control de Vistas: 'MENU', 'CLIENTES', 'VEHICULOS', 'ALQUILERES', 'DEVOLUCIONES'
  vistaActual = 'MENU';

  // Datos Observables
  clientes$: any;
  vehiculos$: any;
  alquileres$: any;

  // Modelos para Formularios
  nuevoCliente = { id: 0, nombre: '', edad: 0, esFrecuente: false };
  nuevoVehiculo = { codigo: '', nombre: '', tarifaDia: 0, requiereEdad: false, estado: 'DISPONIBLE' };

  constructor(private service: EcoMoveService) {}

  ngOnInit() {
    this.clientes$ = this.service.clientes$;
    this.vehiculos$ = this.service.vehiculos$;
    this.alquileres$ = this.service.alquileres$;
  }

  cambiarVista(vista: string) {
    this.vistaActual = vista;
  }

  // ===== CRUD LOGIC =====
  
  // Clientes
  crearCliente() {
    this.service.crearCliente(this.nuevoCliente);
    this.nuevoCliente = { id: 0, nombre: '', edad: 0, esFrecuente: false };
  }
  eliminarCliente(id: number) { this.service.eliminarCliente(id); }

  // Vehículos
  crearVehiculo() {
    this.service.crearVehiculo(this.nuevoVehiculo);
    this.nuevoVehiculo = { codigo: '', nombre: '', tarifaDia: 0, requiereEdad: false, estado: 'DISPONIBLE' };
  }
  eliminarVehiculo(cod: string) { this.service.eliminarVehiculo(cod); }

  // Alquileres / Devoluciones (Eliminación Administrativa)
  eliminarAlquiler(id: number) {
    if(confirm('¿Eliminar registro de alquiler? Esto podría liberar el vehículo.')) {
      this.service.eliminarAlquiler(id);
    }
  }
}

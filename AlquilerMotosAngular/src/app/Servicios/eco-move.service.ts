import { Injectable } from '@angular/core';
import { Vehiculo } from '../Entidades/vehiculo';
import { Cliente } from '../Entidades/cliente';
import { Alquiler } from '../Entidades/alquiler';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EcoMoveService {
  
  // --- DATOS EN MEMORIA (Simulando BD) ---
  private vehiculos: Vehiculo[] = [
    { codigo: 'V01', nombre: 'Scooter Eléctrico', tarifaDia: 25, requiereEdad: true, estado: 'DISPONIBLE' },
    { codigo: 'V02', nombre: 'Bicicleta Eléctrica', tarifaDia: 35, requiereEdad: false, estado: 'DISPONIBLE' },
    { codigo: 'V03', nombre: 'Monopatín Eléctrico', tarifaDia: 20, requiereEdad: false, estado: 'DISPONIBLE' },
    { codigo: 'V04', nombre: 'Moto Eléctrica', tarifaDia: 30, requiereEdad: true, estado: 'DISPONIBLE' }
  ];

  private clientes: Cliente[] = [
    { id: 1, nombre: 'Juan Pérez', edad: 25, esFrecuente: true },
    { id: 2, nombre: 'Ana Gómez', edad: 17, esFrecuente: false },
    { id: 3, nombre: 'Carlos Ruiz', edad: 30, esFrecuente: false }
  ];

  private alquileres: Alquiler[] = [];

  // --- OBSERVABLES (Para que los componentes reaccionen) ---
  public vehiculos$ = new BehaviorSubject<Vehiculo[]>(this.vehiculos);
  public clientes$ = new BehaviorSubject<Cliente[]>(this.clientes);
  public alquileres$ = new BehaviorSubject<Alquiler[]>(this.alquileres);

  constructor() { }

  // --- METODOS DE NEGOCIO ---

  // REQUERIMIENTO 02: Registrar Alquiler
  crearAlquiler(clienteId: number, vehiculoCodigo: string, fInicio: Date, fTentativa: Date): string {
    const cliente = this.clientes.find(c => c.id == clienteId);
    const vehiculo = this.vehiculos.find(v => v.codigo == vehiculoCodigo);

    if (!cliente || !vehiculo) return 'Error: Datos no encontrados';
    if (vehiculo.estado === 'ALQUILADO') return 'Error: Vehículo no disponible';
    if (vehiculo.requiereEdad && cliente.edad < 18) return 'Error: Cliente menor de edad para este vehículo';

    // Cálculos
    const dias = Math.max(1, Math.ceil((fTentativa.getTime() - fInicio.getTime()) / (1000 * 3600 * 24)));
    const importe = dias * vehiculo.tarifaDia;
    
    const descExtendido = dias > 5 ? importe * 0.15 : 0;
    const subtotal = importe - descExtendido;
    const descFrecuente = cliente.esFrecuente ? subtotal * 0.10 : 0;
    const deposito = importe * 0.12;

    const nuevoAlquiler: Alquiler = {
      id: this.alquileres.length + 1,
      clienteId, vehiculoCodigo, fechaInicio: fInicio, fechaTentativa: fTentativa,
      diasCalculados: dias, importeBase: importe,
      descuentoExtendido: descExtendido, descuentoFrecuente: descFrecuente,
      deposito: deposito,
      totalPagadoInicial: (importe - descExtendido - descFrecuente) + deposito,
      estado: 'ACTIVO'
    };

    this.alquileres.push(nuevoAlquiler);
    vehiculo.estado = 'ALQUILADO';
    this.notificarCambios();
    return 'Alquiler registrado con éxito';
  }

  // REQUERIMIENTO 03: Procesar Devolución
  procesarDevolucion(alquilerId: number, fechaReal: Date): string {
    const alquiler = this.alquileres.find(a => a.id == alquilerId);
    if (!alquiler || alquiler.estado === 'FINALIZADO') return 'Alquiler inválido';

    const vehiculo = this.vehiculos.find(v => v.codigo === alquiler.vehiculoCodigo);
    
    // Cálculo Mora
    let diasMora = 0;
    let multa = 0;

    if (fechaReal.getTime() > alquiler.fechaTentativa.getTime()) {
      diasMora = Math.ceil((fechaReal.getTime() - alquiler.fechaTentativa.getTime()) / (1000 * 3600 * 24));
      if(vehiculo) multa = (vehiculo.tarifaDia * 0.10) * diasMora; // 10% tarifa diaria por día extra
    }

    alquiler.fechaDevolucionReal = fechaReal;
    alquiler.diasMora = diasMora;
    alquiler.multa = multa;
    alquiler.estado = 'FINALIZADO';
    
    if (vehiculo) vehiculo.estado = 'DISPONIBLE';

    this.notificarCambios();
    return diasMora > 0 ? `Devolución con mora de ${diasMora} días. Multa: $${multa}` : 'Devolución a tiempo.';
  }

  // --- CONSULTAS LINQ TO OBJECT ---
  
  getClientesRecurrentes() {
    // GroupBy manual
    const conteo = this.alquileres.reduce((acc, curr) => {
      acc[curr.clienteId] = (acc[curr.clienteId] || 0) + 1;
      return acc;
    }, {} as any);
    return this.clientes.filter(c => conteo[c.id] > 1);
  }

  getVehiculosPopulares() {
    const conteo = this.alquileres.reduce((acc, curr) => {
      acc[curr.vehiculoCodigo] = (acc[curr.vehiculoCodigo] || 0) + 1;
      return acc;
    }, {} as any);
    // Ordenar y mapear
    return Object.entries(conteo)
      .sort(([,a]:any, [,b]:any) => b - a)
      .map(([code, count]) => ({ ...this.vehiculos.find(v => v.codigo === code), cantidad: count }));
  }

  getTotalRecaudado() {
    // Suma: ImporteNeto + Multas + Depositos (según requerimiento textual)
    return this.alquileres.reduce((sum, a) => {
      const neto = a.importeBase - a.descuentoExtendido - a.descuentoFrecuente;
      return sum + neto + a.deposito + (a.multa || 0);
    }, 0);
  }

  private notificarCambios() {
    this.vehiculos$.next([...this.vehiculos]);
    this.alquileres$.next([...this.alquileres]);
  }
}

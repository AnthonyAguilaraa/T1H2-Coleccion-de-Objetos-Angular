export interface Vehiculo {
  codigo: string;
  nombre: string;
  tarifaDia: number;
  requiereEdad: boolean; // True: >Edad, False: Cualquiera
  estado: 'DISPONIBLE' | 'ALQUILADO';
}
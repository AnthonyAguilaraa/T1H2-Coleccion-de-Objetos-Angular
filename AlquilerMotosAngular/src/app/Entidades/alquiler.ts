export interface Alquiler {
  id: number;
  clienteId: number;
  vehiculoCodigo: string;
  fechaInicio: Date;
  fechaTentativa: Date;
  fechaDevolucionReal?: Date;
  
  // Datos Financieros calculados
  diasCalculados: number;
  importeBase: number;
  descuentoExtendido: number;
  descuentoFrecuente: number;
  deposito: number;
  totalPagadoInicial: number;
  
  // Datos de Devolución
  diasMora?: number;
  multa?: number;
  estado: 'ACTIVO' | 'FINALIZADO';
}
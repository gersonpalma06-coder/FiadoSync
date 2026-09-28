export interface Cliente {
  id: string;
  user_id: string;
  nombre: string;
  telefono: string | null;
  creado_en: string;
}

export interface Transaccion {
  id: string;
  cliente_id: string;
  user_id: string;
  tipo: 'cargo' | 'abono';
  monto: number;
  descripcion: string | null;
  fecha: string;
}

export interface ClienteConSaldo extends Cliente {
  saldo_total: number;
}
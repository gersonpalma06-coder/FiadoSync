import { supabase } from '../lib/supabase';

export interface ClientePayload {
  nombre: string;
  telefono?: string;
  direccion?: string;
  limite_credito?: number;
  user_id: string;
}

export interface TransaccionPayload {
  user_id: string;
  cliente_id: string;
  tipo: 'fiado' | 'abono';
  monto: number;
  descripcion?: string;
}

// -------------------------------------------------------------
// CLIENTES
// -------------------------------------------------------------

// 1. Crear un nuevo cliente en Supabase
export const crearCliente = async (payload: ClientePayload) => {
  const { data, error } = await supabase
    .from('clientes')
    .insert([payload])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

// 2. Obtener lista simple de clientes
export const obtenerClientes = async (userId: string) => {
  const { data, error } = await supabase
    .from('clientes')
    .select('*')
    .eq('user_id', userId)
    .order('id', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }
  return data || [];
};

// 3. Obtener clientes calculando su saldo actual (Fiados - Abonos)
export const obtenerClientesConSaldo = async (userId: string) => {
  const { data: clientes, error: errorClientes } = await supabase
    .from('clientes')
    .select('*')
    .eq('user_id', userId);

  if (errorClientes) throw new Error(errorClientes.message);
  if (!clientes || clientes.length === 0) return [];

  const { data: transacciones, error: errorTrans } = await supabase
    .from('transacciones')
    .select('*')
    .eq('user_id', userId);

  if (errorTrans) throw new Error(errorTrans.message);

  return clientes.map((cliente) => {
    const transDelCliente = (transacciones || []).filter((t) => t.cliente_id === cliente.id);
    
    const totalFiado = transDelCliente
      .filter((t) => t.tipo === 'fiado')
      .reduce((sum, t) => sum + Number(t.monto), 0);
      
    const totalAbono = transDelCliente
      .filter((t) => t.tipo === 'abono')
      .reduce((sum, t) => sum + Number(t.monto), 0);

    return {
      ...cliente,
      saldo: totalFiado - totalAbono,
    };
  });
};

// -------------------------------------------------------------
// TRANSACCIONES (FIADOS Y ABONOS)
// -------------------------------------------------------------

// 4. Registrar una nueva transacción (Fiado o Abono)
export const crearTransaccion = async (payload: TransaccionPayload) => {
  const { data, error } = await supabase
    .from('transacciones')
    .insert([payload])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

// 5. Obtener métricas globales para las tarjetas del Dashboard
export const obtenerResumenDashboard = async (userId: string) => {
  const { data, error } = await supabase
    .from('transacciones')
    .select('*')
    .eq('user_id', userId);

  if (error) throw new Error(error.message);

  let totalPendiente = 0;
  let abonadoHoy = 0;
  const hoyISO = new Date().toISOString().split('T')[0];

  (data || []).forEach((t) => {
    const monto = Number(t.monto);
    if (t.tipo === 'fiado') {
      totalPendiente += monto;
    } else if (t.tipo === 'abono') {
      totalPendiente -= monto;
      // Compatible tanto con 'created_at' como con 'creado_en'
      const rawFecha = t.created_at || t.creado_en;
      if (rawFecha) {
        const fechaTransaccion = new Date(rawFecha).toISOString().split('T')[0];
        if (fechaTransaccion === hoyISO) {
          abonadoHoy += monto;
        }
      }
    }
  });

  return {
    totalPendiente: Math.max(0, totalPendiente),
    abonadoHoy,
  };
};
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../lib/supabase';

const OFFLINE_QUEUE_KEY = '@fiadosync_transacciones_pendientes';

export const SyncService = {
  // 1. Guarda la transacción en el teléfono si no hay internet
  saveToOfflineQueue: async (transaction: any) => {
    try {
      const existingQueue = await AsyncStorage.getItem(OFFLINE_QUEUE_KEY);
      const queue = existingQueue ? JSON.parse(existingQueue) : [];
      
      queue.push(transaction);
      
      await AsyncStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue));
      console.log('Transacción guardada localmente (Modo Offline)');
    } catch (error) {
      console.error('Error guardando en offline:', error);
    }
  },

  // 2. Lee las transacciones que están atrapadas en el teléfono
  getOfflineQueue: async () => {
    try {
      const queue = await AsyncStorage.getItem(OFFLINE_QUEUE_KEY);
      return queue ? JSON.parse(queue) : [];
    } catch (error) {
      return [];
    }
  },

  // 3. Borra la cola de transacciones una vez que se suben al servidor
  clearOfflineQueue: async () => {
    try {
      await AsyncStorage.removeItem(OFFLINE_QUEUE_KEY);
    } catch (error) {
      console.error('Error limpiando la cola local:', error);
    }
  },

  // 4. Intenta enviar todo lo pendiente a Supabase
  syncPendingData: async () => {
    const queue = await SyncService.getOfflineQueue();
    
    if (queue.length === 0) {
      return; // No hay nada que sincronizar
    }

    console.log(`Sincronizando ${queue.length} transacciones con Supabase...`);

    try {
      // Supabase permite insertar un arreglo completo de registros de una sola vez
      const { error } = await supabase
        .from('transacciones')
        .insert(queue);

      if (error) throw error;

      // Si no hubo errores, borramos el registro local porque ya está en la nube
      await SyncService.clearOfflineQueue();
      console.log('¡Sincronización exitosa!');
      
    } catch (error) {
      console.error('Fallo al sincronizar con Supabase (posiblemente siga sin internet):', error);
    }
  }
};
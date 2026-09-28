import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../lib/supabase';

const OFFLINE_QUEUE_KEY = '@fiadosync_transacciones_pendientes';

export const SyncService = {
  // 1. Guarda la transacción en el almacenamiento local si no hay conexión
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

  // 2. Lee las transacciones guardadas localmente en el teléfono
  getOfflineQueue: async () => {
    try {
      const queue = await AsyncStorage.getItem(OFFLINE_QUEUE_KEY);
      return queue ? JSON.parse(queue) : [];
    } catch (error) {
      return [];
    }
  },

  // 3. Limpia la cola local tras sincronizar exitosamente
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
      return;
    }

    console.log(`Sincronizando ${queue.length} transacciones con Supabase...`);

    try {
      const { error } = await supabase
        .from('transacciones')
        .insert(queue);

      if (error) throw error;

      await SyncService.clearOfflineQueue();
      console.log('¡Sincronización exitosa con Supabase!');
    } catch (error) {
      console.error('Fallo al sincronizar con Supabase (posiblemente siga sin internet):', error);
    }
  }
};
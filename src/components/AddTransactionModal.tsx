import React, { useState } from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Alert, ScrollView,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomInput from './CustomInput';
import CustomButton from './CustomButton';
import ThemedText from './ThemedText';
import { useTheme } from '../contexts/ThemeContext';
import { supabase } from '../lib/supabase';
import { crearTransaccion } from '../services/databaseService';

interface ClientOption {
  id: string;
  nombre: string;
}

interface AddTransactionModalProps {
  visible: boolean;
  clientes: ClientOption[];
  onClose: () => void;
  onTransactionAdded: () => void;
}

export default function AddTransactionModal({
  visible,
  clientes,
  onClose,
  onTransactionAdded,
}: AddTransactionModalProps) {
  const { isDark } = useTheme();

  const [clienteId, setClienteId] = useState<string>('');
  const [tipo, setTipo] = useState<'fiado' | 'abono'>('fiado');
  const [monto, setMonto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setClienteId('');
    setTipo('fiado');
    setMonto('');
    setDescripcion('');
  };

  const handleSave = async () => {
    if (!clienteId) {
      Alert.alert('Atención', 'Selecciona un cliente para registrar la transacción.');
      return;
    }

    const montoNum = parseFloat(monto);
    if (isNaN(montoNum) || montoNum <= 0) {
      Alert.alert('Monto inválido', 'Ingresa un monto válido mayor a 0.');
      return;
    }

    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('No hay sesión activa');

      await crearTransaccion({
        user_id: session.user.id,
        cliente_id: clienteId,
        tipo,
        monto: montoNum,
        descripcion: descripcion.trim() || (tipo === 'fiado' ? 'Fiado de mercadería' : 'Abono a cuenta'),
      });

      Alert.alert(
        '¡Éxito!',
        tipo === 'fiado' ? 'Fiado registrado correctamente.' : 'Abono registrado correctamente.'
      );
      resetForm();
      onTransactionAdded();
      onClose();
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudo guardar la transacción.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={[styles.modalCard, isDark && styles.darkModalCard]}>
          <View style={styles.header}>
            <ThemedText style={styles.title}>Nueva Transacción</ThemedText>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close-circle-outline" size={28} color={isDark ? '#94a3b8' : '#64748b'} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <ThemedText style={styles.label}>Tipo de Transacción</ThemedText>
            <View style={styles.typeContainer}>
              <TouchableOpacity
                style={[styles.typeButton, tipo === 'fiado' && styles.typeButtonFiado]}
                onPress={() => setTipo('fiado')}
              >
                <Ionicons name="cart-outline" size={20} color={tipo === 'fiado' ? '#ffffff' : '#e53e3e'} />
                <ThemedText style={[styles.typeText, tipo === 'fiado' && styles.typeTextActive]}>
                  Fiado (Deuda)
                </ThemedText>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.typeButton, tipo === 'abono' && styles.typeButtonAbono]}
                onPress={() => setTipo('abono')}
              >
                <Ionicons name="cash-outline" size={20} color={tipo === 'abono' ? '#ffffff' : '#38a169'} />
                <ThemedText style={[styles.typeText, tipo === 'abono' && styles.typeTextActive]}>
                  Abono (Pago)
                </ThemedText>
              </TouchableOpacity>
            </View>

            <ThemedText style={styles.label}>Cliente</ThemedText>
            {clientes.length === 0 ? (
              <ThemedText style={styles.emptyText}>Registra un cliente primero antes de añadir transacciones.</ThemedText>
            ) : (
              <View style={styles.clientGrid}>
                {clientes.map((cli) => {
                  const selected = cli.id === clienteId;
                  return (
                    <TouchableOpacity
                      key={cli.id}
                      style={[
                        styles.chip,
                        isDark && styles.darkChip,
                        selected && styles.chipSelected,
                      ]}
                      onPress={() => setClienteId(cli.id)}
                    >
                      <Ionicons
                        name={selected ? 'checkmark-circle' : 'person-outline'}
                        size={16}
                        color={selected ? '#ffffff' : isDark ? '#94a3b8' : '#475569'}
                      />
                      <ThemedText style={[styles.chipText, selected && styles.chipTextSelected]}>
                        {cli.nombre}
                      </ThemedText>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}

            <CustomInput
              label="Monto (Lempiras L.)"
              placeholder="Ej: 150.00"
              value={monto}
              onChangeText={setMonto}
              type="number"
            />

            <CustomInput
              label="Descripción (Opcional)"
              placeholder="Ej: Harina, manteca y café"
              value={descripcion}
              onChangeText={setDescripcion}
            />

            <View style={styles.buttonRow}>
              <CustomButton title="Cancelar" onPress={onClose} variant="secondary" />
              <CustomButton
                title={loading ? 'Guardando...' : 'Registrar'}
                onPress={handleSave}
                variant="primary"
                isLoading={loading}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    maxHeight: '85%',
  },
  darkModalCard: {
    backgroundColor: '#1e293b',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 8,
  },
  typeContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  typeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1.5,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    paddingVertical: 10,
  },
  typeButtonFiado: {
    backgroundColor: '#e53e3e',
    borderColor: '#e53e3e',
  },
  typeButtonAbono: {
    backgroundColor: '#38a169',
    borderColor: '#38a169',
  },
  typeText: {
    fontSize: 13,
    fontWeight: '600',
  },
  typeTextActive: {
    color: '#ffffff',
  },
  emptyText: {
    fontSize: 13,
    color: '#94a3b8',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  clientGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },
  darkChip: {
    backgroundColor: '#334155',
    borderColor: '#475569',
  },
  chipSelected: {
    backgroundColor: '#0052cc',
    borderColor: '#0052cc',
  },
  chipText: {
    fontSize: 13,
  },
  chipTextSelected: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  buttonRow: {
    marginTop: 16,
    gap: 10,
  },
});
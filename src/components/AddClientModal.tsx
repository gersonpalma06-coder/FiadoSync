import React, { useState } from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Alert, ScrollView, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomInput from './CustomInput';
import CustomButton from './CustomButton';
import ThemedText from './ThemedText';
import { useTheme } from '../contexts/ThemeContext';
import { supabase } from '../lib/supabase';
import { crearCliente } from '../services/databaseService';

interface AddClientModalProps {
  visible: boolean;
  onClose: () => void;
  onClientAdded?: () => void;
}

export default function AddClientModal({
  visible,
  onClose,
  onClientAdded,
}: AddClientModalProps) {
  
  const { isDark } = useTheme();
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [limiteCredito, setLimiteCredito] = useState('');
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setNombre('');
    setTelefono('');
    setDireccion('');
    setLimiteCredito('');
  };

  const handleSave = async () => {
    if (!nombre.trim()) {
      Alert.alert('Campo requerido', 'Por favor ingresa el nombre del cliente.');
      return;
    }

    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        throw new Error('No hay una sesión de usuario activa.');
      }

      await crearCliente({
        nombre: nombre.trim(),
        telefono: telefono.trim() || undefined,
        direccion: direccion.trim() || undefined,
        limite_credito: limiteCredito ? parseFloat(limiteCredito) : 0,
        user_id: session.user.id,
      });

      Alert.alert('¡Éxito!', 'Cliente registrado exitosamente.');
      resetForm();
      if (typeof onClientAdded === 'function') {
        onClientAdded();
      }
      onClose();
    } catch (error: any) {
      Alert.alert('Error al guardar', error.message || 'No se pudo guardar el cliente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={[styles.modalCard, isDark && styles.darkModalCard]}>
          <View style={styles.header}>
            <ThemedText style={styles.title}>Nuevo Cliente</ThemedText>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close-circle-outline" size={28} color={isDark ? '#94a3b8' : '#64748b'} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <CustomInput
              label="Nombre completo *"
              placeholder="Ej: Juan Pérez"
              value={nombre}
              onChangeText={setNombre}
            />

            <CustomInput
              label="Teléfono"
              placeholder="Ej: 9988-7766"
              value={telefono}
              onChangeText={setTelefono}
              type="number"
            />

            <CustomInput
              label="Dirección / Referencia"
              placeholder="Ej: Casa esquinera frente al parque"
              value={direccion}
              onChangeText={setDireccion}
            />

            <CustomInput
              label="Límite de Crédito (Lempiras)"
              placeholder="Ej: 1000"
              value={limiteCredito}
              onChangeText={setLimiteCredito}
              type="number"
            />

            <View style={styles.buttonRow}>
              <CustomButton
                title="Cancelar"
                onPress={() => {
                  resetForm();
                  onClose();
                }}
                variant="secondary"
              />
              <CustomButton
                title={loading ? 'Guardando...' : 'Guardar'}
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
  buttonRow: {
    marginTop: 16,
    gap: 10,
  },
});
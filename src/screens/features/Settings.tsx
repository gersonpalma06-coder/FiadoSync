import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '../../components/CustomButton';

export default function Settings({ navigation }: any) {
  const handleLogout = () => {
    
    navigation.getParent()?.replace('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Ionicons name="settings-outline" size={70} color="#0052cc" style={styles.icon} />
        
        <Text style={styles.title}>Configuración</Text>
        <Text style={styles.text}>Ajustes de la cuenta y opciones de la aplicación</Text>

        <View style={styles.buttonContainer}>
          <CustomButton 
            title="Cerrar Sesión" 
            onPress={handleLogout} 
            variant="tertiary"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f6f9',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  icon: {
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 6,
  },
  text: {
    fontSize: 15,
    color: '#666666',
    marginBottom: 24,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
});
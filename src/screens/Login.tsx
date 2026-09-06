import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

export default function Login({ navigation }: any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [greeting, setGreeting] = useState('');

  /* 
    useEffect sin arreglo de dependencias:
    Se ejecuta tras cada renderizado del componente al interactuar con el formulario.
  */
  useEffect(() => {
    console.log("Componente renderizado (se modificó el estado local)");
  });

  /* 
    useEffect con arreglo de dependencias vacío []:
    Se ejecuta una sola vez al cargar la pantalla para calcular la hora del sistema.
  */
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) {
      setGreeting('☀️ Hola ¡Buen día!');
    } else if (hour >= 12 && hour < 19) {
      setGreeting('🌤️ Hola ¡Buenas tardes!');
    } else {
      setGreeting('☁️ Hola ¡Buenas noches!');
    }
  }, []);

  const handleLogin = () => {
    if (username && password) {
      navigation.replace('UserTabs');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <Image
        source={require('../../assets/Logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}>{greeting}</Text>
        <View style={styles.divider} />
      </View>

      <CustomInput
        label="Usuario"
        placeholder="Ingresa tu usuario"
        value={username}
        onChangeText={setUsername}
        type="email"
      />

      <CustomInput
        label="Contraseña"
        placeholder="Ingresa tu contraseña"
        value={password}
        onChangeText={setPassword}
        type="password"
      />

      <TouchableOpacity style={styles.forgotPasswordContainer}>
        <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      <CustomButton
        title="Iniciar sesión"
        onPress={handleLogin}
        variant="primary"
      />

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 28,
    paddingTop: 30,
    paddingBottom: 30,
    justifyContent: 'flex-start',
  },
  logo: {
    width: 160,
    height: 70,
    alignSelf: 'center',
    marginBottom: 20,
  },
  greetingContainer: {
    width: '100%',
    marginBottom: 20,
  },
  greetingText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 8,
  },
  divider: {
    height: 3,
    backgroundColor: '#0052cc',
    width: '100%',
    borderRadius: 2,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#0052cc',
    fontSize: 14,
    fontWeight: '500',
  },
});
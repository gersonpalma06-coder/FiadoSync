import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../navigation/StackNavigator';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { useAuth } from '../contexts/AuthContext'; 

type RegisterProps = NativeStackScreenProps<RootStackParamList, 'RegisterScreen'>;

export default function Register({ navigation }: RegisterProps) {
  const { register } = useAuth(); 

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    try {
      await register(email, password);
      navigation.navigate("LoginScreen"); 
    }
    catch (error: any) {
      console.error("Error al registrar usuario:", error.message);
    }
  };

  const handleGoToLogin = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('LoginScreen');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Ionicons name="person-add-outline" size={60} color="#0052cc" style={styles.icon} />

          <Text style={styles.title}>Crear Cuenta</Text>
          <Text style={styles.subtitle}>Regístrate para empezar a gestionar tus fiados en FiadoSync</Text>

          <View style={styles.form}>
            <CustomInput
              label="Nombre" 
              placeholder="Nombre de usuario o negocio"
              value={nombre}
              onChangeText={setNombre}
            />

            <CustomInput
              label="Correo"
              placeholder="Correo electrónico"
              value={email}
              onChangeText={setEmail}
              type="email"
            />

            <CustomInput
              label="Contraseña"
              placeholder="Contraseña"
              value={password}
              onChangeText={setPassword}
              type="password"
            />

            <CustomInput
              label="Confirmar contraseña"
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              type="password"
            />

            <View style={styles.buttonContainer}>
              <CustomButton
                title="Registrarse"
                onPress={handleRegister}
                variant="primary"
              />

              <CustomButton
                title="¿Ya tienes cuenta? Inicia Sesión"
                onPress={handleGoToLogin}
                variant="tertiary"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f9',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 380,
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
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 20,
  },
  form: {
    width: '100%',
    gap: 12,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 8,
    gap: 10,
  },
});
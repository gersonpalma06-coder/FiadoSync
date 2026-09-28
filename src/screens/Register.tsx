import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../navigation/StackNavigator';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { useAuth } from '../contexts/AuthContext'; 
import { useTheme } from '../contexts/ThemeContext';
import Screen from '../components/Screen';
import ThemedText from '../components/ThemedText';

type RegisterProps = NativeStackScreenProps<RootStackParamList, 'RegisterScreen'>;

export default function Register({ navigation }: any) {
  const { register } = useAuth(); 
  const { isDark } = useTheme();

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const validateForm = (): boolean => {
    if (!nombre.trim() || !email.trim() || !password || !confirmPassword) {
      Alert.alert('Campos incompletos', 'Por favor completa todos los campos obligatorios.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Correo inválido', 'Ingresa una dirección de correo válida.');
      return false;
    }

    if (password.length < 6) {
      Alert.alert('Contraseña corta', 'La contraseña debe tener al menos 6 caracteres.');
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error de contraseña', 'Las contraseñas no coinciden.');
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      await register(email, password);
      Alert.alert(
      '¡Registro exitoso!',
      'Tu cuenta ha sido creada correctamente.',
      [{ text: 'Ir a Iniciar Sesión', onPress: () =>
      navigation.navigate("LoginScreen")}]);
    }
    catch (error: any) {
      Alert.alert('Error al registrar', error.message || 'No se pudo crear la cuenta.');
    } finally {
      setLoading(false);
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
    <Screen style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardView} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View style={[styles.card, isDark && styles.darkCard]}>
            <Ionicons 
              name="person-add-outline" 
              size={60} 
              color={isDark ? "#3b82f6" : "#0052cc"} 
              style={styles.icon} 
            />

            <ThemedText style={styles.title}>Crear Cuenta</ThemedText>
            <ThemedText style={styles.subtitle}>Complete sus datos para registrarse</ThemedText>

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
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  keyboardView: {
    flex: 1,
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
  darkCard: {
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#334155',
  },
  icon: {
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.7, 
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
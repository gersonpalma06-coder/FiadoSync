import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import React, { useState, useEffect } from "react";
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import Screen from '../components/Screen';
import ThemedText from '../components/ThemedText';
import { useLanguage } from '../contexts/LanguageContext';

export default function LoginScreen({ navigation }: any) {
  const { login } = useAuth();
  const { isDark } = useTheme();
  const { language } = useLanguage();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    const isEn = language === 'en';

    if (hour >= 5 && hour < 12) {
      setGreeting(isEn ? '☀️ Hello, Good morning!' : '☀️ Hola ¡Buen día!');
    } else if (hour >= 12 && hour < 19) {
      setGreeting(isEn ? '🌤️ Hello, Good afternoon!' : '🌤️ Hola ¡Buenas tardes!');
    } else {
      setGreeting(isEn ? '🌙 Hello, Good evening!' : '☁️ Hola ¡Buenas noches!');
    }
  }, [language]);

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigation.navigate("UserTabs", { screen: "HomeTab", params: { email } });
    } catch (error: any) {
      console.log("Error de autenticación:", error?.message);
    }
  };

  const isEn = language === 'en';

  return (
    <Screen style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        <Image
          source={require('../../assets/Logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.greetingContainer}>
          <ThemedText style={styles.greetingText}>{greeting}</ThemedText>
          <View style={[styles.divider, isDark && styles.darkDivider]} />
        </View>

        <CustomInput
          label={isEn ? "User / Email" : "Usuario"}
          placeholder={isEn ? "Enter your user or email" : "Ingresa tu usuario"}
          value={email}
          onChangeText={setEmail}
          type="email"
        />

        <CustomInput
          label={isEn ? "Password" : "Contraseña"}
          placeholder={isEn ? "Enter your password" : "Ingresa tu contraseña"}
          value={password}
          onChangeText={setPassword}
          type="password"
        />

        <TouchableOpacity 
          style={styles.registerContainer} 
          onPress={() => navigation.navigate('RegisterScreen')}
        >
          <ThemedText style={styles.registerTextBase}>
            {isEn ? "¿Don't have an account? " : "¿No tienes una cuenta? "}
            <Text style={[styles.linkText, styles.boldLink, isDark && styles.darkLinkText]}>
              {isEn ? 'Register' : 'Regístrate'}
            </Text>
          </ThemedText>
        </TouchableOpacity>

        <CustomButton
          title={isEn ? "Sign In" : "Iniciar sesión"}
          onPress={handleLogin}
          variant="primary" 
        />

        <StatusBar style="auto" />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
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
    marginBottom: 8,
  },
  divider: {
    height: 3,
    backgroundColor: '#0052cc',
    width: '100%',
    borderRadius: 2,
  },
  darkDivider: {
    backgroundColor: '#3b82f6',
  },
  registerContainer: {
    marginTop: 8,
    marginBottom: 24,
    alignItems: 'center',
  },
  registerTextBase: {
    fontSize: 14,
  },
  linkText: {
    color: '#0052cc', 
    fontSize: 14,
    fontWeight: '500',
  },
  boldLink: {
    fontWeight: 'bold',
  },
  darkLinkText: {
    color: '#3b82f6', 
  },
});
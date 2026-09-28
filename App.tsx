import { View, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NetInfo from '@react-native-community/netinfo';
import StackNavigator from './src/navigation/StackNavigator';
import { navigationRef } from './src/navigation/NavigationService';
import { AuthProvider } from './src/contexts/AuthContext';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { LanguageProvider } from './src/contexts/LanguageContext';
import { SyncService } from './src/utils/SyncService';

export default function App() {
  useEffect(() => {
    // Escuchar cambios de red en toda la aplicación
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected && state.isInternetReachable !== false) {
        console.log('📶 Conexión restablecida. Ejecutando sincronización en segundo plano...');
        SyncService.syncPendingData();
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaProvider style={styles.container}>
      <AuthProvider>
        <ThemeProvider>
          <LanguageProvider>
            <View style={styles.container}>
              <NavigationContainer ref={navigationRef}>
                <StackNavigator />
              </NavigationContainer>
            </View>
          </LanguageProvider>
        </ThemeProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#ffffff',
  },
});
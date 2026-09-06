import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import DashboardCard from '../components/DashboardCard';

export default function Home({ navigation }: any) {
  const handleLogout = () => {
    navigation.replace('Login');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      
      <View style={styles.topBar}>
        <View style={styles.logoGroup}>
          <MaterialCommunityIcons name="store-cog" size={28} color="#ffffff" />
          <Text style={styles.logoText}>FiadoSync</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="exit-outline" size={20} color="#ffffff" />
          <Text style={styles.logoutText}>Salir</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
      
        <View style={styles.welcomeRow}>
          <Text style={styles.welcomeText}>¡Hola, GERSON! Te damos la bienvenida</Text>
          <Ionicons name="notifications" size={22} color="#ecc94b" />
        </View>
        <View style={styles.divider} />

        <DashboardCard
          title="Cuentas por Cobrar"
          subtitle="Consulta los saldos y fiados pendientes de cobro a tus clientes"
          valueLabel="TOTAL PENDIENTE"
          valueAmount="L 3,450.00"
          iconName="text-box-multiple-outline"
          onPress={() => console.log('Navegar a Cuentas por cobrar')}
        />

        <DashboardCard
          title="Abonos y Pagos"
          subtitle="Registra y revisa los pagos parciales recibidos durante el día"
          valueLabel="ABONADO HOY"
          valueAmount="L 850.00"
          iconName="cash-register"
          onPress={() => console.log('Navegar a Abonos')}
        />

        <DashboardCard
          title="Directorio de Clientes"
          subtitle="Gestiona la lista de clientes registrados y sus límites de crédito"
          iconName="account-group-outline"
          onPress={() => console.log('Navegar a Clientes')}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0052cc',
  },
  topBar: {
    backgroundColor: '#0052cc',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoText: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  logoutText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#f4f6f8',
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 24,
  },
  welcomeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a202c',
  },
  divider: {
    height: 2,
    backgroundColor: '#0052cc',
    width: '100%',
    marginBottom: 20,
    borderRadius: 1,
  },
});
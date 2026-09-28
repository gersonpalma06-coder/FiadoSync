import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import DashboardCard from '../components/DashboardCard';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type IconName = keyof typeof MaterialCommunityIcons.glyphMap;

const FIADOSYNC_MODULES: Array<{ title: string; iconName: IconName; description: string }> = [
  { title: 'Clientes',       iconName: 'account-group',        description: 'Administra la lista de clientes frecuentes de tu pulpería.' },
  { title: 'Cuentas',        iconName: 'cash-multiple',        description: 'Controla los fiados, abonos y saldos pendientes.' },
  { title: 'Recordatorios',  iconName: 'bell-outline',         description: 'Genera y envía alertas automáticas de cobro.' },
  { title: 'Sincronización', iconName: 'cloud-off-outline',    description: 'Modo sin conexión. Tus datos se guardan de forma local.' },
  { title: 'Reportes',       iconName: 'chart-bar',            description: 'Resumen financiero de cuentas por cobrar.' },
  { title: 'Respaldo',       iconName: 'content-save-outline', description: 'Exporta tus datos para mayor seguridad.' },
];

export default function ExploreScreen() {
  const { colors } = useTheme();

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.container}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Panel de Control</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Gestiona las operaciones de tu negocio
        </Text>
      </View>

      <View style={styles.grid}>
        {FIADOSYNC_MODULES.map(module => (
          <DashboardCard
            key={module.title}
            title={module.title}
            subtitle={module.description}     
            description={module.description}   
            icon={module.iconName}             
            iconName={module.iconName}         
            onPress={() => console.log(`Clic en ${module.title}`)} 
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    padding: 24, 
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
  },
  grid: {
    flexDirection: 'column',
    gap: 16, 
  }
});
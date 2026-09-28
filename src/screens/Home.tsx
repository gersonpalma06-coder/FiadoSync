import React, { useState, useCallback, useEffect } from 'react';
import Screen from '../components/Screen';
import ThemedText from '../components/ThemedText';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';

import DashboardCard from '../components/DashboardCard';
import ClientCard from '../components/ClientCard';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import { navigationRef } from '../navigation/NavigationService';
import AddClientModal from '../components/AddClientModal';
import AddTransactionModal from '../components/AddTransactionModal';
import { obtenerClientesConSaldo, obtenerResumenDashboard } from '../services/databaseService';
import { supabase } from '../lib/supabase';
import { SyncService } from '../utils/SyncService';

export default function Home({ navigation }: any) {
  const { isDark } = useTheme(); 
  const { language } = useLanguage();
  const t = translations[language as 'es' | 'en'] || translations.es;

  const [modalClientVisible, setModalClientVisible] = useState(false);
  const [modalTransVisible, setModalTransVisible] = useState(false);

  const [clientes, setClientes] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);

  const [totalPendiente, setTotalPendiente] = useState(0);
  const [abonadoHoy, setAbonadoHoy] = useState(0);

  const cargarDatos = async () => {
    setCargando(true);
    try {
      const netState = await NetInfo.fetch();
      const offlineQueue = await SyncService.getOfflineQueue();

      // MODO OFFLINE: Calcular basándose en datos acumulados localmente
      if (!netState.isConnected) {
        console.log('Modo offline: sumando transacciones pendientes locales');
        
        let extraPendiente = 0;
        let extraAbonado = 0;

        offlineQueue.forEach((item: any) => {
          const montoNum = Number(item.monto || 0);
          if (item.tipo === 'fiado') {
            extraPendiente += montoNum;
          } else if (item.tipo === 'abono') {
            extraAbonado += montoNum;
            extraPendiente -= montoNum;
          }
        });

        setTotalPendiente((prev) => Math.max(0, prev + extraPendiente));
        setAbonadoHoy((prev) => prev + extraAbonado);
        setCargando(false);
        return;
      }

      // MODO ONLINE: Sincronizar cola pendiente antes de consultar Supabase
      if (offlineQueue.length > 0) {
        await SyncService.syncPendingData();
      }

      // Consulta remota a Supabase
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        const [listaClientes, resumen] = await Promise.all([
          obtenerClientesConSaldo(session.user.id),
          obtenerResumenDashboard(session.user.id),
        ]);

        setClientes(listaClientes || []);
        setTotalPendiente(resumen?.totalPendiente || 0);
        setAbonadoHoy(resumen?.abonadoHoy || 0);
      }
    } catch (error) {
      console.log('Error al procesar o cargar datos:', error);
    } finally {
      setCargando(false);
    }
  };

  // Escuchador de red para reconexión automática
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(async (state) => {
      if (state.isConnected && state.isInternetReachable !== false) {
        console.log('Conexión reestablecida. Sincronizando datos...');
        await SyncService.syncPendingData();
        await cargarDatos();
      }
    });

    return () => unsubscribe();
  }, []);

  useFocusEffect(
    useCallback(() => {
      cargarDatos();
    }, [])
  );

  const handleLogout = () => {
    if (navigationRef.isReady()) {
      navigationRef.reset({
        index: 0,
        routes: [{ name: 'LoginScreen' }],
      });
    }
  };

  const formatearFecha = (fechaISO: string) => {
    if (!fechaISO) return 'Fecha desconocida';
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString('es-HN', { day: 'numeric', month: 'short', year: 'numeric' }); 
  };

  return (
    <Screen>
      {/* Barra superior con logo y botón de salir */}
      <View style={[styles.topBar, isDark && styles.darkTopBar]}>
        <View style={styles.logoGroup}>
          <MaterialCommunityIcons name="store-cog" size={28} color="#ffffff" />
          <Text style={styles.logoText}>FiadoSync</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="exit-outline" size={20} color="#ffffff" />
          <Text style={styles.logoutText}>{(t as any).logout || 'Salir'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.welcomeRow}>
          <ThemedText style={styles.welcomeText}>
            {(t as any).welcomeHome || 'Resumen General'}
          </ThemedText>
          <Ionicons name="notifications" size={22} color="#ecc94b" />
        </View>
        <View style={[styles.divider, isDark && styles.darkDivider]} />

        {/* TARJETA 1: Cuentas por Cobrar */}
        <DashboardCard
          title={(t as any).receivables || 'Cuentas por Cobrar'}
          subtitle="Consulta los clientes con saldos pendientes"
          valueLabel="TOTAL PENDIENTE"
          valueAmount={`L ${totalPendiente.toFixed(2)}`}
          iconName="text-box-multiple-outline"
          onPress={() => {
            navigation.navigate('ExploreScreen');
          }}
          description="Ver desglose de clientes con deuda" 
          icon="text-box-multiple-outline"
        />

        {/* TARJETA 2: Abonos y Pagos */}
        <DashboardCard
          title={(t as any).payments || 'Abonos y Pagos'}
          subtitle="Registra abonos o fiados de tus clientes"
          valueLabel="ABONADO HOY"
          valueAmount={`L ${abonadoHoy.toFixed(2)}`}
          iconName="cash-register"
          onPress={() => setModalTransVisible(true)}
          description="Presiona para registrar una transacción" 
          icon="cash-register"
        />

        {/* Estado de Cuentas Recientes */}
        <View style={styles.listContainer}>
          <Text style={[styles.sectionTitle, isDark && styles.darkText]}>
            {(t as any).recentAccounts || 'Estado de Cuentas Recientes'}
          </Text>
          
          {cargando ? (
            <ActivityIndicator size="large" color="#0052cc" style={{ marginTop: 20 }} />
          ) : clientes.length === 0 ? (
            <Text style={[styles.emptyText, isDark && styles.darkText]}>
              Aún no tienes clientes registrados.
            </Text>
          ) : (
            clientes.slice(0, 5).map((cliente) => (
              <ClientCard 
                key={cliente.id} 
                name={cliente.nombre} 
                debt={cliente.saldo || 0} 
                lastDate={formatearFecha(cliente.creado_en)} 
              />
            ))
          )}
        </View>
      </ScrollView>

      {/* Botón flotante para agregar nuevos clientes */}
      <TouchableOpacity 
        style={[styles.fab, isDark && styles.darkFab]} 
        onPress={() => setModalClientVisible(true)}
        activeOpacity={0.8}
      >
        <Ionicons name="person-add" size={26} color="#ffffff" />
      </TouchableOpacity>

      {/* Modales */}
      <AddClientModal 
        visible={modalClientVisible} 
        onClose={() => setModalClientVisible(false)} 
        onClientAdded={cargarDatos}
      />

      <AddTransactionModal
        visible={modalTransVisible}
        clientes={clientes}
        onClose={() => setModalTransVisible(false)}
        onTransactionAdded={cargarDatos}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: '#0052cc',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  darkTopBar: {
    backgroundColor: '#1e293b',
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
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 100, 
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
  },
  divider: {
    height: 2,
    backgroundColor: '#0052cc',
    width: '100%',
    marginBottom: 20,
    borderRadius: 1,
  },
  darkDivider: {
    backgroundColor: '#3b82f6',
  },
  listContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#0052cc',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  darkFab: {
    backgroundColor: '#3b82f6',
  },
  darkText: { 
    color: '#f8fafc' 
  },
  emptyText: { 
    textAlign: 'center', 
    color: '#64748b', 
    marginTop: 15, 
    fontStyle: 'italic' 
  },
});
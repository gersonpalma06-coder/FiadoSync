import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';

export default function ExploreScreen({ navigation }: any) {
  const { isDark } = useTheme();
  const { language } = useLanguage();
  const t = translations[language as 'es' | 'en'] || translations.es;

  const texts = {
    title: language === 'es' ? 'Panel de Control' : 'Control Panel',
    subtitle: language === 'es' ? 'Gestiona las operaciones de tu negocio' : 'Manage your business operations',
    clientsTitle: language === 'es' ? 'Clientes' : 'Customers',
    clientsSub: language === 'es' ? 'Administra la lista de clientes frecuentes de tu pulpería.' : 'Manage your store\'s frequent customer list.',
    accountsTitle: language === 'es' ? 'Cuentas' : 'Accounts',
    accountsSub: language === 'es' ? 'Controla los fiados, abonos y saldos pendientes.' : 'Control credit sales, payments, and pending balances.',
    remindersTitle: language === 'es' ? 'Recordatorios' : 'Reminders',
    remindersSub: language === 'es' ? 'Genera y envía alertas automáticas de cobro.' : 'Generate and send automatic collection alerts.',
    syncTitle: language === 'es' ? 'Sincronización' : 'Sync',
    syncSub: language === 'es' ? 'Modo sin conexión. Tus datos se guardan de forma local.' : 'Offline mode. Your data is saved locally.',
    reportsTitle: language === 'es' ? 'Reportes' : 'Reports',
    reportsSub: language === 'es' ? 'Resumen financiero de cuentas por cobrar.' : 'Financial summary of accounts receivable.',
  };

  const options = [
    {
      id: 'clients',
      title: texts.clientsTitle,
      subtitle: texts.clientsSub,
      icon: <Ionicons name="people" size={26} color="#0052cc" />,
      action: () => navigation.navigate('HomeTab'),
    },
    {
      id: 'accounts',
      title: texts.accountsTitle,
      subtitle: texts.accountsSub,
      icon: <Ionicons name="card-outline" size={26} color="#0052cc" />,
      action: () => navigation.navigate('HomeTab'),
    },
    {
      id: 'reminders',
      title: texts.remindersTitle,
      subtitle: texts.remindersSub,
      icon: <Ionicons name="notifications-outline" size={26} color="#0052cc" />,
      action: () => {},
    },
    {
      id: 'sync',
      title: texts.syncTitle,
      subtitle: texts.syncSub,
      icon: <Ionicons name="cloud-offline-outline" size={26} color="#0052cc" />,
      action: () => {},
    },
    {
      id: 'reports',
      title: texts.reportsTitle,
      subtitle: texts.reportsSub,
      icon: <Ionicons name="stats-chart" size={26} color="#0052cc" />,
      action: () => {},
    },
  ];

  return (
    <View style={styles.screenWrapper}>
      <SafeAreaView style={[styles.safeArea, isDark && styles.darkSafeArea]} edges={['top', 'left', 'right']}>
        <ScrollView 
          contentContainerStyle={[styles.container, isDark && styles.darkContainer]}
          showsVerticalScrollIndicator={false}
        >
          {/* Encabezado de la Pantalla */}
          <View style={styles.headerRow}>
            <View style={styles.headerTextContainer}>
              <Text style={[styles.title, isDark && styles.darkHeaderText]}>{texts.title}</Text>
              <Text style={[styles.subtitle, isDark && styles.darkHeaderSubtext]}>{texts.subtitle}</Text>
            </View>

            <TouchableOpacity 
              style={[styles.settingsIconButton, isDark && styles.darkSettingsIconButton]}
              onPress={() => navigation.navigate('Settings')}
            >
              <Ionicons 
                name="settings-sharp" 
                size={22} 
                color={isDark ? '#94a3b8' : '#64748b'} 
              />
            </TouchableOpacity>
          </View>

          <View style={styles.cardsContainer}>
            {options.map((item) => (
              <TouchableOpacity 
                key={item.id}
                style={styles.card} 
                onPress={item.action}
                activeOpacity={0.7}
              >
                <View style={styles.cardHeaderRow}>
                  <View style={styles.iconTitleRow}>
                    {item.icon}
                    <Text style={styles.cardTitle}>
                      {item.title}
                    </Text>
                  </View>

                  <View style={styles.yellowButton}>
                    <Ionicons name="chevron-forward" size={20} color="#0052cc" />
                  </View>
                </View>

                <Text style={styles.cardSubtitle}>
                  {item.subtitle}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#f4f6f8',
  },
  darkSafeArea: {
    backgroundColor: '#031525',
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  darkContainer: {
    backgroundColor: '#031525',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTextContainer: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a202c',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  darkHeaderText: {
    color: '#ffffff',
  },
  darkHeaderSubtext: {
    color: '#94a3b8',
  },
  settingsIconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkSettingsIconButton: {
    backgroundColor: '#1e293b',
  },
  cardsContainer: {
    gap: 16,
  },
  card: {
    backgroundColor: '#ffffff', 
    borderRadius: 16,
    padding: 18,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a202c',
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#64748b',
    lineHeight: 18,
  },
  yellowButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#fef08a',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
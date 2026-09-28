import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import Screen from '../../components/Screen';
import ThemedText from '../../components/ThemedText';

export default function SettingsScreen({ navigation }: any) {
  const { isDark: isDarkMode, toggleTheme } = useTheme(); 
  const { language, changeLanguage: setLanguage } = useLanguage();

  const handleLogout = () => {
    navigation.replace('LoginScreen');
  };

  return (
    <Screen style={styles.container}>
      <View style={[styles.card, isDarkMode && styles.darkCard]}>
        <Ionicons 
          name="settings-outline" 
          size={50} 
          color={isDarkMode ? '#3b82f6' : '#0052cc'} 
        />
        
        <ThemedText style={styles.title}>
          {language === 'es' ? 'Configuración' : 'Settings'}
        </ThemedText>
        
        <ThemedText style={styles.subtitle}>
          {language === 'es' 
            ? 'Ajustes de la cuenta y opciones de la aplicación' 
            : 'Account settings and app preferences'}
        </ThemedText>

        <View style={[styles.divider, isDarkMode && styles.darkDivider]} />

        {/* Control de Modo Oscuro */}
        <View style={styles.optionRow}>
          <View style={styles.optionLabelGroup}>
            <Ionicons 
              name={isDarkMode ? 'moon' : 'sunny-outline'} 
              size={22} 
              color={isDarkMode ? '#facc15' : '#4a5568'} 
            />
            <ThemedText style={styles.optionText}>
              {language === 'es' ? 'Modo Oscuro' : 'Dark Mode'}
            </ThemedText>
          </View>
          <Switch 
            value={isDarkMode} 
            onValueChange={toggleTheme}
            trackColor={{ false: '#cbd5e1', true: '#3b82f6' }}
            thumbColor={isDarkMode ? '#ffffff' : '#f8fafc'}
          />
        </View>

        {/* Control de Idioma */}
        <View style={styles.optionRow}>
          <View style={styles.optionLabelGroup}>
            <Ionicons 
              name="language-outline" 
              size={22} 
              color={isDarkMode ? '#94a3b8' : '#4a5568'} 
            />
            <ThemedText style={styles.optionText}>
              {language === 'es' ? 'Idioma' : 'Language'}
            </ThemedText>
          </View>
          <View style={[styles.languageContainer, isDarkMode && styles.darkLanguageContainer]}>
            <TouchableOpacity 
              style={[
                styles.langButton, 
                language === 'es' && (isDarkMode ? styles.langActiveDark : styles.langActive)
              ]}
              onPress={() => setLanguage && setLanguage('es')}
            >
              
              <Text style={[
                styles.langText, 
                isDarkMode && styles.darkLangText,
                language === 'es' && styles.langTextActive
              ]}>ES</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.langButton, 
                language === 'en' && (isDarkMode ? styles.langActiveDark : styles.langActive)
              ]}
              onPress={() => setLanguage && setLanguage('en')}
            >
              <Text style={[
                styles.langText, 
                isDarkMode && styles.darkLangText,
                language === 'en' && styles.langTextActive
              ]}>EN</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.divider, isDarkMode && styles.darkDivider]} />

        {/* Botón Cerrar Sesión */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={[styles.logoutText, isDarkMode && styles.darkLogoutText]}>
            {language === 'es' ? 'Cerrar Sesión' : 'Log Out'}
          </Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    
  },
  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  darkCard: {
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#334155',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 8,
    
  },
  subtitle: {
    fontSize: 13,
    color: '#718096', 
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    width: '100%',
    marginVertical: 16,
  },
  darkDivider: {
    backgroundColor: '#334155',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginVertical: 8,
  },
  optionLabelGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  optionText: {
    fontSize: 15,
    fontWeight: '600',
    
  },
  languageContainer: {
    flexDirection: 'row',
    backgroundColor: '#e2e8f0',
    borderRadius: 8,
    padding: 2,
  },
  darkLanguageContainer: {
    backgroundColor: '#334155',
  },
  langButton: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  langActive: {
    backgroundColor: '#0052cc',
  },
  langActiveDark: {
    backgroundColor: '#3b82f6',
  },
  langText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4a5568',
  },
  darkLangText: {
    color: '#94a3b8',
  },
  langTextActive: {
    color: '#ffffff',
  },
  logoutButton: {
    marginTop: 8,
  },
  logoutText: {
    color: '#0052cc',
    fontSize: 15,
    fontWeight: 'bold',
  },
  darkLogoutText: {
    color: '#3b82f6',
  },
});
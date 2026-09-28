import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { TabsParamList } from '../../navigation/TabsNavigator';
import CustomButton from '../../components/CustomButton';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../utils/translations';
import Screen from '../../components/Screen';
import ThemedText from '../../components/ThemedText';

type ProfileProps = BottomTabScreenProps<TabsParamList, 'Profile'>;

export default function Profile({ route, navigation }: ProfileProps) {
  const { isDark } = useTheme(); 
  const { language } = useLanguage();
  const t = translations[language as 'es' | 'en'] || translations.es;

  const { email } = route.params;

  const handleLogout = () => {
    (navigation as any).getParent()?.replace('LoginScreen');
  };

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      (navigation as any).navigate('HomeTab');
    }
  };

  const handleEditProfile = () => {
    (navigation as any).navigate('Settings');
  };

  return (
    <Screen style={styles.container}>
      <View style={[styles.card, isDark && styles.darkCard]}>
        <Ionicons 
          name="person-circle-outline" 
          size={80} 
          color={isDark ? "#3b82f6" : "#0052cc"} 
          style={styles.avatar} 
        />
        
        <ThemedText style={styles.title}>
          {(t as any).welcomeProfile || '¡Bienvenido!'}
        </ThemedText>
        <ThemedText>
          {email}
        </ThemedText>

        <View style={styles.buttonContainer}>
          <CustomButton 
            title={(t as any).userPreferences || 'Ir a Preferencias de Usuario'} 
            onPress={handleEditProfile} 
            variant="primary"
          />   

          <CustomButton 
            title={(t as any).goBack || 'Ir Atrás'} 
            onPress={handleGoBack} 
            variant="secondary"
          />

          <CustomButton 
            title={(t as any).logout || 'Cerrar Sesión'} 
            onPress={handleLogout} 
            variant="tertiary"
          /> 

        </View>
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
  avatar: {
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
    
  },
  emailText: {
    fontSize: 15,
    color: '#0052cc',
    fontWeight: '600',
    marginBottom: 24,
  },
  darkEmailText: {
    color: '#3b82f6',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center', 
    gap: 12,
  },
});
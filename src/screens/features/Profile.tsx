import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { TabsParamList } from '../../navigation/TabsNavigator';
import CustomButton from '../../components/CustomButton';

type ProfileProps = BottomTabScreenProps<TabsParamList, 'Profile'>;

export default function Profile({ route, navigation }: ProfileProps) {
  const email = route.params?.email ?? "usuario@fiadosync.com";

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
    <View style={styles.container}>
      <View style={styles.card}>
        <Ionicons name="person-circle-outline" size={80} color="#0052cc" style={styles.avatar} />
        
        <Text style={styles.title}>¡Bienvenido!</Text>
        <Text style={styles.emailText}>{email}</Text>

        <View style={styles.buttonContainer}>
          <CustomButton 
            title="Ir a Preferencias de Usuario" 
            onPress={handleEditProfile} 
            variant="primary"
          />   

          <CustomButton 
            title="Ir Atrás" 
            onPress={handleGoBack} 
            variant="secondary"
          />

          <CustomButton 
            title="Cerrar Sesión" 
            onPress={handleLogout} 
            variant="tertiary"
          /> 
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f6f9',
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
  avatar: {
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  emailText: {
    fontSize: 15,
    color: '#0052cc',
    fontWeight: '600',
    marginBottom: 24,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center', 
    gap: 12,
  },
});
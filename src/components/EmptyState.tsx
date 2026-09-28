import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import ThemedText from './ThemedText';

interface EmptyStateProps {
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  message: string;
}

export default function EmptyState({ iconName, title, message }: EmptyStateProps) {
  const { isDark } = useTheme();
  
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons 
        name={iconName} 
        size={64} 
        color={isDark ? '#475569' : '#cbd5e1'} 
      />
      <ThemedText style={styles.title}>{title}</ThemedText>
      <ThemedText style={styles.message}>{message}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    marginTop: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
    color: '#64748b',
  },
});
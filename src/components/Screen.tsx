import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; 
import { useTheme } from '../contexts/ThemeContext';

interface ScreenProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
}

export default function Screen({ children, style }: ScreenProps) {
  const { isDark } = useTheme();
  
  return (
    <SafeAreaView style={[styles.container, isDark && styles.darkContainer, style]}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8', 
  },
  darkContainer: {
    backgroundColor: '#0f172a', 
  },
});
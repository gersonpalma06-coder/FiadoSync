import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

interface ThemedTextProps extends TextProps {
  style?: any;
}

export default function ThemedText({ style, children, ...props }: ThemedTextProps) {
  const { isDark } = useTheme();
  
  return (
    <Text style={[styles.text, isDark && styles.darkText, style]} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#1a202c', 
  },
  darkText: {
    color: '#f8fafc', 
  },
});
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "tertiary";
  isLoading?: boolean; 
};

export default function CustomButton({ 
  title, 
  onPress, 
  variant = 'primary', 
  isLoading = false 
}: CustomButtonProps) {
  const styles = getstyles(variant);

  const getLoaderColor = () => {
    switch (variant) {
      case 'primary': return '#ffcc00';
      case 'secondary': return '#1e293b';
      case 'tertiary': return '#0052cc';
      default: return '#ffcc00';
    }
  };

  return (
    <TouchableOpacity 
      style={styles.button} 
      onPress={onPress} 
      activeOpacity={0.8}
      disabled={isLoading} 
    >
      {isLoading ? (
        <ActivityIndicator color={getLoaderColor()} />
      ) : (
        <Text style={styles.buttonTitle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const getstyles = (variant: "primary" | "secondary" | "tertiary") =>
  StyleSheet.create({
    button: {
      backgroundColor:
        variant === 'primary' ? '#0052cc' :
        variant === 'secondary' ? '#e2e8f0' : 'transparent',
      paddingVertical: 14,
      paddingHorizontal: 20,
      borderRadius: 8,
      width: '100%',
      alignItems: 'center',
      marginTop: 10,
    },
    buttonTitle: {
      color:
        variant === 'primary' ? '#ffcc00' :
        variant === 'secondary' ? '#1e293b' : '#0052cc',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
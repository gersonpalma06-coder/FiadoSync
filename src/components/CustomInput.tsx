import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardTypeOptions, TouchableOpacity } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

type CustomInputProps = {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  type?: "default" | "email" | "password" | "number";
};

export default function CustomInput({
  label,
  placeholder,
  value,
  onChangeText,
  type = "default",
}: CustomInputProps) {
  const [isSecureText, setIsSecureText] = useState(type === "password");
  const isPasswordField = type === "password";

  const iconName: keyof typeof MaterialIcons.glyphMap | undefined =
    type === "password" ? "lock" :
    type === "email" ? "alternate-email" :
    undefined;

  const keyboardType: KeyboardTypeOptions =
    type === "email" ? "email-address" :
    type === "number" ? "number-pad" : "default";

  const getError = () => {
    if (!value) return '';

    if (type === "email" && !value.includes("@")) {
      return 'Correo inválido';
    }

    if (type === "password" && value.length < 6) {
      return "La contraseña es débil";
    }

    return '';
  };

  const error = getError();

  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View style={[styles.inputContainer, error ? styles.inputError : null]}>
        {iconName && <MaterialIcons name={iconName} size={20} color="#666" style={styles.icon} />}

        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#a0aec0"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isSecureText}
          keyboardType={keyboardType}
          autoCapitalize="none"
        />

        {isPasswordField && (
          <TouchableOpacity onPress={() => setIsSecureText(!isSecureText)}>
            <Ionicons name={isSecureText ? "eye" : "eye-off"} size={20} color="#718096" />
          </TouchableOpacity>
        )}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    color: '#2d3748',
    marginBottom: 6,
  },
  inputContainer: {
    backgroundColor: '#f1f5f9',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingHorizontal: 14,
    width: '100%',
    height: 48,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#1a202c',
  },
  inputError: {
    borderColor: '#e53e3e',
    borderWidth: 1.5,
  },
  errorText: {
    color: '#e53e3e',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 2,
  },
});
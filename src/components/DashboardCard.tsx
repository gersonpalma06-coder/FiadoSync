import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

interface DashboardCardProps {
  title: string;
  subtitle: string;
  valueLabel?: string;
  valueAmount?: string;
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
  onPress: () => void;
}

export default function DashboardCard({
  title,
  subtitle,
  valueLabel,
  valueAmount,
  iconName,
  onPress,
}: DashboardCardProps) {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.headerRow}>
        <View style={styles.titleGroup}>
          <MaterialCommunityIcons name={iconName} size={28} color="#0052cc" />
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.arrowButton}>
          <Ionicons name="chevron-forward" size={20} color="#0052cc" />
        </View>
      </View>

      <Text style={styles.subtitle}>{subtitle}</Text>

      {valueLabel && valueAmount && (
        <View style={styles.valueGroup}>
          <Text style={styles.valueLabel}>{valueLabel}</Text>
          <Text style={styles.valueAmount}>{valueAmount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  titleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a202c',
  },
  arrowButton: {
    backgroundColor: '#f6e05e',
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 13,
    color: '#718096',
    marginBottom: 10,
    lineHeight: 18,
  },
  valueGroup: {
    marginTop: 4,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#edf2f7',
  },
  valueLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#4a5568',
    letterSpacing: 0.5,
  },
  valueAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0052cc',
    marginTop: 2,
  },
});
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ClientCardProps {
  name: string;
  debt: number;
  lastDate: string;
}

export default function ClientCard({ name, debt, lastDate }: ClientCardProps) {
  
  const getDebtColor = () => {
    if (debt >= 500) return '#e53e3e'; 
    if (debt > 0) return '#dd6b20';   
    return '#38a169';              
  };

  return (
    
    <View style={styles.card}>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.date}>Último fiado: {lastDate}</Text>
      </View>
      <View style={styles.debtContainer}>
        <Text style={[styles.debtAmount, { color: getDebtColor() }]}>
          L. {debt.toFixed(2)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d3748',
  },
  date: {
    fontSize: 12,
    color: '#718096',
    marginTop: 4,
  },
  debtContainer: {
    alignItems: 'flex-end',
  },
  debtAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
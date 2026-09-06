import { View, Text, Button, StyleSheet } from 'react-native';

export default function Login({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text>Pantalla de Login</Text>
      <Button title="Entrar" onPress={() => navigation.replace('MainTabs')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});
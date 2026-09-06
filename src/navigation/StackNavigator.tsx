import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import TabsNavigator from './TabsNavigator';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="MainTabs" component={TabsNavigator} />
    </Stack.Navigator>
  );
}
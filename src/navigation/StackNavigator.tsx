import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "../screens/Login";
import Home from "../screens/Home";
import Register from "../screens/Register";
import TabsNavigator from "./TabsNavigator";

// 1- Declarar el tipado de las pantallas con sus parámetros
export type RootStackParamList = {
  LoginScreen: undefined; 
  RegisterScreen: undefined;
  HomeScreen: { email: string }; 
  UserTabs: { email?: string } | undefined; 
};

// 2- Crear el stack navigator y manejar la navegación
const Stack = createNativeStackNavigator<RootStackParamList>();

// 3- Utilizar el stack de navegación
export default function StackNavigator() {
  return (
    <Stack.Navigator 
      initialRouteName="LoginScreen"
      screenOptions={{
        headerShown: false, 
      }}
    >
      <Stack.Screen name="LoginScreen" component={Login} /> 
      <Stack.Screen name="RegisterScreen" component={Register} />     
      <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen name="UserTabs" component={TabsNavigator} />
    </Stack.Navigator>
  ); 
}
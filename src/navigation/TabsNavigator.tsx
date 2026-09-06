import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
import Profile from "../screens/features/Profile";
import Settings from "../screens/features/Settings";
import Home from "../screens/Home";

// 1. Declarar el tipado de las pantallas con sus parámetros
export type TabsParamList = {
  HomeTab: { email?: string };
  Profile: { email?: string };
  Settings: undefined;
};

// 2. Crear el tabs navigator encargado de manejar la navegación por pestañas
const Tab = createBottomTabNavigator<TabsParamList>();

// 3. Utilizar el navegador por tabs (recibiendo route en los props)
export default function TabNavigator({ route }: any) {
  const userEmail = route?.params?.email;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, 
        tabBarActiveTintColor: '#0052cc', 
        tabBarInactiveTintColor: '#8c8c8c',
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "help-outline";

          if (route.name === "HomeTab") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={Home} 
        initialParams={{ email: userEmail }}
        options={{ title: 'Inicio' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={Profile} 
        initialParams={{ email: userEmail }}
        options={{ title: 'Perfil' }}
      />
      <Tab.Screen 
        name="Settings" 
        component={Settings}
        options={{ title: 'Ajustes' }}
      />
    </Tab.Navigator>
  );
}
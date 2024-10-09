import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
        headerStyle: {
          backgroundColor: 'teal',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Progreso',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'checkmark-circle' : 'checkmark-circle-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="habitos"
        options={{
          title: 'Hábitos',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'arrow-back' : 'heart-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

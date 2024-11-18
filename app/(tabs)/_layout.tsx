import React from 'react';
import { Colors } from '@/constants/Colors';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Tabs, useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { GlobalProvider } from '../../components/contexts/globalContext';

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <GlobalProvider>
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
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Progreso',
                        tabBarIcon: ({ color, focused }) => (
                            <TabBarIcon
                                name={
                                    focused
                                        ? 'checkmark-circle'
                                        : 'checkmark-circle-outline'
                                }
                                color={color}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="habitos"
                    options={{
                        title: 'Hábitos',
                        tabBarIcon: ({ color, focused }) => (
                            <TabBarIcon
                                name={focused ? 'heart' : 'heart-outline'}
                                color={color}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="perfil"
                    options={{
                        title: 'Perfil',
                        tabBarIcon: ({ color, focused }) => (
                            <TabBarIcon
                                name={focused ? 'person' : 'person-outline'}
                                color={color}
                            />
                        ),
                    }}
                />
            </Tabs>
        </GlobalProvider>
    );
}
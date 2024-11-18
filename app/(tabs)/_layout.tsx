import React from 'react';
import { Tabs } from 'expo-router';

// Constants
import { Colors } from '@/constants/Colors';

// Components
import { TabBarIcon } from '@/components/navigation/TabBarIcon';

// Hooks
import { useColorScheme } from '@/hooks/useColorScheme';

// Contexts
import { GlobalProvider } from '../../components/contexts/globalContext';

/**
 * The main layout component for the Tab-based navigation in the app.
 * Provides global context and consistent styling across all tabs.
 */
export default function TabLayout() {
    // Determine the current color scheme (light or dark)
    const colorScheme = useColorScheme();

    return (
        <GlobalProvider>
            <Tabs
                screenOptions={{
                    // Active tab tint color based on the current color scheme
                    tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,

                    // Header configuration
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
                {/* Progress Tab */}
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Progreso',
                        tabBarIcon: ({ color, focused }) => (
                            <TabBarIcon
                                name={focused ? 'checkmark-circle' : 'checkmark-circle-outline'}
                                color={color}
                            />
                        ),
                    }}
                />

                {/* Habits Tab */}
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

                {/* Profile Tab */}
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

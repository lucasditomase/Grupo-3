import React from 'react';
import { Tabs } from 'expo-router';
import { TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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

    const tabs = [
        { name: 'index', title: 'Progreso', iconFocused: 'checkmark-circle', iconDefault: 'checkmark-circle-outline' },
        { name: 'habitos', title: 'Hábitos', iconFocused: 'heart', iconDefault: 'heart-outline', },
        { name: 'perfil', title: 'Perfil', iconFocused: 'person', iconDefault: 'person-outline', },
    ];

    const HeaderRight = () => {
        const navigation = useNavigation();
        return (
            <TouchableOpacity
                onPress={() => {
                    (navigation as any).navigate('index'); // Cambia según la ruta destino
                }}
            >
                <Image
                    source={require('../../assets/images/logoRedondeado.png')}
                    style={{ width: 30, height: 30, marginRight: 10 }}
                />
            </TouchableOpacity>
        );
    };

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
                {tabs.map(({ name, title, iconFocused, iconDefault }) => (
                    <Tabs.Screen
                        key={name}
                        name={name}
                        options={{
                            title,
                            tabBarIcon: ({ color, focused }) => (
                                <TabBarIcon
                                    name={focused ? iconFocused as "checkmark-circle" | "checkmark-circle-outline" | "heart" | "heart-outline" | "person" | "person-outline" : iconDefault as "checkmark-circle" | "checkmark-circle-outline" | "heart" | "heart-outline" | "person" | "person-outline"}
                                    color={color}
                                />
                            ),
                            headerRight: HeaderRight,
                        }}
                    />
                ))}
            </Tabs>
        </GlobalProvider>
    );
}

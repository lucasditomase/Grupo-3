import React, { useEffect, useState } from 'react';
import { Modal, ScrollView, Text, View, useColorScheme } from 'react-native';

// Views
import LoginScreen from '../../components/views/login';
import ProgressCircle from '../../components/views/circulos';

// Styles
import getProgresoStyles from '../../components/styles/progresoStyles';
import themeDark from '../../components/themes/themeDark';
import themeLight from '../../components/themes/themeLight';

// Contexts
import { useGlobalContext } from '../../components/contexts/useGlobalContext';

const ProgresoScreen = () => {
    const { user } = useGlobalContext();

    const [isLoggedIn, setIsLoggedIn] = useState(!user ? false : true);
    const [isLoginVisible, setIsLoginVisible] = useState(user ? false : true);
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';

    const progresoStyles = getProgresoStyles({ isDarkMode });


    useEffect(() => {
        if (user) {
            setIsLoggedIn(true);
            setIsLoginVisible(false);
        } else {
            setIsLoggedIn(false);
            setIsLoginVisible(true);
        }
    }, [user]);

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        setIsLoginVisible(false);
    };

    const progresoData = [
        { title: 'Avance diario', progress: 75, color: 'teal', completado: '75%' },
        { title: 'Avance semanal', progress: 35, color: 'teal', completado: '35%' },
        { title: 'Avance mensual', progress: 40, color: 'teal', completado: '40%' },
    ];

    return (
        <View
            style={[isDarkMode ? themeDark.darkBackground : themeLight.lightBackground]}
        >
            <Modal
                visible={isLoginVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsLoginVisible(false)}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.5)',
                    }}
                >
                    <LoginScreen
                        onClose={() => setIsLoginVisible(false)}
                        onLoginSuccess={handleLoginSuccess}
                    />
                </View>
            </Modal>

            {isLoggedIn && (
                <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
                    {progresoData.map((item, index) => (
                        <View key={index} style={progresoStyles.card}>
                            <Text style={progresoStyles.labelAbove}>{item.title}</Text>
                            <ProgressCircle
                                size={200}
                                strokeWidth={20}
                                progress={item.progress}
                                color={item.color}
                            />
                            <Text style={progresoStyles.label}>
                                {item.completado} completado
                            </Text>
                        </View>
                    ))}
                </ScrollView>
            )}
        </View>
    );
};

export default ProgresoScreen;

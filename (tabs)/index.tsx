import LoginScreen from '../../components/views/login';
import ProgressCircle from '../../components/views/circulos';
import React, { useState } from 'react';
import progresoScreenStyles from '../../components/styles/progresoStyles';
import themeDark from '../../components/themes/themeDark';
import themeLight from '../../components/themes/themeLight';
import { Text, View, useColorScheme, Modal, Button, ScrollView } from 'react-native';
import { useGlobalContext } from '../../components/contexts/useGlobalContext';

const ProgresoScreen = () => {
    const { theme, user } = useGlobalContext();
    const [isLoggedIn, setIsLoggedIn] = useState(!user ? false : true);
    const [isLoginVisible, setIsLoginVisible] = useState(user ? false : true);
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';

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
            style={[
                isDarkMode
                    ? themeDark.darkBackground
                    : themeLight.lightBackground,
            ]}
        >
            {<Modal
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
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }}
                >
                    <LoginScreen
                        onClose={() => setIsLoginVisible(false)}
                        onLoginSuccess={handleLoginSuccess}
                    />
                </View>
            </Modal>}
            {isLoggedIn && (
                <>
                    <ScrollView>
                        {progresoData.map((item, index) => (
                            <View
                                key={index}
                                style={{
                                    marginVertical: 20,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Text style={progresoScreenStyles.label}>{item.title}</Text>
                                <Text></Text>
                                <ProgressCircle
                                    size={200}
                                    strokeWidth={20}
                                    progress={item.progress}
                                    color={item.color}
                                />
                                <Text style={progresoScreenStyles.label}>
                                    {item.completado} completado
                                </Text>
                            </View>
                        ))}
                    </ScrollView>
                </>
            )}
        </View>
    );
};

export default ProgresoScreen;
import LoginScreen from '../../views/login';
import ProgressCircle from '../../components/views/circulos';
import React, { useState } from 'react';
import progresoScreenStyles from '../../styles/progresoStyles';
import themeDark from '../../themes/themeDark';
import themeLight from '../../themes/themeLight';
import { Text, View, useColorScheme, Modal, Button } from 'react-native';
import { useGlobalContext } from '../../views/contexts/useGlobalContext';

const isUserLoggedIn = () => {
    return false;
};

const ProgresoScreen = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(isUserLoggedIn());
    const [isLoginVisible, setIsLoginVisible] = useState(!isLoggedIn);
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        setIsLoginVisible(false);
    };

    const { globalData, setGlobalData } = useGlobalContext();

    const updateUser = () => {
        setGlobalData({ ...globalData, user: { name: 'John Doe', age: 30 } });
    };

    return (
        <View
            style={[
                isDarkMode
                    ? themeDark.darkBackground
                    : themeLight.lightBackground,
            ]}
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
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }}
                >
                    <LoginScreen
                        onClose={() => setIsLoginVisible(false)}
                        onLoginSuccess={handleLoginSuccess}
                    />
                </View>
            </Modal>
            {isLoggedIn && (
                <>
                    <View
                        style={{
                            marginVertical: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <ProgressCircle
                            size={200}
                            strokeWidth={20}
                            progress={75}
                            color="teal"
                        />
                        <Text style={progresoScreenStyles.label}>
                            75% completado
                        </Text>
                    </View>
                    <Text>User: {globalData.user ? globalData.user.name : 'No user logged in'}</Text>
                    <Text>Theme: {globalData.theme}</Text>
                    <Button title="Login User" onPress={updateUser} />
                    <View
                        style={{
                            marginVertical: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <ProgressCircle
                            size={200}
                            strokeWidth={20}
                            progress={25}
                            color="teal"
                        />
                        <Text style={progresoScreenStyles.label}>
                            35% completado
                        </Text>
                    </View>
                </>
            )}
        </View>
    );
};

export default ProgresoScreen;

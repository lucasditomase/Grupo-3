import React, { useState } from 'react';
import loginScreenStyles from '../styles/loginStyles';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Alert,
} from 'react-native';

interface LoginScreenProps {
    onClose: () => void;
    onLoginSuccess: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onClose, onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (email === '' && password === '') {
            setEmail('');
            setPassword('');
            onLoginSuccess();
        } else {
            Alert.alert('Error', 'Correo o clave incorrecta.');
        }
    };

    return (
        <View style={loginScreenStyles.container}>
            <Text style={loginScreenStyles.title}>Debes autenticarte para continuar</Text>
            <TextInput
                style={loginScreenStyles.input}
                placeholder="Correo"
                placeholderTextColor="#aaa"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={loginScreenStyles.input}
                placeholder="Clave"
                placeholderTextColor="#aaa"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
            />
            <View style={loginScreenStyles.buttonContainer}>
                <Button title="Iniciar sesion" onPress={handleLogin} />
            </View>
        </View>
    );
};

export default LoginScreen;
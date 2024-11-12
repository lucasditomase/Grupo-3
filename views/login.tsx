import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import loginScreenStyles from '../styles/loginStyles';
import { registerUser, loginUser } from './AuthService';

interface LoginScreenProps {
    onClose: () => void;
    onLoginSuccess: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({
    onClose,
    onLoginSuccess,
}) => {
    const [email, setEmail] = useState('');
    const [isLogin, setIsLogin] = useState(false);
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleLogin = async () => {
        const success = await loginUser(email, password);
        if (success) {
            onLoginSuccess();
            onClose();
        }
    };

    const handleSignUp = async () => {
        const success = await registerUser(username, email, password);
        if (success) {
            handleLogin();
            onLoginSuccess();
            onClose();
        }
    };

    return (
        <View style={loginScreenStyles.container}>
            {isLogin ? (
                <View>
                    <Text style={loginScreenStyles.title}>
                        Debes autenticarte para continuar
                    </Text>
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
                        <Button title="Iniciar sesión" onPress={handleLogin} />
                    </View>
                </View>
            ) : (
                <View>
                    <Text style={loginScreenStyles.title}>
                        Necesitas una cuenta para continuar
                    </Text>
                    <TextInput
                        style={loginScreenStyles.input}
                        placeholder="Usuario"
                        placeholderTextColor="#aaa"
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
                    />
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
                        <Button title="Registrarse" onPress={handleSignUp} />
                    </View>
                </View>
            )}
            <Button
                title={
                    isLogin
                        ? '¿No tienes cuenta? Regístrate'
                        : '¿Ya tienes cuenta? Inicia sesión'
                }
                onPress={() => setIsLogin(!isLogin)}
            />
        </View>
    );
};

export default LoginScreen;

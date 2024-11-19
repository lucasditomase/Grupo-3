import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import loginScreenStyles from '../styles/loginStyles';
import { registerUser, loginUser } from '../../components/authService';
import { useGlobalContext } from '../../components/contexts/useGlobalContext';

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
    const [nacimientoDia, setDay] = useState('');
    const [nacimientoMes, setMonth] = useState('');
    const [nacimientoAnio, setYear] = useState('');
    const router = useRouter();
    const { setUser } = useGlobalContext();

    const handleLogin = async () => {
        const response = await loginUser(email, password, setUser);
        if (response.success) {
            onLoginSuccess();
            router.replace('/');
        }
    };

    const handleSignUp = async () => {
        const success = await registerUser(
            username,
            email,
            password,
            nacimientoDia,
            nacimientoMes,
            nacimientoAnio
        );
        if (success) {
            handleLogin(); // Perform login after successful signup
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
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            marginBottom: 10,
                        }}
                    >
                        {'Fecha de nacimiento'}
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <TextInput
                            style={[
                                loginScreenStyles.input,
                                { flex: 1, marginRight: 5 },
                            ]}
                            placeholder="Dia"
                            placeholderTextColor="#aaa"
                            keyboardType="numeric"
                            value={nacimientoDia}
                            onChangeText={setDay}
                            maxLength={2}
                        />
                        <TextInput
                            style={[
                                loginScreenStyles.input,
                                { flex: 1, marginHorizontal: 5 },
                            ]}
                            placeholder="Mes"
                            placeholderTextColor="#aaa"
                            keyboardType="numeric"
                            value={nacimientoMes}
                            onChangeText={setMonth}
                            maxLength={2}
                        />
                        <TextInput
                            style={[
                                loginScreenStyles.input,
                                { flex: 1, marginLeft: 5 },
                            ]}
                            placeholder="Anio"
                            placeholderTextColor="#aaa"
                            keyboardType="numeric"
                            value={nacimientoAnio}
                            onChangeText={setYear}
                            maxLength={4}
                        />
                    </View>
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

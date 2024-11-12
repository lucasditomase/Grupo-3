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
    const [nacimientoDia, setDay] = useState('');
    const [nacimientoMes, setMonth] = useState('');
    const [nacimientoAnio, setYear] = useState('');

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

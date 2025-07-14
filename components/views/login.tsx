import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Animated,
    StyleSheet,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useGlobalContext } from '../../components/contexts/useGlobalContext';
import { registerUser, loginUser } from '../../components/authService';

interface LoginScreenProps {
    onLoginSuccess?: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [nacimientoDia, setDay] = useState('');
    const [nacimientoMes, setMonth] = useState('');
    const [nacimientoAnio, setYear] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();
    const { setUser } = useGlobalContext();

    const [logoOpacity] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(logoOpacity, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
        }).start();
    }, []);

    const handleLogin = async () => {
        const response = await loginUser(email, password, setUser);
        if (response.success) {

            setErrorMessage('');
            if (onLoginSuccess) {
                onLoginSuccess();
            }

            router.replace('/');
        } else {
            setErrorMessage(response.message);
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
            handleLogin();
        }
    };

    return (
        <View style={styles.container}>
            {/* Animated Logo */}
            <Animated.Image
                source={require('../../assets/images/logoRedondeado.png')}
                style={[styles.logo, { opacity: logoOpacity }]}
                resizeMode="contain"
            />

            {/* Form */}
            {isLogin ? (
                <View>
                    <Text style={styles.welcomeText}>
                        ¡Bienvenido de nuevo! 🎉
                    </Text>
                    <Text style={styles.subtitle}>
                        Inicia sesión para continuar y alcanzar tus metas.
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Tu correo electrónico"
                        placeholderTextColor="#aaa"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={[styles.input, { paddingRight: 40 }]}
                            placeholder="Tu contraseña"
                            placeholderTextColor="#aaa"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                        />
                        <TouchableOpacity
                            style={styles.showPasswordButton}
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            <Ionicons
                                name={showPassword ? 'eye-off' : 'eye'}
                                size={24}
                                color="gray"
                            />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleLogin}
                    >
                        <Text style={styles.buttonText}>Iniciar sesión</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View>
                    <Text style={styles.welcomeText}>
                        ¡Un nuevo comienzo! 🌟
                    </Text>
                    <Text style={styles.subtitle}>
                        Regístrate para personalizar tu experiencia.
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Elige un nombre de usuario"
                        placeholderTextColor="#aaa"
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
                    />
                    <Text style={styles.sectionTitle}>Fecha de nacimiento</Text>
                    <View style={styles.birthdateContainer}>
                        <TextInput
                            style={[styles.input, styles.birthdateInput]}
                            placeholder="Día"
                            placeholderTextColor="#aaa"
                            keyboardType="numeric"
                            value={nacimientoDia}
                            onChangeText={setDay}
                            maxLength={2}
                        />
                        <TextInput
                            style={[styles.input, styles.birthdateInput]}
                            placeholder="Mes"
                            placeholderTextColor="#aaa"
                            keyboardType="numeric"
                            value={nacimientoMes}
                            onChangeText={setMonth}
                            maxLength={2}
                        />
                        <TextInput
                            style={[styles.input, styles.birthdateInput]}
                            placeholder="Año"
                            placeholderTextColor="#aaa"
                            keyboardType="numeric"
                            value={nacimientoAnio}
                            onChangeText={setYear}
                            maxLength={4}
                        />
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="Correo electrónico"
                        placeholderTextColor="#aaa"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={[styles.input, { paddingRight: 40 }]}
                            placeholder="Crea una contraseña segura"
                            placeholderTextColor="#aaa"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                        />
                        <TouchableOpacity
                            style={styles.showPasswordButton}
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            <Ionicons
                                name={showPassword ? 'eye-off' : 'eye'}
                                size={24}
                                color="gray"
                            />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSignUp}
                    >
                        <Text style={styles.buttonText}>Registrarme</Text>
                    </TouchableOpacity>
                </View>
            )}

            {errorMessage !== '' && (
                <Text style={styles.errorText}>{errorMessage}</Text>
            )}

            <TouchableOpacity
                onPress={() => {
                    setIsLogin(!isLogin);
                    setErrorMessage('');
                }}
            >
                <Text style={styles.switchText}>
                    {isLogin
                        ? '¿No tienes cuenta? Regístrate aquí'
                        : '¿Ya tienes cuenta? Inicia sesión aquí'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default LoginScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    logo: {
        width: 120,
        height: 120,
        alignSelf: 'center',
        marginBottom: 30,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        color: '#555',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    passwordContainer: {
        marginBottom: 15,
        justifyContent: 'center',
    },
    showPasswordButton: {
        position: 'absolute',
        right: 10,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'teal',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 10,
    },
    switchText: {
        marginTop: 10,
        textAlign: 'center',
        color: 'teal',
        textDecorationLine: 'underline',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    birthdateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    birthdateInput: {
        flex: 1,
        marginHorizontal: 5,
    },
});

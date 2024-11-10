import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import loginScreenStyles from "../styles/loginStyles";

interface LoginScreenProps {
    onClose: () => void;
    onLoginSuccess: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onClose, onLoginSuccess }) => {
    const [edad, setEdad] = useState("");
    const [email, setEmail] = useState("");
    const [isLogin, setIsLogin] = useState(false);
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const handleLogin = () => {
        console.log("Login with:", email, password);
        onLoginSuccess();
        onClose();
    };

    const handleSignUp = () => {
        console.log("Sign up with:", username, edad, email, password);
    };

    return (
        <View style={loginScreenStyles.container}>
            {isLogin ? (
                <View>
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
                        <Button title="Iniciar sesión" onPress={handleLogin} />
                    </View>
                </View>
            ) : (
                <View>
                    <Text style={loginScreenStyles.title}>Necesitas una cuenta para continuar</Text>
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
                        placeholder="Edad"
                        placeholderTextColor="#aaa"
                        value={edad}
                        onChangeText={setEdad}
                        keyboardType="numeric"
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
                title={isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
                onPress={() => setIsLogin(!isLogin)}
            />
        </View>
    );
};

export default LoginScreen;
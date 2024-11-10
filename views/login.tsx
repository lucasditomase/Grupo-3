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
            Alert.alert('Success', 'You have logged in successfully!');
            setEmail('');
            setPassword('');
            onLoginSuccess();
        } else {
            Alert.alert('Error', 'Invalid email or password.');
        }
    };

    return (
        <View style={loginScreenStyles.container}>
            <Text style={loginScreenStyles.title}>Login</Text>
            <TextInput
                style={loginScreenStyles.input}
                placeholder="Email"
                placeholderTextColor="#aaa"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={loginScreenStyles.input}
                placeholder="Password"
                placeholderTextColor="#aaa"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
            />
            <View style={loginScreenStyles.buttonContainer}>
                <Button title="Login" onPress={handleLogin} />
                <Button title="Cancel" onPress={onClose} color="red" />
            </View>
        </View>
    );
};

export default LoginScreen;
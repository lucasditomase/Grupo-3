import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { AuthContext } from './context/AuthContext';

// Define the shape of the API response
interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    nombre: string;
    apellido: string;
  };
}

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    console.log('Bandera')
    if (!email || !password) {
      alert("Error");
      return;
    }

    try {
      // Specify that response.data will have type AuthResponse
      const response = await axios.post<AuthResponse>('http://localhost:3000/login', {
        email,
        password,
      });

      const { token, user } = response.data;

      // Log in the user using AuthContext
      login(token, user);

      Alert.alert("Success", "Login successful!");
      router.push('/(tabs)');
    } catch (error: any) {
      console.error("Login Error:", error);
      const errorMessage = error.response?.data?.error || "Login failed.";
      Alert.alert("Error", errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Log In" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
    color: '#00796b',
  },
  input: {
    height: 50,
    borderColor: '#004d40',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
  },
});

export default Login;

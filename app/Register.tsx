import React, { useState, useContext } from 'react';
import { Text, View, StyleSheet, TextInput, Button, Alert } from 'react-native';
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

const RegistrarseScreen = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [edad, setEdad] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();
  const { login } = useContext(AuthContext);

  const handleRegister = async () => {
    if (!nombre || !apellido || !edad || !email || !password) {
      alert("Please fill all fields.");
      return;
    }

    try {
      // Specify that response.data will have type AuthResponse
      const response = await axios.post<AuthResponse>('http://localhost:3000/register', {
        nombre,
        apellido,
        edad: parseInt(edad),
        email,
        password,
      });

      const { token, user } = response.data;

      // Log in the user using AuthContext
      login(token, user);

      Alert.alert("Success", "Registration successful!");
      router.push('/(tabs)');
    } catch (error: any) {
      console.error("Registration Error:", error);
      const errorMessage = error.response?.data?.error || "Registration failed.";
      Alert.alert("Error", errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrarse</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Nombre:</Text>
        <TextInput
          style={styles.value}
          value={nombre}
          onChangeText={setNombre}
          placeholder="Nombre"
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Apellido:</Text>
        <TextInput
          style={styles.value}
          value={apellido}
          onChangeText={setApellido}
          placeholder="Apellido"
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Edad:</Text>
        <TextInput
          style={styles.value}
          value={edad}
          onChangeText={setEdad}
          placeholder="Edad"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.value}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Contraseña:</Text>
        <TextInput
          style={styles.value}
          value={password}
          onChangeText={setPassword}
          placeholder="Contraseña"
          secureTextEntry
        />
      </View>
      <Button title="Registrarse" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#00796b',
  },
  infoContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#00796b',
  },
  value: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#004d40',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#ffffff',
  },
});

export default RegistrarseScreen;

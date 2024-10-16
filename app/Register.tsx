import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';

const RegistrarseScreen = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [edad, setEdad] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        
        console.log('User registered:', { nombre, apellido, edad, email, password });
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
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#00796b',
    },
    infoContainer: {
        flexDirection: 'row',
        marginBottom: 15,
        padding: 10,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        width: 120,
        color: '#004d40',
    },
    value: {
        fontSize: 18,
        color: '#004d40',
        flex: 1,
    }
});

export default RegistrarseScreen;
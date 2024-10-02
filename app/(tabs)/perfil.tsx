import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

const PerfilScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Perfil</Text>
            <Image 
                source={require('../../assets/images/user.png')} 
                style={styles.profileImage} 
            />
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Nombre:</Text>
                <Text style={styles.value}>Juan</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Apellido:</Text>
                <Text style={styles.value}>Pérez</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Edad:</Text>
                <Text style={styles.value}>30</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>juan.perez@email.com</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        //backgroundColor: '#e0f7fa',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center',
        marginBottom: 20,
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
    }
});

export default PerfilScreen;

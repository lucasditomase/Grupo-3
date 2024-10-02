import React from "react";
import { Text, View, StyleSheet, ScrollView, Image, Pressable } from "react-native";
import { Link } from 'expo-router';
import { AsyncStorage } from 'react-native';

const HabitosScreen = () => {

    const onPressButton = () => {
        storeData('Task', 'Tarea')
        retrieveData('Task')
    }

    const storeData = async (key: String, value: any) => {
        try {
            await AsyncStorage.setItem(key, value);
        }
        catch (error) {
            // Error saving data
        }
    };

    const retrieveData = async (key: String) => {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                // We have data!!
                console.log(value);
                //alert(value)
            }
        }
        catch (error) {
            // Error retrieving data
        }
    };


    return (
        <View style={{ flex: 1 }}>
            <Pressable style={styles.button} onPress={onPressButton}>
                <Text style={styles.buttonText}>Agregar nuevo habito +</Text>
            </Pressable>

            <ScrollView>
                <View style={[styles.habitosContainer, { flexDirection: 'row' }]}>
                    <View style={styles.habitosIconContainer}>
                        <Image style={styles.habitosIconMedidas}
                            source={require('../../assets/images/dumbbell-fitness.png')}
                        />
                    </View>
                    <View style={styles.habitosTextosContainer}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Gimnasio</Text>
                        <Text style={{ fontSize: 16 }}>Frecuencia: Diario</Text>
                    </View>
                </View>
                <View style={[styles.habitosContainer, { flexDirection: 'row' }]}>
                    <View style={styles.habitosIconContainer}>
                        <Image style={styles.habitosIconMedidas}
                            source={require('../../assets/images/meditation.png')}
                        />
                    </View>
                    <View style={styles.habitosTextosContainer}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Meditacion</Text>
                        <Text style={{ fontSize: 16 }}>Frecuencia: Diario</Text>
                    </View>
                </View>
                <View style={[styles.habitosContainer, { flexDirection: 'row' }]}>
                    <View style={styles.habitosIconContainer}>
                        <Image style={styles.habitosIconMedidas}
                            source={require('../../assets/images/coins.png')}
                        />
                    </View>
                    <View style={styles.habitosTextosContainer}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Pagar servicios</Text>
                        <Text style={{ fontSize: 16 }}>Frecuencia: Mensual</Text>
                    </View>
                </View>
                <View style={[styles.habitosContainer, { flexDirection: 'row' }]}>
                    <View style={styles.habitosIconContainer}>
                        <Image style={styles.habitosIconMedidas}
                            source={require('../../assets/images/notebook-alt.png')}
                        />
                    </View>
                    <View style={styles.habitosTextosContainer}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Revisar mi agenda para la semana</Text>
                        <Text style={{ fontSize: 16 }}>Frecuencia: Semanal</Text>
                    </View>
                </View>
                <View style={[styles.habitosContainer, { flexDirection: 'row' }]}>
                    <View style={styles.habitosIconContainer}>
                        <Image style={styles.habitosIconMedidas}
                            source={require('../../assets/images/glass.png')}
                        />
                    </View>
                    <View style={styles.habitosTextosContainer}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Tomar 2 litros de agua</Text>
                        <Text style={{ fontSize: 16 }}>Frecuencia: Diario</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

//Despues lo definimos mejor viendo alguna paleta de colores
const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black'
    },
    header: {
        backgroundColor: 'gray',
        padding: 30,
        paddingTop: 50,
        alignItems: 'center',
    },
    headerTitle: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
    },
    habitosContainer: {
        flex: 1,
        height: 100,
        borderWidth: 1,
        borderColor: 'black',
    },
    habitosIconContainer: {
        flex: 1,
        backgroundColor: 'lightgray',
        justifyContent: 'center',
        alignItems: 'center',
        height: 98, //Cantidad justa para que se vea el borde
    },
    habitosIconMedidas: {
        width: 85,
        height: 85,
    },
    habitosTextosContainer: {
        flex: 2,
        backgroundColor: 'white', // Puedes mantener el fondo rojo para que el texto resalte
        justifyContent: 'center',
        paddingLeft: 10,
    },
    habitosFilter: {
        width: 30,
        height: 30,
        position: 'absolute',
        right: 50,
        top: '180%',
        transform: [{ translateY: -15 }],
    },
    buttonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});


export default HabitosScreen
import React from "react";
import { Text, View, StyleSheet, ScrollView, Image } from "react-native";

const HabitosScreen = () => {
    return (
        <View style={{ flex: 1 }}>
            <View style={{...styles.header, flexDirection: 'row'}}>
                <Text style={styles.headerTitle}>Hábitos</Text>
                <Image style={styles.habitosFilter}  
                                source={require('../../assets/images/bars-filter.png')} 
                            />
            </View>
            
            <ScrollView>
                <View style={[styles.habitosContainer, {flexDirection: 'row'}]}>
                    <View style={styles.habitosIconContainer}>
                        <Image style={styles.habitosIconMedidas}  
                                source={require('../../assets/images/dumbbell-fitness.png')} 
                            />
                    </View>
                    <View style={styles.habitosTextosContainer}>
                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Gimnasio</Text>
                        <Text style={{fontSize: 16}}>Frecuencia: Diario</Text>
                    </View>
                </View>
                <View style={[styles.habitosContainer, {flexDirection: 'row'}]}>
                    <View style={styles.habitosIconContainer}>
                        <Image style={styles.habitosIconMedidas}  
                                source={require('../../assets/images/meditation.png')} 
                            />
                    </View>
                    <View style={styles.habitosTextosContainer}>
                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Meditacion</Text>
                        <Text style={{fontSize: 16}}>Frecuencia: Diario</Text>
                    </View>
                </View>
                <View style={[styles.habitosContainer, {flexDirection: 'row'}]}>
                    <View style={styles.habitosIconContainer}>
                        <Image style={styles.habitosIconMedidas}  
                                source={require('../../assets/images/coins.png')} 
                            />
                    </View>
                    <View style={styles.habitosTextosContainer}>
                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Pagar servicios</Text>
                        <Text style={{fontSize: 16}}>Frecuencia: Mensual</Text>
                    </View>
                </View>
                <View style={[styles.habitosContainer, {flexDirection: 'row'}]}>
                    <View style={styles.habitosIconContainer}>
                        <Image style={styles.habitosIconMedidas}  
                                source={require('../../assets/images/notebook-alt.png')} 
                            />
                    </View>
                    <View style={styles.habitosTextosContainer}>
                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Revisar mi agenda para la semana</Text>
                        <Text style={{fontSize: 16}}>Frecuencia: Semanal</Text>
                    </View>
                </View>
                <View style={[styles.habitosContainer, {flexDirection: 'row'}]}>
                    <View style={styles.habitosIconContainer}>
                        <Image style={styles.habitosIconMedidas}  
                                source={require('../../assets/images/glass.png')} 
                            />
                    </View>
                    <View style={styles.habitosTextosContainer}>
                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Tomar 2 litros de agua</Text>
                        <Text style={{fontSize: 16}}>Frecuencia: Diario</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

//Despues lo definimos mejor viendo alguna palera de colores
const styles = StyleSheet.create({
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
        borderWidth: 1, // Agrega un borde al container
        borderColor: 'black', // Color del borde
    },
    habitosIconContainer: {
        flex: 1,
        backgroundColor: 'lightgray', // Puedes mantener el fondo rojo para que el icono resalte
        justifyContent: 'center',
        alignItems: 'center',
        height: 98, // Ajusta la altura según tus necesidades
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
});


export default HabitosScreen
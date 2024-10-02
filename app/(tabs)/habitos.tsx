import React, { useState } from "react";
import { Text, View, StyleSheet, ScrollView, Image, Pressable, Modal, Alert, TextInput } from "react-native";
import { Link } from 'expo-router';
//import { AsyncStorage } from 'react-native';
//import AsyncStorage from '@react-native-community/async-storage';


const HabitosScreen = () => {

    // const [habito, setPerson] = useState({
    //     name: '',
    // });

    // const habito = {
    //     id: 0,
    //     nombre: ''
    // }

    const generateRandomNumber = () => {
        const min = 1;
        const max = 100;
        const randomNumber =
            Math.floor(Math.random() * (max - min + 1)) + min;
        //this.setState({ randomNumber });
        return randomNumber
    };

    const onPressButton = () => {
        setModalVisible(true)
        //storeData('Task', 'Tarea')
        //retrieveData('Task')
    }

    // x

    const [nombre, onChangeNombre] = React.useState('Nombre del habito');
    const [frecuencia, onChangeFrecuencia] = React.useState('Frecuencia');

    const [modalVisible, setModalVisible] = useState(false);


    //const [habitos, setHabitos] = useState([]);
    // const habitos = useState({
    //     id: 0,
    //     nombre: ''
    // });


    // const habitos = [
    //     {
    //         id: 1,
    //         nombre: 'a'
    //     },
    //     {
    //         id: 2,
    //         nombre: 'b'
    //     },
    //     {
    //         id: 3,
    //         nombre: 'c'
    //     }
    // ]

    const [habitos, setTheArray] = useState([{
        id: 0, nombre: ''
    }])

    // const [habitos] = useState({
    //     id: 0,
    //     nombre: ''
    // });

    //let habitos: { nombre: string; id: number; }[] = []

    return (
        <View style={{ flex: 1 }}>
            <Pressable style={styles.button} onPress={onPressButton}>
                <Text style={styles.buttonText}>Agregar nuevo habito +</Text>
            </Pressable>




            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        <TextInput
                            editable
                            multiline
                            numberOfLines={4}
                            onChangeText={text => onChangeNombre(text)}
                            value={nombre}
                            style={{
                                padding: 10,
                                width: 500,
                                borderColor: "gray",
                                borderWidth: 1,
                            }}
                        />




                        <Pressable
                            style={[
                                styles.button,
                                styles.buttonClose
                            ]}
                            onPress={() => {
                                setModalVisible(!modalVisible)
                                //habito.name = nombre
                                //alert(habito.name)

                                //storeData('Task', 'Tarea')
                                //const valor = retrieveData('Task')
                                //alert(valor)


                                const habito = {
                                    id: generateRandomNumber(),
                                    nombre: nombre
                                }

                                setTheArray([...habitos, habito]);

                                //habitos.push(habito)

                                //alert(habito.nombre)


                                // setHabitos([
                                //     ...habitos,

                                //     {
                                //         nombre: nombre,
                                //         id: 439857934857
                                //     }

                                // ]);

                                //alert(habitos[0].nombre)
                            }}>
                            <Text style={styles.textStyle}>Guardar</Text>
                        </Pressable>

                    </View>
                </View>
            </Modal >





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



                <View>
                    <ul>
                        {
                            habitos.filter(item => item.id != 0).map(habito => (
                                <li key={habito.id}>{habito.nombre}</li>
                            ))
                        }
                    </ul>
                </View>



            </ScrollView>
        </View >
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




    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: 900,
        height: 600
    },

    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});


export default HabitosScreen
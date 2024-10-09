import React, { useState } from "react";
import {
    Text, View, StyleSheet, ScrollView,
    Image, Pressable, Modal, Alert, TextInput, Button
} from "react-native";

import {
    Picker
} from "@react-native-picker/picker";



import { Link } from 'expo-router';

import ProgressCircle from './ProgressCircle';

const HabitosScreen = () => {

    const onPressButton = () => {
        setModalVisible(true)
    }

    const [nombre, onChangeNombre] = React.useState('Nombre del habito');
    const [frecuencia, onChangeFrecuencia] = React.useState('Frecuencia');

    const [modalVisible, setModalVisible] = useState(false);


    //const [modalVisible, setModalVisible] = useState(false);
    const [inputText, setInputText] = useState('');

    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };


    const [pokemon, setPokemon] = useState();

    const pokemons = ['Gimnasio', 'Meditacion', 'Pagos', 'Agenda', 'Alimentos'];

    const handleValueChange = (itemValue, itemIndex) => setPokemon(itemValue)

    return (
        <View style={{ flex: 1 }}>

            <View>
                <Pressable style={styles.button} onPress={onPressButton}>
                    <Text style={styles.buttonText}>Agregar nuevo habito</Text>
                </Pressable>
            </View>





            {/* <Modal
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
                                //width: 500,
                                borderColor: "teal",
                                borderRadius: 10,
                                borderWidth: 1,
                            }}
                        />




                        <Pressable
                            style={[
                                styles.button,
                                styles.buttonClose
                            ]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Guardar</Text>
                        </Pressable>

                    </View>
                </View>
            </Modal > */}

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleCloseModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>

                        <Text style={styles.label}>Selecciona nombre</Text>

                        <TextInput
                            style={styles.input}
                            value={inputText}
                            onChangeText={setInputText}
                            placeholder="Nombre del habito"
                        />

                        <Text style={styles.label}>Selecciona categoria</Text>

                        <Picker
                            selectedValue={pokemon}
                            onValueChange={handleValueChange}>
                            {
                                pokemons.map(pokemon => <Picker.Item key={pokemon} label={pokemon} value={pokemon} />)
                            }
                        </Picker>


                        <Button title="Guardar" onPress={handleCloseModal} />
                    </View>
                </View>
            </Modal>





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
        </View >
    )
}

//Despues lo definimos mejor viendo alguna paleta de colores
const styles = StyleSheet.create({
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        //paddingHorizontal: 5,
        marginHorizontal: 100,
        marginVertical: 20,
        borderRadius: 10,
        //elevation: 5,
        backgroundColor: 'teal'
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
    modalView2: {
        //margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        //padding: 35,
        //alignItems: 'center',
        // shadowColor: '#000',
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 4,
        // elevation: 5,
        //width: 400,
        //height: 600
    },

    buttonOpen: {
        backgroundColor: 'teal',
    },
    buttonClose: {
        backgroundColor: 'teal',
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





    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
    },
    modalView: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
    },


    pickerStyles: {
        width: '70%',
        backgroundColor: 'gray',
        color: 'white'
    }

});


export default HabitosScreen

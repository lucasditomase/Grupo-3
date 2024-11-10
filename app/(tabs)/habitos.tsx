import React, { useState } from "react";
import habitosScreenStyles from '../../styles/habitoStyles';
import modalStyles from '../../styles/modalStyles';
import themeDark from '../../themes/themeDark';
import themeLight from '../../themes/themeLight';
import { Button, Image, Modal, Pressable, ScrollView, Text, TextInput, View, useColorScheme } from "react-native";
import { Picker } from "@react-native-picker/picker";

const HabitosScreen = () => {
    const [inputText, setInputText] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [pokemon, setPokemon] = useState();
    const colorScheme = useColorScheme();
    const handleValueChange = (itemValue: any, itemIndex: any) => setPokemon(itemValue)
    const isDarkMode = colorScheme === 'dark';
    const pokemons = ['Gimnasio', 'Meditacion', 'Pagos', 'Agenda', 'Alimentos'];

    const handleCloseModal = () => {
        setModalVisible(false);
    };
    const onPressButton = () => {
        setModalVisible(true)
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={[isDarkMode ? themeDark.darkBackground : themeLight.lightBackground]}>
                <Pressable style={habitosScreenStyles.button} onPress={onPressButton}>
                    <Text style={habitosScreenStyles.buttonText}>Agregar nuevo habito</Text>
                </Pressable>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleCloseModal}>
                <View style={modalStyles.modalContainer}>
                    <View style={modalStyles.modalView}>
                        <Text style={modalStyles.label}>Selecciona nombre</Text>
                        <TextInput
                            style={modalStyles.input}
                            value={inputText}
                            onChangeText={setInputText}
                            placeholder="Nombre del habito" />
                        <Text style={modalStyles.label}>Selecciona categoria</Text>
                        <Picker
                            selectedValue={pokemon}
                            onValueChange={handleValueChange}>
                            {pokemons.map(pokemon => <Picker.Item key={pokemon} label={pokemon} value={pokemon} />)}
                        </Picker>
                        <Button title="Guardar" onPress={handleCloseModal} />
                    </View>
                </View>
            </Modal>
            <ScrollView style={[isDarkMode ? themeDark.darkBackground : themeLight.lightBackground]}>
                <View style={[habitosScreenStyles.habitosContainer, { flexDirection: 'row' }]}>
                    <View style={habitosScreenStyles.habitosIconContainer}>
                        <Image style={habitosScreenStyles.habitosIconMedidas}
                            source={require('../../assets/images/dumbbell-fitness.png')} />
                    </View>
                    <View style={habitosScreenStyles.habitosTextosContainer}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Gimnasio</Text>
                        <Text style={{ fontSize: 16 }}>Frecuencia: Diario</Text>
                    </View>
                </View>
                <View style={[habitosScreenStyles.habitosContainer, { flexDirection: 'row' }]}>
                    <View style={habitosScreenStyles.habitosIconContainer}>
                        <Image style={habitosScreenStyles.habitosIconMedidas}
                            source={require('../../assets/images/meditation.png')} />
                    </View>
                    <View style={habitosScreenStyles.habitosTextosContainer}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Meditacion</Text>
                        <Text style={{ fontSize: 16 }}>Frecuencia: Diario</Text>
                    </View>
                </View>
                <View style={[habitosScreenStyles.habitosContainer, { flexDirection: 'row' }]}>
                    <View style={habitosScreenStyles.habitosIconContainer}>
                        <Image style={habitosScreenStyles.habitosIconMedidas}
                            source={require('../../assets/images/coins.png')} />
                    </View>
                    <View style={habitosScreenStyles.habitosTextosContainer}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Pagar servicios</Text>
                        <Text style={{ fontSize: 16 }}>Frecuencia: Mensual</Text>
                    </View>
                </View>
                <View style={[habitosScreenStyles.habitosContainer, { flexDirection: 'row' }]}>
                    <View style={habitosScreenStyles.habitosIconContainer}>
                        <Image style={habitosScreenStyles.habitosIconMedidas}
                            source={require('../../assets/images/notebook-alt.png')} />
                    </View>
                    <View style={habitosScreenStyles.habitosTextosContainer}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Revisar mi agenda para la semana</Text>
                        <Text style={{ fontSize: 16 }}>Frecuencia: Semanal</Text>
                    </View>
                </View>
                <View style={[habitosScreenStyles.habitosContainer, { flexDirection: 'row' }]}>
                    <View style={habitosScreenStyles.habitosIconContainer}>
                        <Image style={habitosScreenStyles.habitosIconMedidas}
                            source={require('../../assets/images/glass.png')} />
                    </View>
                    <View style={habitosScreenStyles.habitosTextosContainer}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Tomar 2 litros de agua</Text>
                        <Text style={{ fontSize: 16 }}>Frecuencia: Diario</Text>
                    </View>
                </View>
            </ScrollView>
        </View >
    )
}

export default HabitosScreen

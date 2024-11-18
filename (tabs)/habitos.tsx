import React, { useState } from 'react';
import habitosScreenStyles from '../../components/styles/habitoStyles';
import modalStyles from '../../components/styles/modalStyles';
import themeDark from '../../components/themes/themeDark';
import themeLight from '../../components/themes/themeLight';
import { Button,
    Image,
    Modal,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
    useColorScheme,
    StyleSheet,
} from 'react-native';

import { Picker } from '@react-native-picker/picker';

import { SwipeListView } from 'react-native-swipe-list-view';

import Icon from 'react-native-vector-icons/Ionicons';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

type HabitoItem = {
    key: string;
    text: string;
    category: string;
    frequency: string
    icon: string;
};

const HabitosScreen = () => {
    const [inputText, setInputText] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [pokemon, setPokemon] = useState();
    const colorScheme = useColorScheme();
    const handleValueChange = (itemValue: any, itemIndex: any) =>
        setPokemon(itemValue);
    const isDarkMode = colorScheme === 'dark';
    const pokemons = ['Gimnasio', 'Meditacion', 'Pagos', 'Agenda', 'Alimentos'];

    const handleCloseModal = () => {
        setModalVisible(false);
    };
    const onPressButton = () => {
        setModalVisible(true);
    };

    const data = [
        { key: '1', text: 'Llamar a mi mama', category: 'Relación', frequency: 'Diario', icon: 'favorite' },
        { key: '2', text: 'Salir a correr', category: 'Deporte', frequency: 'Semanal', icon: 'directions-run' },
    ];

    const renderItem = (data: { item: HabitoItem }) => (
        <View
            style={[
                habitosScreenStyles.habitosContainer,
                { flexDirection: 'row' },
            ]}
        >
            {}
            <View style={habitosScreenStyles.habitosIconContainer}>
                <MaterialIcons
                    name={data.item.icon}
                    size={50} 
                    color="black"
                />
            </View>
    
            {}
            <View style={habitosScreenStyles.habitosTextosContainer}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                    {data.item.text}
                </Text>
                <Text style={{ fontSize: 16 }}>
                    Frecuencia: {data.item.frequency}
                </Text>
            </View>
        </View>
    );
    


    const renderHiddenItem = () => (
        <View style={styles.rowBack}>
            <Text style={styles.backText}>Action 1</Text>
            <Text style={styles.backText}>Action 2</Text>
        </View>
    );

    const [selectedPart, setSelectedPart] = useState('Semanal');

    const handlePartClick = (part: string) => {
        setSelectedPart(part);
    };

    return (
        <View style={{ flex: 1 }}>
            <View
                style={[
                    isDarkMode
                        ? themeDark.darkBackground
                        : themeLight.lightBackground,
                ]}
            >
                <Pressable
                    style={habitosScreenStyles.button}
                    onPress={onPressButton}
                >
                    <Text style={habitosScreenStyles.buttonText}>
                        Agregar nuevo habito
                    </Text>
                </Pressable>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleCloseModal}
            >
                <View style={modalStyles.modalContainer}>
                    <View style={modalStyles.modalView}>
                        <Text style={modalStyles.label}>Selecciona nombre</Text>
                        <TextInput
                            style={modalStyles.input}
                            value={inputText}
                            onChangeText={setInputText}
                            placeholder="Nombre del habito"
                        />
                        <Text style={modalStyles.label}>
                            Selecciona categoria
                        </Text>
                        <Picker
                            selectedValue={pokemon}
                            onValueChange={handleValueChange}
                        >
                            {pokemons.map((pokemon) => (
                                <Picker.Item
                                    key={pokemon}
                                    label={pokemon}
                                    value={pokemon}
                                />
                            ))}
                        </Picker>
                        <Text style={modalStyles.label}>Seleccione frecuencia</Text>
                        <View style={styles.buttonContainer}>
                            <Pressable
                                style={[styles.buttonPart, selectedPart === 'Diario' && styles.selected]}
                                onPress={() => handlePartClick('Diario')}
                            >
                                 <Text style={{ textAlign: 'center' }}>Diario</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.buttonPart, selectedPart === 'Semanal' && styles.selected]}
                                onPress={() => handlePartClick('Semanal')}
                            >
                                <Text style={{ textAlign: 'center' }}>Semanal</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.buttonPart, selectedPart === 'Mensual' && styles.selected]}
                                onPress={() => handlePartClick('Mensual')}
                            >
                                 <Text style={{ textAlign: 'center' }}>Mensual</Text>
                            </Pressable>
                        </View>
                        <Button title="Guardar" onPress={handleCloseModal} />
                    </View>
                </View>
            </Modal>
            <SwipeListView
                data={data}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                leftOpenValue={75}
                rightOpenValue={-75}
            />
        </View>
    );
};
export default HabitosScreen;


const styles = StyleSheet.create({
    rowFront: {
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        padding: 20,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: 'red',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backText: {
        color: 'white',
    },
    backButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginHorizontal: 5,
        padding: 10,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 5,

    },buttonContainer: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    buttonPart: {
        flex: 1,
        padding: 10,
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
    },
    selected: {
        backgroundColor: '#0E6E6D',
        color: 'white',
    },

});
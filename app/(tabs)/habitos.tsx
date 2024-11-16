import React, { useState } from 'react';
import habitosScreenStyles from '../../styles/habitoStyles';
import modalStyles from '../../styles/modalStyles';
import themeDark from '../../themes/themeDark';
import themeLight from '../../themes/themeLight';
import {
    Button,
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

type ListItem = {
    key: string;
    text: string;
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
        { key: '1', text: 'Item 1' },
        { key: '2', text: 'Item 2' },
    ];

    const renderItem = (data: { item: ListItem }) => (
        <View style={styles.rowFront}>
            <Text>{data.item.text}</Text>
        </View>
    );


    const renderHiddenItem = () => (
        <View style={styles.rowBack}>
            <Text style={styles.backText}>Action 1</Text>
            <Text style={styles.backText}>Action 2</Text>
        </View>
    );



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
            <ScrollView
                style={[
                    isDarkMode
                        ? themeDark.darkBackground
                        : themeLight.lightBackground,
                ]}
            >
                <View
                    style={[
                        habitosScreenStyles.habitosContainer,
                        { flexDirection: 'row' },
                    ]}
                >
                    <View style={habitosScreenStyles.habitosIconContainer}>
                        <Image
                            style={habitosScreenStyles.habitosIconMedidas}
                            source={require('../../assets/images/dumbbell-fitness.png')}
                        />
                    </View>
                    <View style={habitosScreenStyles.habitosTextosContainer}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                            Gimnasio
                        </Text>
                        <Text style={{ fontSize: 16 }}>Frecuencia: Diario</Text>
                    </View>
                </View>
                <View
                    style={[
                        habitosScreenStyles.habitosContainer,
                        { flexDirection: 'row' },
                    ]}
                >
                    <View style={habitosScreenStyles.habitosIconContainer}>
                        <Image
                            style={habitosScreenStyles.habitosIconMedidas}
                            source={require('../../assets/images/meditation.png')}
                        />
                    </View>
                    <View style={habitosScreenStyles.habitosTextosContainer}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                            Meditacion
                        </Text>
                        <Text style={{ fontSize: 16 }}>Frecuencia: Diario</Text>
                    </View>
                </View>
                <View
                    style={[
                        habitosScreenStyles.habitosContainer,
                        { flexDirection: 'row' },
                    ]}
                >
                    <View style={habitosScreenStyles.habitosIconContainer}>
                        <Image
                            style={habitosScreenStyles.habitosIconMedidas}
                            source={require('../../assets/images/coins.png')}
                        />
                    </View>
                    <View style={habitosScreenStyles.habitosTextosContainer}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                            Pagar servicios
                        </Text>
                        <Text style={{ fontSize: 16 }}>
                            Frecuencia: Mensual
                        </Text>
                    </View>
                </View>
                <View
                    style={[
                        habitosScreenStyles.habitosContainer,
                        { flexDirection: 'row' },
                    ]}
                >
                    <View style={habitosScreenStyles.habitosIconContainer}>
                        <Image
                            style={habitosScreenStyles.habitosIconMedidas}
                            source={require('../../assets/images/notebook-alt.png')}
                        />
                    </View>
                    <View style={habitosScreenStyles.habitosTextosContainer}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                            Revisar mi agenda para la semana
                        </Text>
                        <Text style={{ fontSize: 16 }}>
                            Frecuencia: Semanal
                        </Text>
                    </View>
                </View>
                <View
                    style={[
                        habitosScreenStyles.habitosContainer,
                        { flexDirection: 'row' },
                    ]}
                >
                    <View style={habitosScreenStyles.habitosIconContainer}>
                        <Image
                            style={habitosScreenStyles.habitosIconMedidas}
                            source={require('../../assets/images/glass.png')}
                        />
                    </View>
                    <View style={habitosScreenStyles.habitosTextosContainer}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                            Tomar 2 litros de agua
                        </Text>
                        <Text style={{ fontSize: 16 }}>Frecuencia: Diario</Text>
                    </View>
                </View>
            </ScrollView>
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
});
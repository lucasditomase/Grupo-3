import React, { useRef, useState, useEffect } from 'react';
import {
    Alert,
    Button,
    Modal,
    Pressable,
    Text,
    TextInput,
    View,
    useColorScheme,
} from 'react-native';

// Styles
import habitosScreenStyles from '../../components/styles/habitoStyles';
import modalStyles from '../../components/styles/modalStyles';

// Themes
import themeDark from '../../components/themes/themeDark';
import themeLight from '../../components/themes/themeLight';

// Components
import { Picker } from '@react-native-picker/picker';
import { SwipeListView } from 'react-native-swipe-list-view';

// Icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Navigation
import { router } from 'expo-router'; // Assuming expo-router is used

// Context
import { useGlobalContext } from '../../components/contexts/useGlobalContext';

// Types
type HabitoItem = {
    key: string;
    text: string;
    category: string;
    frequency: string;
    icon: string;
};

/**
 * Screen component for managing and displaying habits.
 */
const HabitosScreen = () => {
    const [inputText, setInputText] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<
        string | undefined
    >();
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';
    const swipeTriggered = useRef<{ [key: string]: boolean }>({}); // Keeps track of whether a swipe action has been triggered for each item
    const { user } = useGlobalContext(); // Get the user context

    const pokemons = ['Gimnasio', 'Meditación', 'Pagos', 'Agenda', 'Alimentos'];

    // Sample data for the SwipeListView
    const data: HabitoItem[] = [
        {
            key: '1',
            text: 'Llamar a mi mamá',
            category: 'Relación',
            frequency: 'Diario',
            icon: 'favorite',
        },
        {
            key: '2',
            text: 'Salir a correr',
            category: 'Deporte',
            frequency: 'Semanal',
            icon: 'directions-run',
        },
    ];

    // Redirect to ProgresoScreen if user is not set
    useEffect(() => {
        if (!user) {
            router.replace('/');
        }
    }, [user]);

    const markAsCompleted = (item: HabitoItem) => {
        Alert.alert(`Marked "${item.text}" as completed`);
    };

    const deleteHabit = (item: HabitoItem) => {
        Alert.alert(
            'Confirm Delete',
            `Are you sure you want to delete "${item.text}"?`,
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: () => Alert.alert(`Deleted "${item.text}"`),
                    style: 'destructive',
                },
            ],
            { cancelable: true }
        );
    };

    const handleLongPress = (item: HabitoItem) => {
        Alert.alert(
            'Options',
            `Choose an action for "${item.text}"`,
            [
                {
                    text: 'Mark as Completed',
                    onPress: () => markAsCompleted(item),
                },
                {
                    text: 'Delete',
                    onPress: () => deleteHabit(item),
                    style: 'destructive',
                },
                { text: 'Cancel', style: 'cancel' },
            ],
            { cancelable: true }
        );
    };

    const [selectedPart, setSelectedPart] = useState('Diario');

    const handlePartClick = (part: string) => {
        setSelectedPart(part);
    };

    const renderItem = ({ item }: { item: HabitoItem }) => (
        <Pressable onLongPress={() => handleLongPress(item)}>
            <View
                style={[
                    habitosScreenStyles.habitosContainer,
                    { flexDirection: 'row' },
                ]}
            >
                <View style={habitosScreenStyles.habitosIconContainer}>
                    <MaterialIcons name={item.icon} size={50} color="black" />
                </View>
                <View style={habitosScreenStyles.habitosTextosContainer}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                        {item.text}
                    </Text>
                    <Text style={{ fontSize: 16 }}>
                        Frecuencia: {item.frequency}
                    </Text>
                </View>
            </View>
        </Pressable>
    );

    const handleSwipeValueChange = ({
        key,
        value,
    }: {
        key: string;
        value: number;
    }) => {
        const habit = data.find((item) => item.key === key);
        if (!habit) return;

        if (swipeTriggered.current[key]) return;

        if (value > 50) {
            markAsCompleted(habit);
            swipeTriggered.current[key] = true;
        } else if (value < -50) {
            deleteHabit(habit);
            swipeTriggered.current[key] = true;
        }
    };

    const handleRowClose = (rowKey: string) => {
        swipeTriggered.current[rowKey] = false;
    };

    const renderHiddenItem = ({ item }: { item: HabitoItem }) => (
        <View style={habitosScreenStyles.rowBack}>
            <Text style={habitosScreenStyles.backText}>Complete</Text>
            <Text style={habitosScreenStyles.backText}>Delete</Text>
        </View>
    );

    const handleCloseModal = () => setModalVisible(false);

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
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={habitosScreenStyles.buttonText}>
                        Agregar nuevo hábito
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
                            placeholder="Nombre del hábito"
                        />
                        <Text style={modalStyles.label}>
                            Selecciona categoría
                        </Text>
                        <Picker
                            selectedValue={selectedCategory}
                            onValueChange={(itemValue) =>
                                setSelectedCategory(itemValue)
                            }
                        >
                            {pokemons.map((pokemon) => (
                                <Picker.Item
                                    key={pokemon}
                                    label={pokemon}
                                    value={pokemon}
                                />
                            ))}
                        </Picker>
                        <Text style={modalStyles.label}>
                            Seleccione frecuencia
                        </Text>
                        <View style={habitosScreenStyles.buttonContainer}>
                            <Pressable
                                style={[
                                    habitosScreenStyles.buttonPart,
                                    selectedPart === 'Diario' &&
                                        habitosScreenStyles.selected,
                                ]}
                                onPress={() => handlePartClick('Diario')}
                            >
                                <Text style={{ textAlign: 'center' }}>
                                    Diario
                                </Text>
                            </Pressable>
                            <Pressable
                                style={[
                                    habitosScreenStyles.buttonPart,
                                    selectedPart === 'Semanal' &&
                                        habitosScreenStyles.selected,
                                ]}
                                onPress={() => handlePartClick('Semanal')}
                            >
                                <Text style={{ textAlign: 'center' }}>
                                    Semanal
                                </Text>
                            </Pressable>
                            <Pressable
                                style={[
                                    habitosScreenStyles.buttonPart,
                                    selectedPart === 'Mensual' &&
                                        habitosScreenStyles.selected,
                                ]}
                                onPress={() => handlePartClick('Mensual')}
                            >
                                <Text style={{ textAlign: 'center' }}>
                                    Mensual
                                </Text>
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
                onSwipeValueChange={(swipeData) =>
                    handleSwipeValueChange({
                        key: swipeData.key as string,
                        value: swipeData.value,
                    })
                }
                onRowClose={(rowKey) => handleRowClose(rowKey as string)}
            />
        </View>
    );
};

export default HabitosScreen;

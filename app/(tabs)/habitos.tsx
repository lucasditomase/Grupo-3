import React, { useEffect, useRef, useState } from 'react';
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
import { router } from 'expo-router';

// Context
import { useGlobalContext } from '../../components/contexts/useGlobalContext';
import {
    habitosEnBaseDeDatos,
    crearHabitoEnBaseDeDatos,
} from '../../components/api';

// Types
type HabitoItem = {
    key?: string;
    text: string;
    category: string;
    frequency: string;
    icon?: string;
};

const HabitosScreen = () => {
    const [inputText, setInputText] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<
        string | undefined
    >();
    const [habits, setHabits] = useState<HabitoItem[]>([]);
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';
    const swipeTriggered = useRef<{ [key: string]: boolean }>({});
    const { user } = useGlobalContext(); // Include token for authentication
    const categories = [
        'SALUD',
        'DEPORTE',
        'ESTUDIO',
        'TRABAJO',
        'OCIO',
        'OTROS',
    ];

    useEffect(() => {
        if (!user) {
            router.replace('/');
        } else {
            fetchHabits();
        }
    }, [user]);

    const fetchHabits = async () => {
        const token = user?.token;
        if (token) {
            const fetchedHabits = await habitosEnBaseDeDatos(token);
            if (fetchedHabits) {
                console.log(fetchedHabits);
                setHabits(fetchedHabits);
            }
        }
    };

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
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: () => {
                        setHabits((prev) =>
                            prev.filter((habit) => habit.key !== item.key)
                        );
                        Alert.alert(`Deleted "${item.text}"`);
                    },
                    style: 'destructive',
                },
            ]
        );
    };

    const handleLongPress = (item: HabitoItem) => {
        Alert.alert('Options', `Choose an action for "${item.text}"`, [
            { text: 'Mark as Completed', onPress: () => markAsCompleted(item) },
            {
                text: 'Delete',
                onPress: () => deleteHabit(item),
                style: 'destructive',
            },
            { text: 'Cancel', style: 'cancel' },
        ]);
    };

    const [selectedFrequency, setSelectedFrequency] = useState('Diario');
    const handleFrequencyChange = (frequency: string) => {
        setSelectedFrequency(frequency);
    };

    const renderItem = ({ item }: { item: HabitoItem }) => (
        <Pressable onLongPress={() => handleLongPress(item)}>
            <View
                style={[
                    habitosScreenStyles.habitosContainer,
                    isDarkMode && {
                        backgroundColor: '#1E1E1E',
                        shadowColor: 'transparent',
                        elevation: 0,
                    },
                ]}
            >
                <View style={habitosScreenStyles.habitosIconContainer}>
                    <MaterialIcons
                        name={item.icon || 'default-icon'}
                        size={30}
                        color="teal"
                    />
                </View>
                <View style={habitosScreenStyles.habitosTextosContainer}>
                    <Text
                        style={[
                            habitosScreenStyles.habitosText,
                            isDarkMode && themeDark.primaryText,
                        ]}
                    >
                        {item.text}
                    </Text>
                    <Text
                        style={[
                            habitosScreenStyles.frequencyText,
                            isDarkMode && themeDark.secondaryText,
                        ]}
                    >
                        Frecuencia: {item.frequency}
                    </Text>
                </View>
            </View>
        </Pressable>
    );

    const renderHiddenItem = ({ item }: { item: HabitoItem }) => (
        <View style={habitosScreenStyles.rowBack}>
            <Pressable
                style={habitosScreenStyles.completeButton}
                onPress={() => markAsCompleted(item)}
            >
                <Text style={habitosScreenStyles.backText}>Completar</Text>
            </Pressable>
            <Pressable
                style={habitosScreenStyles.deleteButton}
                onPress={() => deleteHabit(item)}
            >
                <Text style={habitosScreenStyles.backText}>Eliminar</Text>
            </Pressable>
        </View>
    );

    const handleSwipeValueChange = ({
        key,
        value,
    }: {
        key: string;
        value: number;
    }) => {
        const habit = habits.find((item) => item.key === key);
        if (!habit || swipeTriggered.current[key]) return;

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

    const handleAddHabit = async () => {
        console.log('Adding habit');
        if (!inputText) {
            Alert.alert('Error', 'El nombre no puede estar vacío');
            return;
        }
        if (habits.find((habit) => habit.text === inputText)) {
            Alert.alert('Error', 'El hábito ya existe');
            return;
        }
        const newHabit: HabitoItem = {
            text: inputText,
            category: selectedCategory || 'Uncategorized',
            frequency: selectedFrequency,
        };
        const token = user?.token;
        if (!token) {
            Alert.alert('Error', 'No se ha iniciado sesión');
            return;
        }
        crearHabitoEnBaseDeDatos(token, newHabit);
        newHabit.icon = 'check-circle'; // Set a default icon
        setHabits((prev) => [...prev, newHabit]);
        setInputText('');
        setModalVisible(false);
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
                onRequestClose={() => setModalVisible(false)}
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
                            {categories.map((category) => (
                                <Picker.Item
                                    key={category}
                                    label={category}
                                    value={category}
                                />
                            ))}
                        </Picker>
                        <Text style={modalStyles.label}>
                            Selecciona frecuencia
                        </Text>
                        <View style={habitosScreenStyles.buttonContainer}>
                            {['DIARIA', 'SEMANAL', 'MENSUAL'].map(
                                (frequency) => (
                                    <Pressable
                                        key={frequency}
                                        style={[
                                            habitosScreenStyles.buttonPart,
                                            selectedFrequency === frequency &&
                                                habitosScreenStyles.selected,
                                        ]}
                                        onPress={() =>
                                            handleFrequencyChange(frequency)
                                        }
                                    >
                                        <Text>{frequency}</Text>
                                    </Pressable>
                                )
                            )}
                        </View>
                        <Button title="Guardar" onPress={handleAddHabit} />

                        {/* Add a Close Button */}
                        <Pressable
                            style={modalStyles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={modalStyles.closeButtonText}>
                                Cerrar
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            <SwipeListView
                data={habits}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                leftOpenValue={75}
                rightOpenValue={-75}
                onSwipeValueChange={handleSwipeValueChange}
                onRowClose={handleRowClose}
            />
        </View>
    );
};

export default HabitosScreen;

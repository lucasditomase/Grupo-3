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
import { useRouter, useRootNavigationState } from 'expo-router';

// Context
import { useGlobalContext } from '../../components/contexts/useGlobalContext';
import {
    habitosEnBaseDeDatos,
    crearHabitoEnBaseDeDatos,
    eliminarHabitoEnBaseDeDatos,
    actualizarHabitoEnBaseDeDatos,
} from '../../components/api';

// Types
type HabitoItem = {
    key: string;
    text: string;
    category: string;
    frequency: string;
    completion: boolean;
    icon?: string;
};
type HabitoItemDB = {
    text: string;
    category: string;
    frequency: string;
};

const HabitosScreen = () => {
    const router = useRouter();
    const rootNavigation = useRootNavigationState();
    const [inputText, setInputText] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<
        string | undefined
    >();
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';
    const swipeTriggered = useRef<{ [key: string]: boolean }>({});
    const listViewRef = useRef<any>(null);
    const { user, habitos, setHabitos } = useGlobalContext();
    const categories = [
        'SALUD',
        'DEPORTE',
        'ESTUDIO',
        'TRABAJO',
        'OCIO',
        'OTROS',
    ];
    const categoryIcons: { [key: string]: string } = {
        SALUD: 'local-hospital',
        DEPORTE: 'sports-soccer',
        ESTUDIO: 'school',
        TRABAJO: 'work',
        OCIO: 'movie',
        OTROS: 'category',
    };

    const [selectedFrequency, setSelectedFrequency] = useState('DIARIA');

    const handleFrequencyChange = (frequency: string) => {
        setSelectedFrequency(frequency);
    };

    useEffect(() => {
        if (!rootNavigation?.key) return;
        if (!user) {
            router.replace('/login');
        } else {
            fetchHabits();
        }
    }, [user, rootNavigation]);

    const fetchHabits = async () => {
        const token = user?.token;
        if (token) {
            const fetchedHabits = await habitosEnBaseDeDatos(token);
            if (fetchedHabits) {
                //console.log('Habitos:', fetchedHabits);
                setHabitos(fetchedHabits);
            }
        }
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
                    onPress: async () => {
                        const token = user?.token;
                        if (token) {
                            await eliminarHabitoEnBaseDeDatos(token, item.key);
                            setHabitos((prev) =>
                                prev.filter((habit) => habit.key !== item.key)
                            );
                            Alert.alert(`Deleted "${item.text}"`);
                            listViewRef.current?.closeAllOpenRows();
                        } else {
                            Alert.alert('Error', 'No se ha iniciado sesión');
                        }
                    },
                    style: 'destructive',
                },
            ]
        );
    };

    const handleLongPress = (item: HabitoItem) => {
        Alert.alert('Options', `Choose an action for "${item.text}"`, [
            {
                text: item.completion
                    ? 'Mark as Incomplete'
                    : 'Mark as Completed',
                onPress: () => toggleCompletion(item), // Use toggleCompletion
            },
            {
                text: 'Delete',
                onPress: () => deleteHabit(item),
                style: 'destructive',
            },
            { text: 'Cancel', style: 'cancel' },
        ]);
    };

    const renderHiddenItem = ({ item }: { item: HabitoItem }) => (
        <View style={habitosScreenStyles.rowBack}>
            <Pressable
                style={habitosScreenStyles.completeButton}
                onPress={() => toggleCompletion(item)} // Use toggleCompletion
            >
                <Text style={habitosScreenStyles.backText}>
                    {item.completion ? 'Descompletar' : 'Completar'}{' '}
                    {/* Dynamic label */}
                </Text>
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
        const habit = habitos.find((item) => item.key === key);
        if (!habit || swipeTriggered.current[key]) return;

        if (value > 150) {
            toggleCompletion(habit); // Use toggleCompletion
            swipeTriggered.current[key] = true;
            listViewRef.current?.closeAllOpenRows();
        } else if (value < -150) {
            deleteHabit(habit);
            swipeTriggered.current[key] = true;
            listViewRef.current?.closeAllOpenRows();
        }
    };

    const toggleCompletion = async (item: HabitoItem) => {
        const updatedCompletion = !item.completion;
        setHabitos((prev) =>
            prev.map((habit) =>
                habit.key === item.key
                    ? { ...habit, completion: updatedCompletion }
                    : habit
            )
        );
        listViewRef.current?.closeAllOpenRows();

        const token = user?.token;
        if (token) {
            try {
                await actualizarHabitoEnBaseDeDatos(token, {
                    ...item,
                    completion: updatedCompletion,
                });
            } catch (error) {
                console.error('Error updating habit completion:', error);
                Alert.alert(
                    'Error',
                    'Failed to update habit. Please try again.'
                );
            }
        } else {
            Alert.alert('Error', 'No se ha iniciado sesión');
        }
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
                        name={categoryIcons[item.category] || 'help-outline'}
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
                <MaterialIcons
                    name={
                        item.completion
                            ? 'check-circle'
                            : 'radio-button-unchecked'
                    }
                    size={24}
                    color={item.completion ? 'green' : 'gray'}
                    style={{ marginLeft: 'auto', marginRight: 10 }}
                    onPress={() => toggleCompletion(item)}
                />
            </View>
        </Pressable>
    );

    const handleRowClose = (rowKey: string) => {
        swipeTriggered.current[rowKey] = false;
    };

    const handleAddHabit = async () => {
        console.log('Adding habit');
        if (!inputText) {
            Alert.alert('Error', 'El nombre no puede estar vacío');
            return;
        }
        if (habitos.find((habit) => habit.text === inputText)) {
            Alert.alert('Error', 'El hábito ya existe');
            return;
        }

        const newHabit: HabitoItemDB = {
            text: inputText,
            category: selectedCategory || 'OTROS',
            frequency: selectedFrequency,
        };

        const token = user?.token;
        if (!token) {
            Alert.alert('Error', 'No se ha iniciado sesión');
            return;
        }

        try {
            // Add habit to the database
            await crearHabitoEnBaseDeDatos(token, newHabit);

            // Fetch updated habitos from the database
            await fetchHabits();

            // Reset the form and close the modal
            setInputText('');
            setModalVisible(false);
        } catch (error) {
            console.error('Error adding habit:', error);
            Alert.alert('Error', 'Hubo un problema al agregar el hábito.');
        }
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
                        <Pressable
                            style={modalStyles.saveButton}
                            onPress={handleAddHabit}
                        >
                            <Text style={modalStyles.closeButtonText}>
                                Guardar
                            </Text>
                        </Pressable>

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
                ref={listViewRef}
                data={habitos}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                leftOpenValue={150}
                rightOpenValue={-150}
                onSwipeValueChange={handleSwipeValueChange}
                onRowClose={handleRowClose}
            />
        </View>
    );
};

export default HabitosScreen;

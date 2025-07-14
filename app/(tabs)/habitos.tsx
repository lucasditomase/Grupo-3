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
import { useRouter } from 'expo-router';

// Context
import { useGlobalContext } from '../../components/contexts/useGlobalContext';
import {
    habitosEnBaseDeDatos,
    crearHabitoEnBaseDeDatos,
    eliminarHabitoEnBaseDeDatos,
    actualizarHabitoEnBaseDeDatos,
    updateHabitStreak,
    getStreaks,
} from '../../components/api';

// Types
type HabitoItem = {
    key: string;
    text: string;
    category: string;
    frequency: string;
    completion: boolean;

    priority: 'ALTA' | 'MEDIA' | 'BAJA';

    progress: number;
    goal: number;

    icon?: string;
    streak?: number;
    lastCompletionDate?: string;
};
type HabitoItemDB = {
    text: string;
    category: string;
    frequency: string;

    priority: 'ALTA' | 'MEDIA' | 'BAJA';


    objetivo: number;
    progreso: number;



};

const HabitosScreen = () => {
    const router = useRouter();
    const [inputText, setInputText] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<
        string | undefined
    >();
    const [goalInput, setGoalInput] = useState('1');
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

    const [selectedPriority, setSelectedPriority] = useState<'ALTA' | 'MEDIA' | 'BAJA'>('MEDIA');


    const handleFrequencyChange = (frequency: string) => {
        setSelectedFrequency(frequency);
    };


    const handlePriorityChange = (priority: 'ALTA' | 'MEDIA' | 'BAJA') => {

        setSelectedPriority(priority);
    };

    useEffect(() => {
        if (!user) {
            router.replace('/login');
        } else {
            fetchHabits();
        }
    }, [user]);

    const fetchHabits = async () => {
        const token = user?.token;
        if (token && user) {
            const fetchedHabits = await habitosEnBaseDeDatos(token);
            if (fetchedHabits) {
                const streakData = await getStreaks(user.userId);
                interface StreakData {
                    [key: string]: {
                        streak: number;
                        lastCompleted: string;
                    };
                }

                interface HabitWithStreak extends HabitoItem {
                    streak: number;
                    lastCompletionDate: string;
                }

                const streakDataTyped: StreakData = streakData;

                const habitsWithStreak: HabitWithStreak[] = (fetchedHabits as HabitoItem[]).map((h: HabitoItem) => ({
                    ...h,
                    streak: streakDataTyped[h.key]?.streak || 0,
                    lastCompletionDate: streakDataTyped[h.key]?.lastCompleted || '',
                }));
                setHabitos(habitsWithStreak);
            }
        }
    };

    const deleteHabit = (item: HabitoItem) => {
        Alert.alert(
            'Confirmar eliminación',
            `¿Estás seguro de que deseas eliminar "${item.text}"?`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Eliminar',
                    onPress: async () => {
                        const token = user?.token;
                        if (token) {
                            await eliminarHabitoEnBaseDeDatos(token, item.key);
                            setHabitos((prev) =>
                                prev.filter((habit) => habit.key !== item.key)
                            );
                            Alert.alert(`"${item.text}" eliminado`);
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
        Alert.alert('Opciones', `Elige una acción para "${item.text}"`, [
            {
                text: item.completion
                    ? 'Marcar como incompleto'
                    : 'Marcar como completado',
                onPress: () => toggleCompletion(item), // Use toggleCompletion
            },
            {
                text: 'Eliminar',
                onPress: () => deleteHabit(item),
                style: 'destructive',
            },
            { text: 'Cancelar', style: 'cancel' },
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
                    ? { ...habit, completion: updatedCompletion, progress: updatedCompletion ? habit.goal : 0 }
                    : habit
            )
        );
        listViewRef.current?.closeAllOpenRows();

        const token = user?.token;
        if (token && user) {
            try {
                await actualizarHabitoEnBaseDeDatos(token, {
                    ...item,
                    completion: updatedCompletion,
                    progress: updatedCompletion ? item.goal : 0,
                });
                const newStreak = await updateHabitStreak(
                    user.userId,
                    item.key,
                    updatedCompletion
                );
                setHabitos((prev) =>
                    prev.map((habit) =>
                        habit.key === item.key
                            ? { ...habit, streak: newStreak }
                            : habit
                    )
                );
            } catch (error) {
                console.error('Error updating habit completion:', error);
                Alert.alert(
                    'Error',
                    'No se pudo actualizar el hábito. Inténtalo de nuevo.'
                );
            }
        } else {
            Alert.alert('Error', 'No se ha iniciado sesión');
        }
    };

    const updateProgress = async (item: HabitoItem, delta: number) => {
        const newProgress = Math.min(
            (item.goal || 1),
            Math.max(0, (item.progress || 0) + delta)
        );
        const completed = newProgress >= (item.goal || 1);
        setHabitos((prev) =>
            prev.map((habit) =>
                habit.key === item.key
                    ? { ...habit, progress: newProgress, completion: completed }
                    : habit
            )
        );
        const token = user?.token;
        if (token) {
            try {
                await actualizarHabitoEnBaseDeDatos(token, {
                    ...item,
                    progress: newProgress,
                    completion: completed,
                });
            } catch (error) {
                console.error('Error updating habit progress:', error);
                Alert.alert('Error', 'No se pudo actualizar el progreso.');
            }
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
                        numberOfLines={1}
                        adjustsFontSizeToFit
                    >
                        Frecuencia: {item.frequency}
                    </Text>


                    {item.goal > 1 && (
                        <View style={habitosScreenStyles.progressContainer}>
                            <Pressable onPress={() => updateProgress(item, -1)}>
                                <MaterialIcons
                                    name="remove-circle-outline"
                                    size={20}
                                    color="teal"
                                />
                            </Pressable>
                            <Text style={habitosScreenStyles.progressText}>
                                {item.progress}/{item.goal}
                            </Text>
                            <Pressable onPress={() => updateProgress(item, 1)}>
                                <MaterialIcons
                                    name="add-circle-outline"
                                    size={20}
                                    color="teal"
                                />
                            </Pressable>
                        </View>
                    )}



                    <Text
                        style={[
                            habitosScreenStyles.frequencyText,
                            isDarkMode && themeDark.secondaryText,
                        ]}
                        numberOfLines={1}
                        adjustsFontSizeToFit
                    >
                        Prioridad: {item.priority}
                    </Text>


                    {item.streak && item.streak > 0 && (
                        <Text style={habitosScreenStyles.streakText}>
                            🔥 {item.streak}
                        </Text>
                    )}



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


            objetivo: parseInt(goalInput) || 1,
            progreso: 0,

            priority: selectedPriority,


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

            setSelectedPriority('MEDIA');

            setGoalInput('1');

            setModalVisible(false);
        } catch (error) {
            console.error('Error adding habit:', error);
            Alert.alert('Error', 'Hubo un problema al agregar el hábito.');
        }
    };

    const sortHabitsByPriority = () => {
        const order: Record<'ALTA' | 'MEDIA' | 'BAJA', number> = {
            ALTA: 1,
            MEDIA: 2,
            BAJA: 3,
        };
        setHabitos((prev) =>
            [...prev].sort(
                (a, b) => (order[a.priority] ?? 4) - (order[b.priority] ?? 4)
            )
        );
    };

    const sortHabitsByStreak = () => {
        setHabitos((prev) =>
            [...prev].sort((a, b) => (b.streak || 0) - (a.streak || 0))
        );
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
                <Pressable
                    style={habitosScreenStyles.button}
                    onPress={sortHabitsByPriority}
                >
                    <Text style={habitosScreenStyles.buttonText}>
                        Ordenar por prioridad
                    </Text>
                </Pressable>
                <Pressable
                    style={habitosScreenStyles.button}
                    onPress={sortHabitsByStreak}
                >
                    <Text style={habitosScreenStyles.buttonText}>
                        Ordenar por racha
                    </Text>
                </Pressable>
            </View>

            {habitos.filter((h) => (h.streak || 0) > 0).length > 0 && (
                <View style={habitosScreenStyles.streakContainer}>
                    <Text style={habitosScreenStyles.streakTitle}>
                        Rachas activas
                    </Text>
                    {habitos
                        .filter((h) => (h.streak || 0) > 0)
                        .map((h) => (
                            <Text
                                key={h.key}
                                style={habitosScreenStyles.streakItem}
                            >
                                🔥 {h.text}: {h.streak}
                            </Text>
                        ))}
                </View>
            )}

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
                        <Text style={modalStyles.label}>Objetivo (cantidad)</Text>
                        <TextInput
                            style={modalStyles.input}
                            keyboardType="numeric"
                            value={goalInput}
                            onChangeText={setGoalInput}
                            placeholder="Ej. 10"
                        />
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
                                        <Text
                                        numberOfLines={1}
                adjustsFontSizeToFit={true}
                                        >{frequency}</Text>
                                    </Pressable>
                                )
                            )}
                        </View>
                        <Text style={modalStyles.label}>
                            Selecciona prioridad
                        </Text>
                        <View style={habitosScreenStyles.buttonContainer}>
                            {['ALTA', 'MEDIA', 'BAJA'].map((priority) => (
                                <Pressable
                                    key={priority}
                                    style={[
                                        habitosScreenStyles.buttonPart,
                                        selectedPriority === priority &&
                                            habitosScreenStyles.selected,
                                    ]}

                                    onPress={() =>
                                        handlePriorityChange(
                                            priority as 'ALTA' | 'MEDIA' | 'BAJA'
                                        )
                                    }
                                >
                                    <Text
                                        numberOfLines={1}
                                        adjustsFontSizeToFit={true}
                                    >
                                        {priority}
                                    </Text>

                                </Pressable>
                            ))}
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

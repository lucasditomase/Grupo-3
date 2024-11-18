import React, { useRef, useState } from 'react';
import {
    Alert,
    Button,
    Modal,
    Pressable,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    useColorScheme,
    StyleSheet,
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
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';
    const swipeTriggered = useRef<{ [key: string]: boolean }>({}); // Keeps track of whether a swipe action has been triggered for each item

    const pokemons = ['Gimnasio', 'Meditación', 'Pagos', 'Agenda', 'Alimentos'];

    // Sample data for the SwipeListView
    const data: HabitoItem[] = [
        { key: '1', text: 'Llamar a mi mama', category: 'Relación', frequency: 'Diario', icon: 'favorite' },
        { key: '2', text: 'Salir a correr', category: 'Deporte', frequency: 'Semanal', icon: 'directions-run' },
    ];


    const markAsCompleted = (item: HabitoItem) => {
        Alert.alert(`Marked "${item.text}" as completed`);
    };

    const deleteHabit = (item: HabitoItem) => {
        Alert.alert(`Deleted "${item.text}"`);
    };

    /**
     * Handles showing the context menu for an item.
     */
    const handleLongPress = (item: HabitoItem) => {
        Alert.alert(
            'Options',
            `Choose an action for "${item.text}"`,
            [
                { text: 'Mark as Completed', onPress: () => markAsCompleted(item) },
                { text: 'Delete', onPress: () => deleteHabit(item), style: 'destructive' },
                { text: 'Cancel', style: 'cancel' },
            ],
            { cancelable: true }
        );
    };

    // State for the selected part of the habit
    const [selectedPart, setSelectedPart] = useState('Diario');

    const handlePartClick = (part: string) => {
        setSelectedPart(part);
    };


    /**
     * Renders each habit item.
     */
    const renderItem = ({ item }: { item: HabitoItem }) => (
        <Pressable onLongPress={() => handleLongPress(item)}>
            <View
                style={[
                    habitosScreenStyles.habitosContainer,
                    { flexDirection: 'row' },
                ]}
            >
                <View style={habitosScreenStyles.habitosIconContainer}>
                    <MaterialIcons
                        name={item.icon}
                        size={50}
                        color="black"
                    />
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

    /**
    * Handles swipe actions.
    */
    const handleSwipeValueChange = ({
        key,
        value,
    }: {
        key: string;
        value: number;
    }) => {
        const habit = data.find((item) => item.key === key); // Find the swiped habit
        if (!habit) return;

        // Check if a swipe action has already been triggered for this item
        if (swipeTriggered.current[key]) return;

        if (value > 50) {
            // Trigger swipe-right action (Mark as Completed)
            markAsCompleted(habit);
            swipeTriggered.current[key] = true; // Set flag to true
        } else if (value < -50) {
            // Trigger swipe-left action (Delete)
            deleteHabit(habit);
            swipeTriggered.current[key] = true; // Set flag to true
        }
    };

    /**
     * Reset the swipe trigger when swipe is released.
     */
    const handleRowClose = (rowKey: string) => {
        swipeTriggered.current[rowKey] = false; // Reset the swipe trigger for this item
    };

    /**
     * Renders hidden actions for the SwipeListView.
     */
    const renderHiddenItem = ({ item }: { item: HabitoItem }) => (
        <View style={habitosScreenStyles.rowBack}>
            <Text style={habitosScreenStyles.backText}>Complete</Text>
            <Text style={habitosScreenStyles.backText}>Delete</Text>
        </View>
    );

    /**
     * Handles closing the modal.
     */
    const handleCloseModal = () => setModalVisible(false);

    return (
        <View style={{ flex: 1 }}>
            {/* Header Section */}
            <View
                style={[
                    isDarkMode ? themeDark.darkBackground : themeLight.lightBackground,
                ]}
            >
                <Pressable
                    style={habitosScreenStyles.button}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={habitosScreenStyles.buttonText}>Agregar nuevo hábito</Text>
                </Pressable>
            </View>

            {/* Modal for adding a new habit */}
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
                        <Text style={modalStyles.label}>Selecciona categoría</Text>
                        <Picker
                            selectedValue={selectedCategory}
                            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                        >
                            {pokemons.map((pokemon) => (
                                <Picker.Item key={pokemon} label={pokemon} value={pokemon} />
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

            {/* SwipeListView for habits */}
            <SwipeListView
                data={data}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                leftOpenValue={75} // Define swipe threshold for "Mark as Completed"
                rightOpenValue={-75} // Define swipe threshold for "Delete"
                onSwipeValueChange={(swipeData) =>
                    handleSwipeValueChange({
                        key: swipeData.key as string, // Explicitly cast key as string
                        value: swipeData.value,
                    })
                }
                onRowClose={(rowKey) => handleRowClose(rowKey as string)} // Cast rowKey explicitly
            />
        </View>
    );
};

export default HabitosScreen;

const styles = StyleSheet.create({
    buttonContainer: {
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
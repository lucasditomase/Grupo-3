import React, { useState } from 'react';
import {
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

    const pokemons = ['Gimnasio', 'Meditación', 'Pagos', 'Agenda', 'Alimentos'];

    // Sample data for the SwipeListView
    const data: HabitoItem[] = [
        { key: '1', text: 'Llamar a mi mama', category: 'Relación', frequency: 'Diario', icon: 'favorite' },
        { key: '2', text: 'Salir a correr', category: 'Deporte', frequency: 'Semanal', icon: 'directions-run' },
    ];

    /**
     * Renders each habit item.
     */
    const renderItem = ({ item }: { item: HabitoItem }) => (
        <View
            style={[
                habitosScreenStyles.habitosContainer,
                { flexDirection: 'row' },
            ]}
        >
            { }
            <View style={habitosScreenStyles.habitosIconContainer}>
                <MaterialIcons
                    name={item.icon}
                    size={50}
                    color="black"
                />
            </View>

            { }
            <View style={habitosScreenStyles.habitosTextosContainer}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                    {item.text}
                </Text>
                <Text style={{ fontSize: 16 }}>
                    Frecuencia: {item.frequency}
                </Text>
            </View>
        </View>
    );

    /**
     * Renders hidden actions for the SwipeListView.
     */
    const renderHiddenItem = () => (
        <View style={habitosScreenStyles.rowBack}>
            <Text style={habitosScreenStyles.backText}>Action 1</Text>
            <Text style={habitosScreenStyles.backText}>Action 2</Text>
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
                        <Button title="Guardar" onPress={handleCloseModal} />
                    </View>
                </View>
            </Modal>

            {/* SwipeListView for habits */}
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

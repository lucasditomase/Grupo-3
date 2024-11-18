import React, { useState } from 'react';
import {
    Button,
    Image,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
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
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// Types
type HabitoItem = {
    key: string;
    text: string;
    category: string;
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
        { key: '1', text: 'Item 1', category: 'Category 1', icon: 'favorite' },
        { key: '2', text: 'Item 2', category: 'Category 2', icon: 'directions-run' },
    ];

    /**
     * Renders each habit item.
     */
    const renderItem = ({ item }: { item: HabitoItem }) => (
        <View style={styles.rowFront}>
            <MaterialIcons name={item.icon} size={100} color="red" />
            <Icon name={item.icon} size={100} color="red" />
            <FontAwesome name={item.icon} size={100} color="red" />
            <Text>{`${item.text} ${item.category}`}</Text>
        </View>
    );

    /**
     * Renders hidden actions for the SwipeListView.
     */
    const renderHiddenItem = () => (
        <View style={styles.rowBack}>
            <Text style={styles.backText}>Action 1</Text>
            <Text style={styles.backText}>Action 2</Text>
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

            {/* List of static habits */}
            <ScrollView
                style={[
                    isDarkMode ? themeDark.darkBackground : themeLight.lightBackground,
                ]}
            >
                {[
                    {
                        image: require('../../assets/images/dumbbell-fitness.png'),
                        title: 'Gimnasio',
                        frequency: 'Diario',
                    },
                    {
                        image: require('../../assets/images/meditation.png'),
                        title: 'Meditación',
                        frequency: 'Diario',
                    },
                    {
                        image: require('../../assets/images/coins.png'),
                        title: 'Pagar servicios',
                        frequency: 'Mensual',
                    },
                    {
                        image: require('../../assets/images/notebook-alt.png'),
                        title: 'Revisar mi agenda para la semana',
                        frequency: 'Semanal',
                    },
                    {
                        image: require('../../assets/images/glass.png'),
                        title: 'Tomar 2 litros de agua',
                        frequency: 'Diario',
                    },
                ].map((habit, index) => (
                    <View
                        key={index}
                        style={[
                            habitosScreenStyles.habitosContainer,
                            { flexDirection: 'row' },
                        ]}
                    >
                        <View style={habitosScreenStyles.habitosIconContainer}>
                            <Image
                                style={habitosScreenStyles.habitosIconMedidas}
                                source={habit.image}
                            />
                        </View>
                        <View style={habitosScreenStyles.habitosTextosContainer}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                                {habit.title}
                            </Text>
                            <Text style={{ fontSize: 16 }}>{`Frecuencia: ${habit.frequency}`}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default HabitosScreen;

// Styles for the SwipeListView
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

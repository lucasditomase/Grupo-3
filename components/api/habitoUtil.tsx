import { Alert } from 'react-native';

type HabitoItem = {
    key?: string;
    text: string;
    category: string;
    frequency: string;
    icon?: string;
};

const SERVER_URL = process.env.EXPO_PUBLIC_SERVER_URL;

export const habitosEnBaseDeDatos = async (token: string) => {
    try {
        console.log(SERVER_URL + '/get-habitos');
        const response = await fetch(SERVER_URL + '/get-habitos', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();

        // Map the response data to match the expected habit structure
        return responseData.habitos
            .filter((habit: any) => habit.habitoId) // Ensure habitoId exists
            .map((habit: any) => ({
                key: habit.habitoId?.toString() || '', // Safely handle missing habitoId
                text: habit.nombre || 'Sin Nombre', // Default to 'Sin Nombre' if missing
                category: habit.categoria || 'Sin Categoría', // Default category
                frequency: habit.frequencia || 'Desconocida', // Default frequency
                icon: 'event', // Default icon
            }));
    } catch (error) {
        console.error('Error fetching habits:', error);
        Alert.alert('Error', 'Failed to load habits. Please try again.');
        return null;
    }
};

export const crearHabitoEnBaseDeDatos = async (
    token: string,
    habito: HabitoItem
) => {
    try {
        console.log(
            JSON.stringify({
                nombre: habito.text,
                frequencia: habito.frequency,
                categoria: habito.category,
            })
        );

        const response = await fetch(SERVER_URL + '/crear-habito', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre: habito.text,
                frequencia: habito.frequency,
                categoria: habito.category,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log('Habito creado:', responseData);
        return responseData;
    } catch (error) {
        console.error('Error creating habit:', error);
        Alert.alert('Error', 'Failed to create habit. Please try again.');
        return null;
    }
};

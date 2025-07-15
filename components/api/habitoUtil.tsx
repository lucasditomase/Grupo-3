import { Alert } from 'react-native';

type HabitoItem = {
    key?: string;
    text: string;
    category: string;
    frequency: string;
    completion?: boolean;

    priority: 'ALTA' | 'MEDIA' | 'BAJA';

    progress?: number;
    goal?: number;

    icon?: string;
    streak?: number;
    lastCompletionDate?: string;
};

const SERVER_URL = process.env.EXPO_PUBLIC_SERVER_URL;

const mapPriority = (value: any): 'ALTA' | 'MEDIA' | 'BAJA' => {
    if (typeof value === 'string') {
        const upper = value.toUpperCase();
        if (upper === 'ALTA' || upper === 'MEDIA' || upper === 'BAJA') {
            return upper as 'ALTA' | 'MEDIA' | 'BAJA';
        }
    }
    if (typeof value === 'number') {
        if (value === 0) return 'ALTA';
        if (value === 1) return 'MEDIA';
        if (value === 2) return 'BAJA';
    }
    return 'MEDIA';
};

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

        const habits = responseData.habitos
            .filter((habit: any) => habit.habitoId) // Ensure habitoId exists
            .map((habit: any) => ({
                key: habit.habitoId?.toString() || '', // Safely handle missing habitoId
                text: habit.nombre || 'Sin Nombre', // Default to 'Sin Nombre' if missing
                category: habit.categoria || 'Sin Categoría', // Default category
                completion: habit.completado || false, // Default completion status
                frequency: habit.frequencia || 'Desconocida', // Default frequency

                priority: mapPriority(habit.prioridad),


                progress: habit.progreso || 0,
                goal: habit.objetivo || 1,

                icon: 'event', // Default icon
            }));
        return habits;
    } catch (error) {
        console.error('Error fetching habits:', error);
        Alert.alert('Error', 'No se pudieron cargar los hábitos. Inténtalo de nuevo.');
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
                prioridad: habito.priority.toUpperCase(),
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

                prioridad: habito.priority.toUpperCase(),


                objetivo: habito.goal ?? 1,
                progreso: habito.progress ?? 0,

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
        Alert.alert('Error', 'No se pudo crear el hábito. Inténtalo de nuevo.');
        return null;
    }
};

export const eliminarHabitoEnBaseDeDatos = async (
    token: string,
    habitoId: string
) => {
    try {
        console.log('eliminarHabitoEnBaseDeDatos');
        const response = await fetch(
            `${SERVER_URL}/delete-habito/${habitoId}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();

        console.log('Habito eliminado:', responseData);
        return responseData;
    } catch (error) {
        console.error('Error deleting habit:', error);
        Alert.alert('Error', 'No se pudo eliminar el hábito. Inténtalo de nuevo.');
        return null;
    }
};

export const actualizarHabitoEnBaseDeDatos = async (
    token: string,
    habito: HabitoItem
) => {
    try {
        console.log('actualizarHabitoEnBaseDeDatos');
        const response = await fetch(
            `${SERVER_URL}/update-habito-completado/${habito.key}`,
            {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    completado: habito.completion,
                    progreso: habito.progress,
                    objetivo: habito.goal,
                }),
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();

        console.log('Habito actualizado:', responseData);
        return responseData;
    } catch (error) {
        console.error('Error updating habit:', error);
        Alert.alert('Error', 'No se pudo actualizar el hábito. Inténtalo de nuevo.');
        return null;
    }
};

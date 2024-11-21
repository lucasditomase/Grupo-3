import { UserPayload } from '../../components/contexts';
import { router } from 'expo-router';
import { Dispatch, SetStateAction } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const signOut = async (
    setUser: Dispatch<SetStateAction<UserPayload | null>>
) => {
    // Clear user from state and AsyncStorage
    setUser(null);
    await AsyncStorage.removeItem('user');

    // Show an alert after clearing the user
    Alert.alert('Sesión cerrada', 'Has cerrado sesión correctamente', [
        {
            text: 'OK',
            onPress: () => {
                // Navigate to the login or initial screen
                router.replace('/');
            },
        },
    ]);
};

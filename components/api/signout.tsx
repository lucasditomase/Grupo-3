import { UserPayload } from '@/views/contexts/globalContext';
import { router } from 'expo-router';
import { Dispatch, SetStateAction } from 'react';
import { Alert } from 'react-native';

export const signOut = async (
    setUser: Dispatch<SetStateAction<UserPayload | null>>
) => {
    setUser(null);
    Alert.alert('Sesión cerrada', 'Has cerrado sesión correctamente');
    router.replace('/');
};

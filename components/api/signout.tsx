import { UserPayload } from '../../components/contexts';
import { router } from 'expo-router';
import { Dispatch, SetStateAction } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const signOut = async (
    setUser: Dispatch<SetStateAction<UserPayload | null>>
) => {
    // Clear user from state and AsyncStorage
    setUser(null);
    await AsyncStorage.removeItem('user');

    // Navigate back to the login or initial screen
    router.replace('/');
};

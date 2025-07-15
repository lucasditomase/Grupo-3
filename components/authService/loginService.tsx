import { validateInput } from './validationUtil';
import { Buffer } from 'buffer';
import { UserPayload } from '../contexts/globalContext';
import { Dispatch, SetStateAction } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SERVER_URL = process.env.EXPO_PUBLIC_SERVER_URL;

export const loginUser = async (
    email: string,
    password: string,
    setUser: Dispatch<SetStateAction<UserPayload | null>>
) => {
    // Validate user input
    if (!validateInput(email, password)) {
        return { success: false, message: 'Entrada inválida. Inténtalo de nuevo.' };
    }

    try {
        const response = await sendLoginRequest(email, password);
        return await handleLoginResponse(response, setUser);
    } catch (error) {
        return {
            success: false,
            message:
                'Error en el inicio de sesión: ' + (error as Error).message,
        };
    }
};

const sendLoginRequest = async (email: string, password: string) => {
    return await fetch(SERVER_URL + '/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
};

const handleLoginResponse = async (
    response: Response,
    setUser: Dispatch<SetStateAction<UserPayload | null>>
) => {
    if (response.status === 200) {
        const data = await response.json();
        const tokenJWT = data.token;
        const parts = tokenJWT
            .split('.')
            .map((part: string) =>
                Buffer.from(
                    part.replace(/-/g, '+').replace(/_/g, '/'),
                    'base64'
                ).toString()
            );
        const payload: UserPayload = JSON.parse(parts[1]);
        payload.token = tokenJWT;
        console.log('Token: ' + tokenJWT);
        setUser(payload);

        // Save user to AsyncStorage
        await AsyncStorage.setItem('user', JSON.stringify(payload));

        return {
            success: true,
            message: 'Inicio de sesión exitoso',
            data,
        };
    } else {
        const errorData = await response.json();
        return {
            success: false,
            message: `Error ${response.status}: ${errorData.message || 'Ocurrió un error'
                }`,
        };
    }
};

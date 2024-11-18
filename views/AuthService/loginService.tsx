import { validateInput } from './validationUtil';
import { Buffer } from 'buffer';
import { UserPayload } from '../contexts/globalContext';
import { Dispatch, SetStateAction } from 'react';

const SERVER_URL = process.env.EXPO_PUBLIC_SERVER_URL;

export const loginUser = async (
    email: string,
    password: string,
    setUser: Dispatch<SetStateAction<UserPayload | null>>
) => {
    // Validate user input
    if (!validateInput(email, password)) {
        return { success: false, message: 'Invalid input. Please try again.' };
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
        console.log('token: ' + tokenJWT);
        setUser(payload);

        return {
            success: true,
            message: 'Inicio de sesión exitoso',
            data: data, // Assuming the response has a `data` field containing the token and user info
        };
    } else {
        const errorData = await response.json();
        return {
            success: false,
            message: `Error ${response.status}: ${
                errorData.message || 'Ocurrió un error'
            }`,
        };
    }
};

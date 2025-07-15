import { validateInput } from '../../components/authService/validationUtil';
import { Buffer } from 'buffer';
import { UserPayload } from '../../components/contexts/globalContext';
import { Dispatch, SetStateAction } from 'react';

/**
 * Logs in a user by validating input, sending a request, and handling the response.
 *
 * @param email - The user's email address.
 * @param password - The user's password.
 * @param setUser - Function to set the logged-in user's data.
 * @returns An object containing the success status and a message.
 */
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
        // Send the login request
        const response = await sendLoginRequest(email, password);

        // Handle the login response
        return await handleLoginResponse(response, setUser);
    } catch (error) {
        // Handle any errors that occur during the request
        return {
            success: false,
            message: 'Error en el inicio de sesión: ' + (error as Error).message,
        };
    }
};

/**
 * Sends a POST request to the login endpoint with the user's credentials.
 *
 * @param email - The user's email address.
 * @param password - The user's password.
 * @returns The fetch response.
 */
const sendLoginRequest = async (email: string, password: string) => {
    return await fetch('http://192.168.68.104:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
};

/**
 * Handles the login response, parsing the token and setting user data.
 *
 * @param response - The fetch response from the login request.
 * @param setUser - Function to set the logged-in user's data.
 * @returns An object indicating success or failure, and a message.
 */
const handleLoginResponse = async (
    response: Response,
    setUser: Dispatch<SetStateAction<UserPayload | null>>
) => {
    if (response.status === 200) {
        const data = await response.json();
        const tokenJWT = data.token;

        // Decode JWT and parse the payload
        const parts = tokenJWT.split('.').map((part: string) =>
            Buffer.from(
                part.replace(/-/g, '+').replace(/_/g, '/'),
                'base64'
            ).toString()
        );
        console.log(parts);

        const payload: UserPayload = JSON.parse(parts[1]);
        payload.token = tokenJWT;

        console.log(payload);
        setUser(payload);

        return {
            success: true,
            message: 'Inicio de sesión exitoso',
            data: data, // Assuming the response has a `data` field containing the token and user info
        };
    } else {
        // Handle non-200 status codes
        const errorData = await response.json();
        return {
            success: false,
            message: `Error ${response.status}: ${errorData.message || 'Ocurrió un error'
                }`,
        };
    }
};

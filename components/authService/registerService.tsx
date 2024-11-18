import { validateInput } from '../../components/authService/validationUtil';

/**
 * Registers a new user with the provided details.
 * @param username - The username of the user.
 * @param email - The email address of the user.
 * @param password - The password for the user account.
 * @param nacimientoDia - The birth day of the user.
 * @param nacimientoMes - The birth month of the user.
 * @param nacimientoAnio - The birth year of the user.
 * @returns A boolean indicating success or failure.
 */
export const registerUser = async (
    username: string,
    email: string,
    password: string,
    nacimientoDia: string,
    nacimientoMes: string,
    nacimientoAnio: string
): Promise<boolean> => {
    // Validate user input
    if (
        !validateInput(
            email,
            password,
            username,
            nacimientoDia,
            nacimientoMes,
            nacimientoAnio
        )
    ) {
        return false;
    }

    try {
        // Send the registration request
        const response = await sendRegisterRequest(
            username,
            email,
            password,
            nacimientoDia,
            nacimientoMes,
            nacimientoAnio
        );

        // Handle the registration response
        return await handleRegisterResponse(response);
    } catch (error) {
        alert(`Error en el registro: ${(error as Error).message}`);
        return false;
    }
};

/**
 * Sends a registration request to the server.
 */
const sendRegisterRequest = async (
    username: string,
    email: string,
    password: string,
    nacimientoDia: string,
    nacimientoMes: string,
    nacimientoAnio: string
): Promise<Response> => {
    return await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            email,
            password,
            nacimientoDia,
            nacimientoMes,
            nacimientoAnio,
        }),
    });
};

/**
 * Handles the response from the registration request.
 */
const handleRegisterResponse = async (response: Response): Promise<boolean> => {
    if (response.status === 200) {
        alert('Registro exitoso');
        return true;
    }

    if (response.status === 400) {
        await handleErrorResponse(response);
    } else if (response.status === 500) {
        alert('Error del servidor, intenta más tarde.');
    } else {
        alert('Error desconocido, verifica tu conexión o intenta más tarde.');
    }

    return false;
};

/**
 * Handles error responses from the server.
 */
const handleErrorResponse = async (response: Response): Promise<void> => {
    const data = await response.json();
    alert(`Error en el registro: ${data.message}`);
};

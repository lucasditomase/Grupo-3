import { validateInput } from './authUtil';

export const registerUser = async (
    username: string,
    email: string,
    password: string
) => {
    if (!validateInput(email, password, username)) {
        return false;
    }
    try {
        const response = await sendRegisterRequest(username, email, password);
        return await handleRegisterResponse(response);
    } catch (error) {
        alert('Error en el registro: ' + (error as Error).message);
    }
};

const sendRegisterRequest = async (
    username: string,
    email: string,
    password: string
) => {
    return await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
    });
};

const handleRegisterResponse = async (response: Response) => {
    switch (response.status) {
        case 200:
            alert('Registro exitoso');
            return true;
        case 400:
            handleErrorResponse(response);
        case 500:
            alert('Error del servidor, intenta más tarde.');
        default:
            alert(
                'Error desconocido, verifica tu conexión o intenta más tarde.'
            );
    }
    return false;
};

const handleErrorResponse = async (response: Response) => {
    const data = await response.json();
    alert('Error en el registro: ' + data.message);
};

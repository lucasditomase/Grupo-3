import { validateInput } from './authUtil';

export const loginUser = async (email: string, password: string) => {
    if (!validateInput(email, password)) {
        return false;
    }
    try {
        const response = await sendLoginRequest(email, password);
        return await handleLoginResponse(response);
    } catch (error) {
        alert('Error en el inicio de sesión: ' + (error as Error).message);
        return false;
    }
};

const sendLoginRequest = async (email: string, password: string) => {
    return await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
};

const handleLoginResponse = async (response: Response) => {
    switch (response.status) {
        case 200:
            const data = await response.json();
            alert('Inicio de sesión exitoso');
            localStorage.setItem('token', data.token);
            return true;
        case 400:
            handleErrorResponse(response);
            return false;
        case 500:
            alert('Error del servidor, intenta más tarde.');
            return false;
        default:
            alert(
                'Error desconocido, verifica tu conexión o intenta más tarde.'
            );
            return false;
    }
};

const handleErrorResponse = async (response: Response) => {
    const data = await response.json();
    alert('Error en el inicio de sesión: ' + data.message);
};

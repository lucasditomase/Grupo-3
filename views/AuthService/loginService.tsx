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
    if (response.status === 200) {
        const data = await response.json();
        alert('Inicio de sesión exitoso');
        localStorage.setItem('token', data.token);
        return true;
    } else {
        const errorData = await response.json();
        alert(
            `Error ${response.status}: ${
                errorData.message || 'Ocurrió un error'
            }`
        );
        return false;
    }
};

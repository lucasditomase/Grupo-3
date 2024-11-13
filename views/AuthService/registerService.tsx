import { validateInput } from './validationUtil';

export const registerUser = async (
    username: string,
    email: string,
    password: string,
    nacimientoDia: string,
    nacimientoMes: string,
    nacimientoAnio: string
) => {
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
        const response = await sendRegisterRequest(
            username,
            email,
            password,
            nacimientoDia,
            nacimientoMes,
            nacimientoAnio
        );
        return await handleRegisterResponse(response);
    } catch (error) {
        alert('Error en el registro: ' + (error as Error).message);
    }
};

const sendRegisterRequest = async (
    username: string,
    email: string,
    password: string,
    nacimientoDia: string,
    nacimientoMes: string,
    nacimientoAnio: string
) => {
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

const handleRegisterResponse = async (response: Response) => {
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

const handleErrorResponse = async (response: Response) => {
    const data = await response.json();
    alert('Error en el registro: ' + data.message);
};

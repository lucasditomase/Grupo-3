export const validateInput = (
    email: string,
    password: string,
    username?: string
) => {
    if (username && isFieldEmpty(username)) {
        alert('Por favor, completa todos los campos');
        return false;
    }

    if (isFieldEmpty(email) || isFieldEmpty(password)) {
        alert('Por favor, completa todos los campos');
        return false;
    }

    if (!isValidEmail(email)) {
        alert('Por favor, introduce un email válido');
        return false;
    }

    if (!isValidPassword(password)) {
        alert('La contraseña debe tener al menos 6 caracteres');
        return false;
    }

    return true;
};

export const isFieldEmpty = (field: string) => !field.trim();

export const isValidEmail = (email: string) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
};

export const isValidPassword = (password: string) => password.length >= 6;

export const validateInput = (
    email: string,
    password: string,
    username?: string,
    birthDay?: string,
    birthMonth?: string,
    birthYear?: string
) => {
    // Check if required fields are filled
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
    if (birthYear && birthMonth && birthDay) {
        return isValidBirthDate(birthYear, birthMonth, birthDay);
    }

    return true;
};

export const isFieldEmpty = (field: string) => !field.trim();

export const isValidEmail = (email: string) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
};

export const isValidPassword = (password: string) => password.length >= 6;

const isValidBirthDate = (
    birthYear: string,
    birthMonth: string,
    birthDay: string
): boolean => {
    const year = parseInt(birthYear);
    const month = parseInt(birthMonth);
    const day = parseInt(birthDay);
    const birthDate = new Date(year, month - 1, day);
    const currentDate = new Date();
    const minDate = new Date(
        currentDate.getFullYear() - 120,
        currentDate.getMonth(),
        currentDate.getDate()
    );
    const maxDate = new Date(
        currentDate.getFullYear() - 5,
        currentDate.getMonth(),
        currentDate.getDate()
    );

    if (year == 0 || birthDate <= minDate) {
        alert('Ingrese una fecha válida.');
        return false;
    }

    if (day < 1 || day > 31) {
        alert('Ingrese un día válido.');
        return false;
    }

    if (month < 1 || month > 12) {
        alert('Ingrese un mes válido.');
        return false;
    }

    if (birthDate >= maxDate) {
        alert('No puede ingresar al menos que tenga más de 5 años.');
        return false;
    }

    return true;
};
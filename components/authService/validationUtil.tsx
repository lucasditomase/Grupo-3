/**
 * Validates user input for various forms (login, registration, etc.).
 * @param email - The user's email.
 * @param password - The user's password.
 * @param username - Optional: The user's username.
 * @param birthDay - Optional: The user's birth day.
 * @param birthMonth - Optional: The user's birth month.
 * @param birthYear - Optional: The user's birth year.
 * @returns A boolean indicating whether the input is valid.
 */
export const validateInput = (
    email: string,
    password: string,
    username?: string,
    birthDay?: string,
    birthMonth?: string,
    birthYear?: string
): boolean => {
    // Validate username if provided
    if (username && isFieldEmpty(username)) {
        alert('Por favor, completa todos los campos');
        return false;
    }

    // Validate email and password
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

    // Validate birth date if all fields are provided
    if (birthYear && birthMonth && birthDay) {
        return isValidBirthDate(birthYear, birthMonth, birthDay);
    }

    return true;
};

/**
 * Checks if a field is empty.
 * @param field - The field to validate.
 * @returns A boolean indicating whether the field is empty.
 */
export const isFieldEmpty = (field: string): boolean => !field.trim();

/**
 * Validates an email format.
 * @param email - The email to validate.
 * @returns A boolean indicating whether the email is valid.
 */
export const isValidEmail = (email: string): boolean => {
    const emailRegex =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;

    return emailRegex.test(email);
};

/**
 * Validates a password.
 * @param password - The password to validate.
 * @returns A boolean indicating whether the password is valid.
 */
export const isValidPassword = (password: string): boolean =>
    password.length >= 6;

/**
 * Validates a birth date.
 * @param birthYear - The year of birth.
 * @param birthMonth - The month of birth.
 * @param birthDay - The day of birth.
 * @returns A boolean indicating whether the birth date is valid.
 */
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

    // Define acceptable age range (5 to 120 years)
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

    // Check year validity and minimum age
    if (year === 0 || birthDate <= minDate) {
        alert('Ingrese una fecha válida.');
        return false;
    }

    // Check valid day range
    if (day < 1 || day > 31) {
        alert('Ingrese un día válido.');
        return false;
    }

    // Check valid month range
    if (month < 1 || month > 12) {
        alert('Ingrese un mes válido.');
        return false;
    }

    // Check maximum age limit
    if (birthDate >= maxDate) {
        alert('No puede ingresar al menos que tenga más de 5 años.');
        return false;
    }

    return true;
};

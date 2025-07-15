import React, {
    createContext,
    useState,
    ReactNode,
    Dispatch,
    SetStateAction,
} from 'react';

/**
 * Interface representing the structure of the user payload.
 */
export interface UserPayload {
    userId: number;
    email: string;
    username: string;
    profileImage: string | null;
    dateOfBirth: string;
    token: string | null;
}

/**
 * Type definition for authentication-related context.
 */
type AuthContextType = {
    user: UserPayload | null;
    setUser: Dispatch<SetStateAction<UserPayload | null>>;
};

/**
 * Type definition for the global context, which includes authentication
 * and theming capabilities.
 */
type GlobalContextType = AuthContextType & {
    theme: string;
    setTheme: Dispatch<SetStateAction<string>>;
};

/**
 * Create the global context with an undefined default value.
 */
export const GlobalContext = createContext<GlobalContextType | undefined>(
    undefined
);

interface GlobalProviderProps {
    children: ReactNode;
}

/**
 * GlobalProvider Component:
 * Provides the global context, including user authentication and theming,
 * to the application.
 */
export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
    const [user, setUser] = useState<UserPayload | null>(null);
    const [theme, setTheme] = useState<string>('light');

    return (
        <GlobalContext.Provider value={{ user, setUser, theme, setTheme }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;

import React, {
    createContext,
    useState,
    ReactNode,
    Dispatch,
    SetStateAction,
} from 'react';

// Interface for user payload
export interface UserPayload {
    userId: number;
    email: string;
    username: string;
    profileImage: string | null;
    dateOfBirth: string;
    token: string | null;
}

// Type for authentication context
type AuthContextType = {
    user: UserPayload | null;
    setUser: Dispatch<SetStateAction<UserPayload | null>>;
};

// Type for the global context that includes user and theme
type GlobalContextType = AuthContextType & {
    theme: string;
    setTheme: Dispatch<SetStateAction<string>>;
};

// Create the global context
export const GlobalContext = createContext<GlobalContextType | undefined>(
    undefined
);

interface GlobalProviderProps {
    children: ReactNode;
}

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
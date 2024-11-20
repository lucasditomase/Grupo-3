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
type HabitoItem = {
    key: string;
    text: string;
    category: string;
    frequency: string;
    completion: boolean;
    icon?: string;
};

// Type for authentication context
type AuthContextType = {
    user: UserPayload | null;
    setUser: Dispatch<SetStateAction<UserPayload | null>>;
};

// Type for the global context that includes user, theme, and habits
type GlobalContextType = AuthContextType & {
    theme: string;
    setTheme: Dispatch<SetStateAction<string>>;
    habitos: HabitoItem[];
    setHabitos: Dispatch<SetStateAction<HabitoItem[]>>;
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
    const [habitos, setHabitos] = useState<HabitoItem[]>([]);

    return (
        <GlobalContext.Provider
            value={{ habitos, setHabitos, user, setUser, theme, setTheme }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;

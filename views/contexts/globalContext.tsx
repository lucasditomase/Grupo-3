import React, { createContext, useState, ReactNode } from 'react';

interface GlobalProviderProps {
    children: ReactNode;
}

export const GlobalContext = createContext<any>(null);

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
    const [globalData, setGlobalData] = useState({
        user: null,
        theme: 'light',
    });

    return (
        <GlobalContext.Provider value={{ globalData, setGlobalData }}>
            {children}
        </GlobalContext.Provider>
    );
};

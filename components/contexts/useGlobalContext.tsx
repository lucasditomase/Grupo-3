import { useContext } from 'react';
import { GlobalContext } from './globalContext';

/**
 * Custom hook to access the GlobalContext.
 * Ensures the context is used within a GlobalProvider.
 * @throws Error if used outside a GlobalProvider.
 * @returns The value of the GlobalContext.
 */
export const useGlobalContext = () => {
    const context = useContext(GlobalContext);

    if (!context) {
        throw new Error(
            'useGlobalContext must be used within a GlobalProvider'
        );
    }

    return context;
};

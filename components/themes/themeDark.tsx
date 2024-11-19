import { StyleSheet } from 'react-native';

/**
 * Enhanced Dark theme styles for the application.
 */
const themeDark = StyleSheet.create({
    // Background style for screens with dark mode
    darkBackground: {
        backgroundColor: '#121212', // Modern dark background
    },

    // Default container style for dark mode
    defaultContainer: {
        backgroundColor: '#121212',
        flex: 1,
        padding: 16, // Add consistent padding
    },

    // Text styles for primary and secondary text
    primaryText: {
        color: '#FFFFFF', // Bright white for main text
        fontSize: 16,
    },
    secondaryText: {
        color: '#B0BEC5', // Subtle gray-blue for secondary text
        fontSize: 14,
    },

    // Button style for dark mode
    button: {
        backgroundColor: '#1E88E5', // Vibrant blue for buttons
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },

    // Card style for dark mode
    card: {
        backgroundColor: '#1E1E1E', // Slightly lighter than the background
        borderRadius: 8,
        padding: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5, // Elevation for Android
    },
});

export default themeDark;

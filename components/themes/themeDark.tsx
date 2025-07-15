import { StyleSheet } from 'react-native';

const darkPalette = {
    background: '#121212',
    card: '#1E1E1E',
    primaryText: '#FFFFFF',
    secondaryText: '#B0BEC5',
    button: '#1E88E5',
};

const themeDark = StyleSheet.create({
    darkBackground: { backgroundColor: darkPalette.background },
    defaultContainer: { backgroundColor: darkPalette.background, flex: 1, padding: 16 },
    primaryText: { color: darkPalette.primaryText, fontSize: 16 },
    secondaryText: { color: darkPalette.secondaryText, fontSize: 14 },
    button: {
        backgroundColor: darkPalette.button,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: { color: darkPalette.primaryText, fontSize: 16, fontWeight: '600' },
    card: { backgroundColor: darkPalette.card, borderRadius: 8, padding: 16, elevation: 5 },
});

export default themeDark;

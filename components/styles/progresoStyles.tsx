import { StyleSheet } from 'react-native';

const progresoScreenStyles = StyleSheet.create({
    labelAbove: {
        fontSize: 24, // Larger font size for the top label
        fontWeight: '600',
        marginBottom: 20, // Space below the top label
        color: 'gray', // Adjust dynamically based on theme
        textAlign: 'center',
    },
    label: {
        fontSize: 20, // Keep original font size for the bottom label
        fontWeight: '600',
        marginTop: 20,
        color: 'gray',
        textAlign: 'center',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        padding: 20,
        marginVertical: 10,
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center',
    },
});

export default progresoScreenStyles;

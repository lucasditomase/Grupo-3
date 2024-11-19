import { StyleSheet } from 'react-native';

const progresoScreenStyles = StyleSheet.create({
    label: {
        fontSize: 20,
        fontWeight: '600',
        marginTop: 20,
        color: 'gray', // Adjust dynamically based on theme
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
        marginVertical: 10, // Ensure vertical margin only
        alignItems: 'center',
        width: '90%', // Uniform width
        alignSelf: 'center', // Center the card within the parent container
    },
});

export default progresoScreenStyles;

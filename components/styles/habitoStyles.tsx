import { StyleSheet } from 'react-native';

const habitosScreenStyles = StyleSheet.create({
    // Button styles
    button: {
        alignItems: 'center',
        backgroundColor: 'teal',
        borderRadius: 20,
        justifyContent: 'center',
        marginHorizontal: 50,
        marginVertical: 20,
        paddingVertical: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4, // For Android shadow
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    },

    // Habit container styles
    habitosContainer: {
        backgroundColor: '#f8f9fa', // Light mode default
        borderRadius: 15,
        marginHorizontal: 10,
        marginVertical: 15,
        paddingVertical: 15,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000', // Light mode shadow
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2, // Light mode elevation
    },
    habitosIconContainer: {
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        borderRadius: 30, // Perfect circle
        height: 60,
        justifyContent: 'center',
        width: 60,
        overflow: 'hidden', // Ensures no overflow
    },
    habitosTextosContainer: {
        flex: 1,
        marginLeft: 15, // Space between icon and text
        justifyContent: 'center', // Vertically aligns the text
    },
    habitosText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 5, // Space between title and frequency
    },
    frequencyText: {
        fontSize: 14,
        color: '#555',
    },

    // Styles for the SwipeListView
    rowBack: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
        margin: 5,
        padding: 10,
    },
    backText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    completeButton: {
        backgroundColor: '#4CAF50',
        borderRadius: 10,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteButton: {
        backgroundColor: '#FF5252',
        borderRadius: 10,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Modal and selection styles
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    buttonPart: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    selected: {
        backgroundColor: '#0E6E6D',
        color: 'white',
        borderColor: 'transparent',
    },
});

export default habitosScreenStyles;

import { StyleSheet } from 'react-native';

/**
 * Styles for modals in the application.
 */
const modalStyles = StyleSheet.create({
    // Input field styles
    input: {
        borderColor: 'gray',
        borderRadius: 5,
        borderWidth: 1,
        height: 40,
        marginBottom: 20,
        paddingHorizontal: 10,
    },

    // Label text styles
    label: {
        fontSize: 18,
        marginBottom: 10,
    },

    // Container for the modal overlay
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    // View styles for the modal content
    modalView: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
});

export default modalStyles;

import { StyleSheet } from 'react-native';

/**
 * Styles for the Login screen components.
 */
const loginScreenStyles = StyleSheet.create({
    // Container for the login form
    container: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        elevation: 5,
        alignSelf: 'center',
    },

    // Title text styles
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },

    // Input field styles
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
        fontSize: 16,
        marginBottom: 15,
    },

    // Button container styles
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default loginScreenStyles;

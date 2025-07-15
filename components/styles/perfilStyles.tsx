import { StyleSheet } from 'react-native';

/**
 * Styles for the Perfil screen components.
 */
const perfilScreenStyles = StyleSheet.create({
    // Main container for the profile screen
    container: {
        flex: 1,
        padding: 20,
    },

    // Profile image styles
    profileImage: {
        alignSelf: 'center',
        borderRadius: 50,
        height: 100,
        width: 100,
        marginBottom: 20,
    },

    // Container for user information sections
    infoContainer: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },

    // Label text styles (e.g., "Username:", "Email:")
    label: {
        color: '#004d40',
        fontSize: 18,
        fontWeight: 'bold',
        width: 120,
    },

    // Value text styles (e.g., the username or email itself)
    value: {
        color: '#004d40',
        fontSize: 18,
    },

    // Main container for the profile image
    profileImageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },

    // Image styles
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginTop: 20,
    },
});

export default perfilScreenStyles;

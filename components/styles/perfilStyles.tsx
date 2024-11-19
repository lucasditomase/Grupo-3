import { StyleSheet } from 'react-native';

const perfilScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    profileImage: {
        alignSelf: 'center',
        borderRadius: 60, // Increased for more rounded corners
        height: 120,
        width: 120,
        marginBottom: 30, // Added more space below the image
        borderWidth: 3, // Increased border width for more visibility
        borderColor: '#008080', // Teal color
    },
    infoContainer: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    label: {
        color: '#37474f',
        fontSize: 18,
        fontWeight: 'bold',
        width: 120,
    },
    value: {
        color: '#37474f',
        fontSize: 18,
    },
    button: {
        backgroundColor: '#008080',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginTop: 20,
        marginBottom: 25, // Added more space between buttons and other elements
    },
    buttonText: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 20,
        marginTop: 20,
        alignSelf: 'center',
    },
    // Main container for the profile image
    profileImageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
});

export default perfilScreenStyles;

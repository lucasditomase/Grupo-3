import { StyleSheet } from 'react-native';

const perfilScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    profileImage: {
        alignSelf: 'center',
        borderRadius: 50,
        height: 100,
        marginBottom: 20,
        width: 100,
    },
    infoContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        elevation: 2,
        flexDirection: 'row',
        marginBottom: 15,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    label: {
        color: '#004d40',
        fontSize: 18,
        fontWeight: 'bold',
        width: 120,
    },
    value: {
        color: '#004d40',
        fontSize: 18,
    },
});

export default perfilScreenStyles;
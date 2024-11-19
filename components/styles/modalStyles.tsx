import { StyleSheet } from 'react-native';

const modalStyles = StyleSheet.create({
    input: {
        borderColor: 'gray',
        borderRadius: 5,
        borderWidth: 1,
        height: 40,
        marginBottom: 20,
        paddingHorizontal: 10,
        backgroundColor: '#f9f9f9',
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: '500',
        color: 'gray',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: '80%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 12,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        alignItems: 'center',
    },
});

export default modalStyles;

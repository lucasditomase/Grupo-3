import { StyleSheet } from 'react-native';

const modalStyles = StyleSheet.create({
    input: {
        borderColor: 'gray',
        borderRadius: 5,
        borderWidth: 1,
        height: 40,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    modalContainer: {
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
        justifyContent: 'center',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        width: '80%',
    },
});

export default modalStyles;
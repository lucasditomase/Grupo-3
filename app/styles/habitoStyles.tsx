import { StyleSheet } from 'react-native';

const habitosScreenStyles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: 'teal',
        borderRadius: 10,
        justifyContent: 'center',
        marginHorizontal: 100,
        marginVertical: 20,
        paddingVertical: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        lineHeight: 21,
    },
    habitosContainer: {
        borderColor: 'black',
        borderWidth: 1,
        flex: 1,
        height: 100,
    },
    habitosIconContainer: {
        alignItems: 'center',
        backgroundColor: 'lightgray',
        flex: 1,
        height: 98,
        justifyContent: 'center',
    },
    habitosIconMedidas: {
        height: 85,
        width: 85,
    },
    habitosTextosContainer: {
        backgroundColor: 'white',
        flex: 2,
        justifyContent: 'center',
        paddingLeft: 10,
    },
});

export default habitosScreenStyles;
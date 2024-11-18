import { StyleSheet } from 'react-native';

/**
 * Styles for the Habitos screen components.
 */
const habitosScreenStyles = StyleSheet.create({
    // Button styles
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

    // Habitos container styles
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

    // Styles for the SwipeListView
    rowFront: {
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        padding: 20,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: 'red',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backText: {
        color: 'white',
    },
    backButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginHorizontal: 5,
        padding: 10,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 5,
    },
});

export default habitosScreenStyles;

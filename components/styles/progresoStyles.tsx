import { StyleSheet } from 'react-native';

type ProgresoStylesParams = {
    isDarkMode: boolean;
};

const progresoScreenStyles = ({ isDarkMode }: ProgresoStylesParams) =>
    StyleSheet.create({
        labelAbove: {
            fontSize: 24,
            fontWeight: '600',
            marginBottom: 20,
            color: isDarkMode ? '#FFFFFF' : 'gray',
            textAlign: 'center',
        },
        label: {
            fontSize: 20,
            fontWeight: '600',
            marginTop: 20,
            color: isDarkMode ? '#FFFFFF' : 'gray',
            textAlign: 'center',
        },
        card: {
            backgroundColor: isDarkMode ? '#1E1E1E' : 'white',
            borderRadius: 10,
            elevation: 3,
            shadowColor: isDarkMode ? '#000' : '#333',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            padding: 20,
            marginVertical: 10,
            alignItems: 'center',
            width: '90%',
            alignSelf: 'center',
        },
        emptyContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 20,
        },
        emptyText: {
            fontSize: 18,
            color: isDarkMode ? '#FFFFFF' : '#333333',
            textAlign: 'center',
        },
    });

export default progresoScreenStyles;

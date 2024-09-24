import { Text, View, StyleSheet, ScrollView } from "react-native";


const HabitosScreen = () => {
    return (
        <View>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Hábitos</Text>
            </View>
            
            <ScrollView>
                <View>
                    <Text>Contenido</Text>
                </View>
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    header: {
        backgroundColor: 'gray', //Despues lo definimos mejor viendo alguna palera de colores
        padding: 30,
        paddingTop: 50,
        alignItems: 'center',
    },
    headerTitle: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
    },
});


export default HabitosScreen
import ProgressCircle from '../views/circulos';
import progresoScreenStyles from '../styles/progresoStyles';
import { StyleSheet, Text, View } from "react-native";

const ProgresoScreen = () => {
    return (
        <View>
            <View style={{
                marginVertical: 50,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <ProgressCircle size={200} strokeWidth={20} progress={75} color="teal" />
                <Text style={progresoScreenStyles.label}>75% completado</Text>
            </View >
            <View style={{
                marginVertical: 50,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <ProgressCircle size={200} strokeWidth={20} progress={25} color="teal" />
                <Text style={progresoScreenStyles.label}>35% completado</Text>
            </View >
        </View >
    )
}

export default ProgresoScreen;

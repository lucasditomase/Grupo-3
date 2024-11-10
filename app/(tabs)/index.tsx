import ProgressCircle from '../../components/views/circulos';
import progresoScreenStyles from '../../styles/progresoStyles';
import themeDark from '../../themes/themeDark';
import themeLight from '../../themes/themeLight';
import { Link } from 'expo-router';
import { Text, View, useColorScheme } from "react-native";

const ProgresoScreen = () => {
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';

    return (
        <View style={[isDarkMode ? themeDark.darkBackground : themeLight.lightBackground]}>
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
                <Link href={'/_sitemap'}>Hola</Link>
            </View >
        </View >
    )
}

export default ProgresoScreen
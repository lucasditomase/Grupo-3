import { Text, View, StyleSheet, } from "react-native";

import { Svg, Circle, G } from 'react-native-svg';

const ProgresoScreen = () => {
    return (
        <View>

            <View style={{
                marginVertical: 50,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <ProgressCircle size={200} strokeWidth={20} progress={75} color="teal" />
                <Text style={styles.label}>75% completado</Text>
            </View >

            <View style={{
                marginVertical: 50,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <ProgressCircle size={200} strokeWidth={20} progress={25} color="teal" />
                <Text style={styles.label}>35% completado</Text>
            </View >

        </View >

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ProgresoScreen

const ProgressCircle = ({ size, strokeWidth, progress, color }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (circumference * progress) / 100;

    return (
        <View style={[styles2.container, { width: size, height: size }]}>
            <Svg height={size} width={size}>
                <G rotation="-90" origin={`${size / 2}, ${size / 2}`}>
                    <Circle
                        stroke="#e6e6e6"
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        strokeWidth={strokeWidth}
                        fill="none"
                    />
                    <Circle
                        stroke={color}
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        fill="none"
                        strokeLinecap="round"
                    />
                </G>
            </Svg>
        </View>
    );
};

const styles2 = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
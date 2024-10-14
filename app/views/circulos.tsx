import { Circle, G, Svg } from 'react-native-svg';
import { StyleSheet, View } from "react-native";

const ProgressCircle = ({ size, strokeWidth, progress, color }: any) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (circumference * progress) / 100;

    return (
        <View style={[progressCircleStyles.container, { width: size, height: size }]}>
            <Svg height={size} width={size}>
                <G rotation="-90" origin={`${size / 2}, ${size / 2}`}>
                    <Circle
                        cx={size / 2}
                        cy={size / 2}
                        fill="none"
                        r={radius}
                        stroke="#e6e6e6"
                        strokeWidth={strokeWidth} />
                    <Circle
                        cx={size / 2}
                        cy={size / 2}
                        fill="none"
                        r={radius}
                        stroke={color}
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        strokeWidth={strokeWidth} />
                </G>
            </Svg>
        </View>
    );
};

const progressCircleStyles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default ProgressCircle
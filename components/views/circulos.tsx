import { Circle, G, Svg } from 'react-native-svg';
import { StyleSheet, View } from 'react-native';

interface ProgressCircleProps {
    size: number;
    strokeWidth: number;
    progress: number;
    color: string;
}

/**
 * ProgressCircle Component:
 * Displays a circular progress indicator.
 * @param size - Diameter of the circle.
 * @param strokeWidth - Width of the circle's stroke.
 * @param progress - Progress percentage (0 to 100).
 * @param color - Color of the progress stroke.
 */
const ProgressCircle = ({
    size,
    strokeWidth,
    progress,
    color,
}: ProgressCircleProps) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (circumference * progress) / 100;

    return (
        <View
            style={[progressCircleStyles.container, { width: size, height: size }]}
        >
            <Svg height={size} width={size}>
                <G rotation="-90" origin={`${size / 2}, ${size / 2}`}>
                    {/* Background Circle */}
                    <Circle
                        cx={size / 2}
                        cy={size / 2}
                        fill="none"
                        r={radius}
                        stroke="#e6e6e6"
                        strokeWidth={strokeWidth}
                    />
                    {/* Progress Circle */}
                    <Circle
                        cx={size / 2}
                        cy={size / 2}
                        fill="none"
                        r={radius}
                        stroke={color}
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        strokeWidth={strokeWidth}
                    />
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

export default ProgressCircle;

import React, { useEffect, useState } from 'react';
import { Modal, ScrollView, Text, View, useColorScheme } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedProps,
    withTiming,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg'; // Used for rendering the progress circle

// Views
import LoginScreen from '../../components/views/login';

// Styles
import getProgresoStyles from '../../components/styles/progresoStyles';
import themeDark from '../../components/themes/themeDark';
import themeLight from '../../components/themes/themeLight';

// Contexts
import { useGlobalContext } from '../../components/contexts/useGlobalContext';
import { habitosEnBaseDeDatos } from '../../components/api';

// Define type for progress data
interface ProgressData {
    title: string;
    progress: number;
    color: string;
    completado: string;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const ProgressCircle = ({
    size,
    strokeWidth,
    progress,
    color,
}: {
    size: number;
    strokeWidth: number;
    progress: number;
    color: string;
}) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const progressValue = useSharedValue(0); // Shared value for animation

    const animatedProps = useAnimatedProps(() => ({
        strokeDashoffset: circumference * (1 - progressValue.value / 100), // Calculate offset based on progress
    }));

    useEffect(() => {
        progressValue.value = withTiming(progress, { duration: 1000 }); // Animate to the target progress
    }, [progress]);

    return (
        <Svg width={size} height={size}>
            {/* Background Circle */}
            <Circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="#E0E0E0"
                strokeWidth={strokeWidth}
                fill="none"
            />
            {/* Animated Foreground Circle */}
            <AnimatedCircle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={color}
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={circumference}
                animatedProps={animatedProps} // Apply animated props
                strokeLinecap="round" // Smooth edges
            />
        </Svg>
    );
};

const ProgresoScreen = () => {
    const { user, habitos, setHabitos } = useGlobalContext();

    const [isLoggedIn, setIsLoggedIn] = useState(!!user);
    const [isLoginVisible, setIsLoginVisible] = useState(!user);
    const [progressData, setProgressData] = useState<ProgressData[]>([]);
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';

    const progresoStyles = getProgresoStyles({ isDarkMode });

    useEffect(() => {
        if (user) {
            setIsLoggedIn(true);
            setIsLoginVisible(false);
            if (!habitos || habitos.length === 0) {
                fetchHabits(); // Fetch habits if not already set
            } else {
                calculateProgress();
            }
        } else {
            setIsLoggedIn(false);
            setIsLoginVisible(true);
        }
    }, [user, habitos]);

    const fetchHabits = async () => {
        const token = user?.token;
        if (token) {
            const fetchedHabits = await habitosEnBaseDeDatos(token);
            if (fetchedHabits) {
                setHabitos(fetchedHabits); // Store habits in global provider
                calculateProgress(fetchedHabits); // Calculate progress
            }
        }
    };

    const calculateProgress = (habits = habitos) => {
        const frequencies = ['DIARIA', 'SEMANAL', 'MENSUAL'];

        const frequencyProgress: ProgressData[] = frequencies.map(
            (frequency) => {
                const frequencyHabits = habits.filter(
                    (habit) => habit.frequency === frequency
                );
                const completed = frequencyHabits.filter(
                    (habit) => habit.completion
                ).length;
                const total = frequencyHabits.length;
                const progress = total > 0 ? (completed / total) * 100 : 0;

                return {
                    title: `Progreso ${frequency.toLowerCase()}`,
                    progress,
                    color: 'teal',
                    completado: `${Math.round(progress)}%`,
                };
            }
        );

        setProgressData(frequencyProgress);
    };

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        setIsLoginVisible(false);
        fetchHabits(); // Fetch habits after login
    };

    return (
        <View
            style={[
                isDarkMode
                    ? themeDark.darkBackground
                    : themeLight.lightBackground,
            ]}
        >
            <Modal
                visible={isLoginVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsLoginVisible(false)}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: isDarkMode
                            ? 'rgba(0, 0, 0, 0.7)'
                            : 'rgba(0, 0, 0, 0.5)',
                    }}
                >
                    <LoginScreen
                        onClose={() => setIsLoginVisible(false)}
                        onLoginSuccess={handleLoginSuccess}
                    />
                </View>
            </Modal>

            {isLoggedIn && progressData.length > 0 && (
                <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
                    {progressData.map((item, index) => (
                        <View key={index} style={progresoStyles.card}>
                            <Text style={progresoStyles.labelAbove}>
                                {item.title}
                            </Text>
                            <ProgressCircle
                                size={200}
                                strokeWidth={20}
                                progress={item.progress}
                                color={item.color}
                            />
                            <Text style={progresoStyles.label}>
                                {item.completado} completado
                            </Text>
                        </View>
                    ))}
                </ScrollView>
            )}
        </View>
    );
};

export default ProgresoScreen;

import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    Text,
    View,
    useColorScheme,
    ActivityIndicator,
} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedProps,
    withTiming,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import { useIsFocused } from '@react-navigation/native';
import { useRouter } from 'expo-router';

import getProgresoStyles from '../../components/styles/progresoStyles';
import themeDark from '../../components/themes/themeDark';
import themeLight from '../../components/themes/themeLight';
import { useGlobalContext } from '../../components/contexts/useGlobalContext';
import { habitosEnBaseDeDatos } from '../../components/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    const progressValue = useSharedValue(0);

    const animatedProps = useAnimatedProps(() => ({
        strokeDashoffset: circumference * (1 - progressValue.value / 100),
    }));

    useEffect(() => {
        progressValue.value = withTiming(progress, { duration: 1000 });
    }, [progress]);

    return (
        <Svg width={size} height={size}>
            <Circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="#E0E0E0"
                strokeWidth={strokeWidth}
                fill="none"
            />
            <AnimatedCircle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={color}
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={circumference}
                animatedProps={animatedProps}
                strokeLinecap="round"
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
        </Svg>
    );
};

const ProgresoScreen = () => {
    const { user, setUser, habitos, setHabitos } = useGlobalContext();
    const isFocused = useIsFocused();
    const router = useRouter();
    const [progressData, setProgressData] = useState<ProgressData[]>([]);
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';

    const progresoStyles = getProgresoStyles({ isDarkMode });

    useEffect(() => {
        const checkUser = async () => {
            try {
                const storedUser = await AsyncStorage.getItem('user');
                if (storedUser) {
                    const parsedUser = JSON.parse(storedUser);
                    setUser(parsedUser);
                } else {
                    setUser(null); // Ensure user state is cleared
                    router.replace('/login');
                }
            } catch (error) {
                console.error('Error loading user from AsyncStorage:', error);
            } finally {
                setIsLoading(false); // Stop loading once the check is complete
            }
        };

        if (isFocused) {
            checkUser();
        }
    }, [isFocused]);

    useEffect(() => {
        const fetchHabits = async () => {
            if (user && user.token) {
                try {
                    const fetchedHabits = await habitosEnBaseDeDatos(
                        user.token
                    );
                    if (fetchedHabits) {
                        setHabitos(fetchedHabits);
                        calculateProgress(fetchedHabits);
                    }
                } catch (error) {
                    console.error('Error fetching habits:', error);
                }
            }
        };

        if (isFocused && user) {
            fetchHabits();
        }
    }, [isFocused, user]);

    const fetchHabits = async () => {
        const token = user?.token;
        if (token) {
            const fetchedHabits = await habitosEnBaseDeDatos(token);
            if (fetchedHabits) {
                setHabitos(fetchedHabits);
                calculateProgress(fetchedHabits);
            }
        }
    };

    const calculateProgress = (habits = habitos) => {
        const frequencies = ['DIARIA', 'SEMANAL', 'MENSUAL'];
        const frequencyProgress: ProgressData[] = frequencies.reduce(
            (acc: ProgressData[], frequency) => {
                const frequencyHabits = habits.filter(
                    (habit) => habit.frequency === frequency
                );
                const total = frequencyHabits.length;

                // Skip frequencies without any habits to avoid showing 0%
                if (total === 0) {
                    return acc;
                }

                const progressSum = frequencyHabits.reduce((acc, habit) => {
                    const goal = habit.goal || 1;
                    const current = habit.progress || (habit.completion ? goal : 0);
                    return acc + Math.min(current / goal, 1);
                }, 0);
                const progress = (progressSum / total) * 100;
                const formattedFrequency = frequency.toLowerCase() === 'diaria' ? 'diario' : frequency.toLowerCase();
                const title = `Progreso ${formattedFrequency}`;

                acc.push({
                    title: title,
                    progress,
                    color: 'teal',
                    completado: `${Math.round(progress)}%`,
                });

                return acc;
            },
            [] as ProgressData[]
        );

        setProgressData(frequencyProgress);
    };


    if (isLoading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: isDarkMode ? '#000' : '#fff',
                }}
            >
                <ActivityIndicator size="large" color="teal" />
            </View>
        );
    }

    return (
        <View
            style={[
                isDarkMode
                    ? themeDark.darkBackground
                    : themeLight.lightBackground,
                { flex: 1 },
            ]}
        >

            {user && progressData.length > 0 && (
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

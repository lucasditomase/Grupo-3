import AsyncStorage from '@react-native-async-storage/async-storage';

export interface StreakInfo {
    streak: number;
    lastCompleted: string;
}

export const getStreaks = async (userId: number): Promise<Record<string, StreakInfo>> => {
    try {
        const jsonValue = await AsyncStorage.getItem(`streaks_${userId}`);
        return jsonValue ? JSON.parse(jsonValue) : {};
    } catch (e) {
        console.error('Error loading streaks:', e);
        return {};
    }
};

export const saveStreaks = async (userId: number, data: Record<string, StreakInfo>): Promise<void> => {
    try {
        await AsyncStorage.setItem(`streaks_${userId}`, JSON.stringify(data));
    } catch (e) {
        console.error('Error saving streaks:', e);
    }
};

export const updateHabitStreak = async (
    userId: number,
    habitKey: string,
    completed: boolean
): Promise<number> => {
    const streaks = await getStreaks(userId);
    const today = new Date().toISOString().split('T')[0];
    if (completed) {
        const last = streaks[habitKey]?.lastCompleted;
        const yesterdayDate = new Date();
        yesterdayDate.setDate(yesterdayDate.getDate() - 1);
        const yesterday = yesterdayDate.toISOString().split('T')[0];
        let newStreak = 1;
        if (last === today) {
            newStreak = streaks[habitKey]?.streak || 1;
        } else if (last === yesterday) {
            newStreak = (streaks[habitKey]?.streak || 0) + 1;
        }
        streaks[habitKey] = { streak: newStreak, lastCompleted: today };
    } else {
        streaks[habitKey] = { streak: 0, lastCompleted: '' };
    }
    await saveStreaks(userId, streaks);
    return streaks[habitKey].streak;
};

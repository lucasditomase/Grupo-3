import * as Notifications from 'expo-notifications';
export const calculateAge = (birthDate: string): number => {
    const birthDateObj = new Date(birthDate); // Parse the birthdate string into a Date object
    const today = new Date(); // Get the current date

    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    const dayDiff = today.getDate() - birthDateObj.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
    }

    return age;
};

export const scheduleNotification = async () => {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: 'Hello!',
            body: 'This is a local notification.',
            data: { extraData: 'Some data' },
        },
        trigger: {
            seconds: 5,
            repeats: false,
        },
    });
};

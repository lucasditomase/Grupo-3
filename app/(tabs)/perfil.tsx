import React, { useEffect, useState } from 'react';
import {
    Alert,
    Button,
    Image,
    Text,
    View,
    useColorScheme,
} from 'react-native';

// Styles
import perfilScreenStyles from '../../components/styles/perfilStyles';
import themeDark from '../../components/themes/themeDark';
import themeLight from '../../components/themes/themeLight';

// Libraries
import * as Notifications from 'expo-notifications';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

// Contexts
import { useGlobalContext } from '@/components/contexts/useGlobalContext';

/**
 * The PerfilScreen component displays user profile information and provides
 * functionalities like image selection, upload, and local notifications.
 */
const PerfilScreen = () => {
    const { user } = useGlobalContext();
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';

    const [image, setImage] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);

    /**
     * Calculates the user's age based on their date of birth.
     */
    const calculateAge = (birthDate: string): number => {
        const birthDateObj = new Date(birthDate);
        const today = new Date();

        let age = today.getFullYear() - birthDateObj.getFullYear();

        const monthDiff = today.getMonth() - birthDateObj.getMonth();
        const dayDiff = today.getDate() - birthDateObj.getDate();

        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }

        return age;
    };

    useEffect(() => {
        // Request notification permissions on component mount
        const requestPermissions = async () => {
            const { status } = await Notifications.getPermissionsAsync();
            if (status !== 'granted') {
                await Notifications.requestPermissionsAsync();
            }
        };
        requestPermissions();
    }, []);

    /**
     * Schedules a local notification.
     */
    const scheduleNotification = async () => {
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

    /**
     * Opens the image picker to select an image from the gallery.
     */
    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.5,
            });

            if (!result.canceled) {
                setImage(result.assets[0].uri);
            } else {
                Alert.alert(
                    'Delete',
                    'Are you sure you want to delete the image?',
                    [
                        { text: 'Yes', onPress: () => setImage(null) },
                        { text: 'No' },
                    ]
                );
            }
        } catch (error) {
            console.error('Error reading an image:', error);
        }
    };

    /**
     * Converts a file URI to a Base64 string.
     */
    const convertUriToBase64 = async (uri: string): Promise<string> => {
        try {
            return await FileSystem.readAsStringAsync(uri, {
                encoding: FileSystem.EncodingType.Base64,
            });
        } catch (error) {
            console.error('Error converting file to Base64:', error);
            throw error;
        }
    };

    /**
     * Uploads the selected image (currently displays Base64 for demonstration).
     */
    const uploadImage = async (): Promise<void> => {
        if (!image) {
            Alert.alert('No image selected', 'Please select an image before uploading.');
            return;
        }

        try {
            setUploading(true);

            const base64Image = await convertUriToBase64(image);

            // Placeholder: display Base64 string as an alert
            Alert.alert('Base64 Image', base64Image);
        } catch (error) {
            console.error('Upload failed:', error);
            Alert.alert(
                'Upload failed',
                'Something went wrong while uploading the image.'
            );
        } finally {
            setUploading(false);
        }
    };

    return (
        <View
            style={[
                perfilScreenStyles.container,
                isDarkMode ? themeDark.darkBackground : themeLight.lightBackground,
            ]}
        >
            {/* Profile Image Section */}
            <View style={perfilScreenStyles.profileImageContainer}>
                {image ? (
                    <>
                        <Image source={{ uri: image }} style={perfilScreenStyles.image} />
                        <Button
                            title={uploading ? 'Uploading...' : 'Upload Image'}
                            onPress={uploadImage}
                            disabled={uploading}
                        />
                    </>
                ) : (
                    <Image
                        source={require('../../assets/images/user.png')}
                        style={perfilScreenStyles.profileImage}
                    />
                )}
                <Button title="Pick an image from gallery" onPress={pickImage} />
            </View>

            {/* User Information Section */}
            <View style={perfilScreenStyles.infoContainer}>
                <Text style={perfilScreenStyles.label}>Usuario:</Text>
                <Text style={perfilScreenStyles.value}>{user?.username}</Text>
            </View>
            <View style={perfilScreenStyles.infoContainer}>
                <Text style={perfilScreenStyles.label}>Email:</Text>
                <Text style={perfilScreenStyles.value}>{user?.email}</Text>
            </View>
            <View style={perfilScreenStyles.infoContainer}>
                <Text style={perfilScreenStyles.label}>Edad:</Text>
                <Text style={perfilScreenStyles.value}>
                    {calculateAge(user?.dateOfBirth ?? '')}
                </Text>
            </View>

            {/* Notification Button */}
            <Button title="Schedule Notification" onPress={scheduleNotification} />
        </View>
    );
};

export default PerfilScreen;

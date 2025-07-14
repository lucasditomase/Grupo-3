import React, { useEffect, useState } from 'react';
import perfilScreenStyles from '../../components/styles/perfilStyles';
import themeDark from '../../components/themes/themeDark';
import themeLight from '../../components/themes/themeLight';
import {
    Image,
    Text,
    View,
    useColorScheme,
    Alert,
    ActivityIndicator,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import * as Notifications from 'expo-notifications';
import * as ImagePicker from 'expo-image-picker';
import { useGlobalContext } from '../../components/contexts/useGlobalContext';
import { signOut, uploadImageToDatabase } from '../../components/api';
import { calculateAge } from '../../components/api';
import { useRouter, useRootNavigationState } from 'expo-router';

const SERVER_URL = process.env.EXPO_PUBLIC_SERVER_URL;

const PerfilScreen = () => {
    const router = useRouter();
    const rootNavigation = useRootNavigationState();
    const { user, setUser } = useGlobalContext();
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';
    const [image, setImage] = useState<string | null>(null);
    const [serverImage, setServerImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    const handleSignOut = () => {
        signOut(setUser);
    };

    useEffect(() => {
        if (!rootNavigation?.key) return;

        if (!user) {
            router.replace('/login');
            return;
        }

        const requestPermissions = async () => {
            const { status } = await Notifications.getPermissionsAsync();
            if (status !== 'granted') {
                await Notifications.requestPermissionsAsync();
            }
        };

        const checkServerImage = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `${SERVER_URL}/uploads/${user?.userId}.jpg`
                );
                if (response.ok) {
                    setServerImage(`${SERVER_URL}/uploads/${user?.userId}.jpg`);
                } else {
                    setServerImage(null);
                }
            } catch (error) {
                console.error('Error checking server image:', error);
                setServerImage(null);
            } finally {
                setLoading(false);
            }
        };

        requestPermissions();
        checkServerImage();
    }, [user, rootNavigation]);

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
            }
        } catch (error) {
            console.error('Error selecting image:', error);
        }
    };

    const cancelUpload = () => {
        setImage(null); // Clear the selected image
    };

    const uploadImage = async (): Promise<void> => {
        if (!image) {
            Alert.alert(
                'No image selected',
                'Please select an image before uploading.'
            );
            return;
        }

        try {
            setUploading(true);

            await uploadImageToDatabase(user?.token, image);
            setServerImage(image); // Use the local image URI for immediate display
            setImage(null); // Clear the local image
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

    const scheduleNotification = async () => {
        try {
            const identifier = await Notifications.scheduleNotificationAsync({
                content: {
                    title: '¡Hola!',
                    body: 'Recuerda revisar tus hábitos hoy. 📝',
                    data: { screen: 'Habitos' },
                },
                trigger: {
                    seconds: 5, // Notification will trigger after 5 seconds
                },
            });
            console.log('Notification Identifier:', identifier);
        } catch (error) {
            console.error('Error scheduling notification:', error);
            Alert.alert(
                'Error',
                'Something went wrong while scheduling the notification.'
            );
        }
    };

    if (loading) {
        return (
            <View style={perfilScreenStyles.container}>
                <ActivityIndicator size="large" color="#4caf50" />
            </View>
        );
    }

    return (
        <ScrollView

            style={[
                isDarkMode
                    ? themeDark.darkBackground
                    : themeLight.lightBackground,
            ]}
            contentContainerStyle={perfilScreenStyles.scrollContainer}

        >
            <View style={perfilScreenStyles.profileImageContainer}>
                {!serverImage && !image && (
                    <Image
                        source={require('../../assets/images/user.png')}
                        style={perfilScreenStyles.profileImage}
                    />
                )}

                {serverImage && !image && (
                    <Image
                        source={{
                            uri: serverImage,
                        }}
                        style={perfilScreenStyles.image}
                    />
                )}
                {image && (
                    <Image
                        source={{ uri: image }}
                        style={perfilScreenStyles.image}
                    />
                )}

                {image && (
                    <View style={perfilScreenStyles.actionContainer}>
                        <TouchableOpacity
                            style={[perfilScreenStyles.button, perfilScreenStyles.actionButton]}
                            onPress={uploadImage}
                            disabled={uploading}
                        >
                            <Text style={perfilScreenStyles.buttonText}>
                                {uploading ? 'Uploading...' : 'Upload Image'}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[perfilScreenStyles.button, perfilScreenStyles.actionButton]}
                            onPress={cancelUpload}
                        >
                            <Text style={perfilScreenStyles.buttonText}>
                                Cancelar Subida
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}

                {!image && (
                    <TouchableOpacity
                        style={perfilScreenStyles.button}
                        onPress={pickImage}
                    >
                        <Text style={perfilScreenStyles.buttonText}>
                            Pick an image from gallery
                        </Text>
                    </TouchableOpacity>
                )}
            </View>

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
                    {user?.dateOfBirth
                        ? calculateAge(user.dateOfBirth).toString()
                        : ''}
                </Text>
            </View>
            <TouchableOpacity
                style={perfilScreenStyles.button}
                onPress={scheduleNotification}
            >
                <Text style={perfilScreenStyles.buttonText}>
                    Schedule Notification
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={perfilScreenStyles.button}
                onPress={handleSignOut}
            >
                <Text style={perfilScreenStyles.buttonText}>Cerrar sesión</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default PerfilScreen;

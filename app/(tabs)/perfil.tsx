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
} from 'react-native';
import * as Notifications from 'expo-notifications';
import * as ImagePicker from 'expo-image-picker';
import { useGlobalContext } from '../../components/contexts/useGlobalContext';
import { signOut, uploadImageToDatabase } from '../../components/api';
import { calculateAge, scheduleNotification } from '../../components/api';
import { router } from 'expo-router';

const SERVER_URL = process.env.EXPO_PUBLIC_SERVER_URL;

const PerfilScreen = () => {
    const { user, setUser } = useGlobalContext();
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';
    const [image, setImage] = useState<string | null>(null);
    const [serverImage, setServerImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (!user) {
            // Redirect to ProgresoScreen if user is not set
            router.replace('/');
            return;
        }
    });

    const handleSignOut = () => {
        signOut(setUser);
    };

    useEffect(() => {
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
    }, [user]);

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
                Alert.alert('Cancel', 'Image selection canceled.');
            }
        } catch (error) {
            console.error('Error selecting image:', error);
        }
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

    if (loading) {
        return (
            <View style={perfilScreenStyles.container}>
                <ActivityIndicator size="large" color="#4caf50" />
            </View>
        );
    }

    return (
        <View
            style={[
                perfilScreenStyles.container,
                isDarkMode
                    ? themeDark.darkBackground
                    : themeLight.lightBackground,
            ]}
        >
            <View style={perfilScreenStyles.profileImageContainer}>
                {!serverImage && !image && (
                    <Image
                        source={require('../../assets/images/user.png')}
                        style={perfilScreenStyles.profileImage}
                    />
                )}

                {serverImage && (
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
                    <TouchableOpacity
                        style={perfilScreenStyles.button}
                        onPress={uploadImage}
                        disabled={uploading}
                    >
                        <Text style={perfilScreenStyles.buttonText}>
                            {uploading ? 'Uploading...' : 'Upload Image'}
                        </Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity
                    style={perfilScreenStyles.button}
                    onPress={pickImage}
                >
                    <Text style={perfilScreenStyles.buttonText}>
                        Pick an image from gallery
                    </Text>
                </TouchableOpacity>
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
                    {calculateAge(user?.dateOfBirth ?? '')}
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
        </View>
    );
};

export default PerfilScreen;

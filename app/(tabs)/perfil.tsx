import React, { useEffect, useState } from 'react';
import perfilScreenStyles from '../../styles/perfilStyles';
import themeDark from '../../themes/themeDark';
import themeLight from '../../themes/themeLight';
import { Image, Text, TextInput, View, useColorScheme, Button, Alert, StyleSheet } from 'react-native';
import { useGlobalContext } from '../../views/contexts/useGlobalContext';
import * as Notifications from 'expo-notifications';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const PerfilScreen = () => {
    const [inputText1, setInputText1] = useState('');
    const [inputText2, setInputText2] = useState('');
    const [inputText3, setInputText3] = useState('');
    const [inputText4, setInputText4] = useState('');
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';
    const [image, setImage] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);

    const { globalData, setGlobalData } = useGlobalContext();

    const updateUser = () => {
        setGlobalData({ ...globalData, user: { name: 'John Doe', age: 30 } });
    };

    useEffect(() => {
        const requestPermissions = async () => {
            const { status } = await Notifications.getPermissionsAsync();
            if (status !== 'granted') {
                await Notifications.requestPermissionsAsync();
            }
        };
        requestPermissions();
    }, []);

    const scheduleNotification = async () => {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Hello!",
                body: "This is a local notification.",
                data: { extraData: "Some data" },
            },
            trigger: {
                seconds: 5,
                repeats: false,
            },
        });
    };

    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.5
            });

            if (!result.canceled) {
                setImage(result.assets[0].uri);
            } else Alert.alert('Delete', 'Are you sure you want to delte the image', [
                { text: "Yes", onPress: () => setImage(null) }, { text: "No" }])

        } catch (error) {
            console.log("error reading an image")

        }
    }

    const convertUriToBase64 = async (uri: string): Promise<string> => {
        try {
            return await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
        } catch (error) {
            console.error('Error converting file to Base64:', error);
            throw error;
        }
    };

    const uploadImage = async (): Promise<void> => {
        if (!image) {
            Alert.alert('No image selected', 'Please select an image before uploading.');
            return;
        }

        try {
            setUploading(true);

            const base64Image = await convertUriToBase64(image);

            Alert.alert(base64Image)

        } catch (error) {
            console.error('Upload failed:', error);
            Alert.alert('Upload failed', 'Something went wrong while uploading the image.');
        } finally {
            setUploading(false);
        }
    };
    return (
        <View style={[perfilScreenStyles.container, isDarkMode ? themeDark.darkBackground : themeLight.lightBackground]}>
            <Image
                source={require('../../assets/images/user.png')}
                style={perfilScreenStyles.profileImage} />
            <View style={perfilScreenStyles.infoContainer}>
                <Text style={perfilScreenStyles.label}>Nombre:</Text>
                <TextInput
                    onChangeText={setInputText1}
                    placeholder="Juan"
                    style={perfilScreenStyles.value}
                    value={inputText1} />
            </View>
            <View style={perfilScreenStyles.infoContainer}>
                <Text style={perfilScreenStyles.label}>Apellido:</Text>
                <TextInput
                    onChangeText={setInputText2}
                    placeholder="Pérez"
                    style={perfilScreenStyles.value}
                    value={inputText2} />
            </View>
            <View style={perfilScreenStyles.infoContainer}>
                <Text style={perfilScreenStyles.label}>Edad:</Text>
                <TextInput
                    onChangeText={setInputText3}
                    placeholder="30"
                    style={perfilScreenStyles.value}
                    value={inputText3} />
            </View>
            <View style={perfilScreenStyles.infoContainer}>
                <Text style={perfilScreenStyles.label}>Email:</Text>
                <TextInput
                    onChangeText={setInputText4}
                    placeholder="juan.perez@email.com"
                    style={perfilScreenStyles.value}
                    value={inputText4} />
            </View>
            <Text>User: {globalData.user ? globalData.user.name : 'No user logged in'}</Text>
            <Text>Theme: {globalData.theme}</Text>
            <Button title="Login User" onPress={updateUser} />
            <Button title="Schedule Notification" onPress={scheduleNotification} />
            <View style={styles.container}>
                <Button title="Pick an image from gallery" onPress={pickImage} />
                {image && <Image source={{ uri: image }} style={styles.image} />}
                {image && (
                    <Button
                        title={uploading ? 'Uploading...' : 'Upload Image'}
                        onPress={uploadImage}
                        disabled={uploading}
                    />
                )}
                {!image && <Text style={styles.text}>No image selected</Text>}
            </View>
        </View>
    );
};

export default PerfilScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginTop: 20,
    },
    text: {
        marginTop: 20,
        fontSize: 16,
        color: 'gray',
    },
});
const SERVER_URL = process.env.EXPO_PUBLIC_SERVER_URL;
export const uploadImageToDatabase = async (
    token: string | null | undefined,
    image: string
) => {
    sendUploadImageRequest(token, image);
};
const sendUploadImageRequest = async (
    token: string | null | undefined,
    image: string
) => {
    const formData = new FormData();
    const file = {
        uri: image,
        type: 'image/jpeg',
        name: `profile_picture.jpg`,
    };

    formData.append('profile_picture', file);
    return await fetch(SERVER_URL + '/upload-profile-picture', {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,
        },
        body: formData,
    });
};

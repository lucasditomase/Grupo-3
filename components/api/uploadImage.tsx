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
    // If you are using React Native, append as follows:
    formData.append('profile_picture', {
        uri: image,
        type: 'image/jpeg',
        name: 'profile_picture.jpg',
    } as any);

    // If you are in a web environment, use Blob:
    // const response = await fetch(image);
    // const blob = await response.blob();
    // formData.append('profile_picture', blob, 'profile_picture.jpg');
    return await fetch(SERVER_URL + '/upload-profile-picture', {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token,
        },
        body: formData,
    });
};

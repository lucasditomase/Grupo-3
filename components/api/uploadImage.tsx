const SERVER_URL = process.env.EXPO_PUBLIC_SERVER_URL;
export const uploadImageToDatabase = async (
    token: string | null | undefined,
    image: string
) => {
    // Ensure token is not undefined
    const safeToken = token ?? null;

    return sendUploadImageRequest(safeToken, image);
};

const sendUploadImageRequest = async (token: string | null, image: string) => {
    const formData = new FormData();

    // Convert the URI to a Blob
    const response = await fetch(image);
    const blob = await response.blob();

    // Append the Blob to the FormData
    formData.append('profile_picture', blob, 'profile.jpg');

    // Send the request
    return await fetch(SERVER_URL + '/upload-profile-picture', {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + token,
        },
        body: formData,
    });
};


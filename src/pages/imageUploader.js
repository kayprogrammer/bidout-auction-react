const apiKey = process.env.REACT_APP_CLOUDINARY_API_KEY
const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME

export const uploadImage = async (file, publicId, signature, timestamp) => {
    const fd = new FormData()
    fd.append('file', file)
    fd.append('public_id', publicId)
    fd.append('signature', signature)
    fd.append('api_key', apiKey)
    fd.append('timestamp', timestamp)

    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: 'POST',
            body: fd
        });

        if (response.ok) {
            console.log('Image uploaded successfully');
        } else {
            console.error('Image upload failed');
        }
    } catch (error) {
        console.error('Image upload error:', error);
    }
}
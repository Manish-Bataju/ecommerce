export const getCroppedImg = (imageSrc, cropAreaPixels) => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = imageSrc;
        
        // FIX: lowercase 'onload'
        image.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = cropAreaPixels.width;
            canvas.height = cropAreaPixels.height;
            const ctx = canvas.getContext("2d");

            ctx.drawImage(
                image,
                cropAreaPixels.x,
                cropAreaPixels.y,
                cropAreaPixels.width, 
                cropAreaPixels.height,
                0,
                0,
                cropAreaPixels.width,
                cropAreaPixels.height
            );

            // You can use toDataURL for smaller strings or toBlob for files
            // For a small swatch, toDataURL is usually easier to save in a form
            const base64Image = canvas.toDataURL("image/jpeg");
            resolve(base64Image);
        };
        
        image.onerror = (err) => reject(err);
    });
}
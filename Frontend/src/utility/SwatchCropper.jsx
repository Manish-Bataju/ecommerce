import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import {getCroppedImg} from './getCroppedImg.js';

export const SwatchCropper = ({ imageSrc, onCropComplete }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  // This is the internal logic for the cropper
  const onCropCompleteInternal = useCallback((_area, pixels) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const handleSave = async (e) => {
    // Prevent form submission if this button is inside a form
    e.preventDefault(); 
    e.stopPropagation();

    if (!croppedAreaPixels) return;

    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      if (croppedImage) {
        onCropComplete(croppedImage);
      }
    } catch (e) {
      console.error("Cropping failed:", e);
      alert("Failed to crop image. Please try a different photo.");
    }
  };

  return (
    <div className="flex flex-col gap-4 border p-4 bg-white rounded-lg shadow-md mt-2">
      {/* Container MUST have a fixed height or it crashes */}
      <div className="relative w-full h-64 bg-gray-900 rounded overflow-hidden">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onCropComplete={onCropCompleteInternal}
          onZoomChange={setZoom}
        />
      </div>
      
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
           <span className="text-[10px] font-bold">ZOOM:</span>
           <input 
            type="range" 
            min="1" max="3" step="0.1" 
            value={zoom} 
            onChange={(e) => setZoom(Number(e.target.value))} 
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        
        <button 
          type="button" 
          onClick={handleSave}
          disabled={!croppedAreaPixels}
          className={`py-2 rounded font-bold text-white transition-colors ${
            !croppedAreaPixels ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          Confirm & Save Swatch
        </button>
      </div>
    </div>
  );
};
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import {SwatchCropper} from "../utility/SwatchCropper.jsx";

const localDate = new Date().toLocaleDateString('en-CA');

// 1. SUB-COMPONENT FOR EACH VARIANT
const VariantItem = ({ index, control, register, remove, setValue }) => {
  const variantType = useWatch({ control, name: `variants.${index}.variantType`, defaultValue: "color" });
  const hexValue = useWatch({ control, name: `variants.${index}.hexValue` });
  const swatchImage = useWatch({ control, name: `variants.${index}.swatchImage` });
  const tempMasterImage = useWatch({ control, name: `variants.${index}.tempMasterImage` });
  const imageFiles = useWatch({ control, name: `variants.${index}.images` });

  return (
    <div className="border p-4 rounded-lg bg-gray-50 mb-6 flex flex-col gap-4">
      {/* 1. Header & Type Selector */}
      <div className="flex justify-between items-center border-b pb-2">
        <h4 className="font-bold text-gray-700">Variant #{index + 1}</h4>
        <button type="button" onClick={() => remove(index)} className="text-red-500 text-xs font-bold uppercase">Remove</button>
      </div>

      <select {...register(`variants.${index}.variantType`)} className="border p-2 rounded-md bg-white">
        <option value="color">Solid Color</option>
        <option value="printed">Printed Fabric</option>
      </select>

      {/* 2. Logic Switch */}
      {variantType === "color" ? (
        <div className="flex items-center gap-4 p-3 bg-white border rounded">
          <input {...register(`variants.${index}.hexValue`)} placeholder="Hex Code (#000000)" className="border p-2 flex-1 uppercase font-mono" />
          <div className="w-10 h-10 rounded-full border shadow-sm" style={{ backgroundColor: hexValue || '#eee' }} />
        </div>
      ) : (
        <div className="p-3 bg-white border rounded flex flex-col gap-3">
          <input {...register(`variants.${index}.printName`)} placeholder="Print Name" className="border p-2 rounded" />
          
          <div className="bg-gray-100 p-2 rounded border-dashed border-2">
            <p className="text-[10px] font-bold mb-2">FABRIC SWATCH</p>
            <input 
              type="file" 
              accept="image/*" 
              className="text-xs"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = () => setValue(`variants.${index}.tempMasterImage`, reader.result);
                  reader.readAsDataURL(file);
                }
              }} 
            />

            {/* Cropper appears only when a file is chosen */}
            {tempMasterImage && (
              <div className="mt-2">
                <SwatchCropper 
                    imageSrc={tempMasterImage} 
                    onCropComplete={(croppedBase64) => {
                      // Wrap this in a small timeout or ensure it's a simple state update
                      // to prevent React from colliding with the cropper's internal state
                      setValue(`variants.${index}.swatchImage`, croppedBase64);
                      setValue(`variants.${index}.tempMasterImage`, null); 
                    }} 
                  />
              </div>
            )}

            {/* Resulting Crop Preview */}
            {swatchImage && !tempMasterImage && (
              <div className="mt-2 flex items-center gap-2">
                <img src={swatchImage} className="w-12 h-12 rounded-full border-2 border-white shadow" alt="Swatch" />
                <span className="text-[10px] text-green-600 font-bold uppercase tracking-tighter">Swatch Set!</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. Common Gallery (Visible for both) */}
      <div className="flex flex-col gap-2 pt-2 border-t">
        <label className="text-[10px] font-bold text-gray-500">VARIANT IMAGES (MODEL PHOTOS)</label>
        <input type="file" multiple {...register(`variants.${index}.images`)} className="text-xs" />
        
        {imageFiles && imageFiles.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-1">
            {Array.from(imageFiles).map((file, i) => (
              <div key={i} className="aspect-square rounded overflow-hidden border">
                <img src={URL.createObjectURL(file)} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};



// 2. MAIN FORM COMPONENT
const ProductFrom = () => {
  const { register, control, handleSubmit, setValue, formState: { errors } } = useForm({
    mode: "all",
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      discount: {
        discountType: 'None',
        value: 0,
        startDate: localDate,
        endDate: localDate,
      },
      gender: 'Unisex',
      variants: [{
        variantType: 'color',
        hexValue: '#FFFFFF',
        printName: '',
        swatchImage: '',
        images: [],
        inventory: [{ size: 'New Born', stock: 0 }]
      }],
      fabric: 'Organic Cotton',
      clothingCategory: 'Tops',
      tags: [],
      ageGroup: []
    }
  });

  const { fields, append, remove } = useFieldArray({ control, name: "variants" });

  const discountType = useWatch({ control, name: "discount.discountType" });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="flex flex-col ml-10 mx-auto px-5 py-8 w-[45vw] border-2 rounded-lg bg-white shadow-xl">
      <h1 className="text-2xl font-bold text-center mb-6">Add a Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        
        {/* Title */}
        <div className="flex flex-col gap-1">
          <label className="font-bold text-gray-700">Title</label>
          <input 
            {...register('title', { required: "Required", minLength: 10 })}
            className="border rounded-md p-2 w-full"
            placeholder="Product Title"
          />
          {errors.title && <span className="text-red-500 text-xs">{errors.title.message}</span>}
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label className="font-bold text-gray-700">Description</label>
          <textarea
            {...register("description", { required: "Required" })}
            className="border p-2 rounded-md h-24"
          />
        </div>

        {/* Price & Discount Section */}
        <div className="grid grid-cols-2 gap-4 border p-3 rounded-md bg-gray-50">
          <div className="flex flex-col gap-1">
            <label className="font-bold">Price</label>
            <input 
              type="number" 
              {...register("price", { min: 0 })} 
              className="border p-1 rounded" 
              onWheel={(e) => e.target.blur()}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-bold">Discount Type</label>
            <select {...register("discount.discountType")} className="border p-1 rounded">
              <option value="none">None</option>
              <option value="Percentage">Percentage</option>
              <option value="Fixed Amount">Fixed Amount</option>
            </select>
          </div>
        </div>

        {/* Variants Loop */}
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-4 border-b pb-2 text-blue-600">Product Variants</h3>
          {fields.map((field, index) => (
            <VariantItem 
              key={field.id} 
              index={index} 
              control={control} 
              register={register} 
              errors={errors} 
              remove={remove}
              setValue={setValue}
            />
          ))}

          <button 
            type="button" 
            onClick={() => append({ variantType: "color", hexValue: "#FFFFFF", images: [] })}
            className="w-full py-3 border-2 border-dashed border-blue-400 text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition-all"
          >
            + Add Another Variant
          </button>
        </div>

        <button 
          type="submit" 
          className="bg-green-600 text-white font-bold py-3 rounded-lg mt-4 hover:bg-green-700 shadow-lg"
        >
          Submit Product
        </button>
      </form>
    </div>
  );
};

export default ProductFrom;
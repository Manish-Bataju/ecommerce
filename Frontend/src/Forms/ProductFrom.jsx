import { useFieldArray, useForm, useWatch } from "react-hook-form";
import {SwatchCropper} from "../utility/SwatchCropper.jsx";
import { Category_Map, CategoryConfig } from "../data/CategoryConfig.js";
import { useRef, useState} from "react";
import CategorySelector from "../Components/CategorySelector.jsx";

const localDate = new Date().toLocaleDateString('en-CA');

// 1. SUB-COMPONENT FOR EACH VARIANT

function ColorVariantItem({ fieldId, index, control, register, remove, setValue, errors }){

  const [selectedCategory, setSelectedCategory] = useState("")

  const inventoryValue = useWatch({
    control, name: `variants.color.${index}.inventory`
  }) || [];

  const hexValue = useWatch({
    control, name: `variants.color.${index}.hexValue`
  }) || "";

  const colorImages = useWatch({
    control, name: `variants.color.${index}.colorImages`
  }) || [];

  const fileInputref = useRef(null);

  // useEffect(() => { if (hexValue) { console.log("Hex value changed:", hexValue); } }, [hexValue]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between">
        <h4 className="text-xl font-bold text-blue-600">Color Variant #{index+1}</h4>
        <button type="button" onClick={() => remove(index)} className="text-red-500 text-xs font-bold uppercase">Remove</button>
      </div>
      <div className="bg-gray-400 border"></div>

      <div className="flex gap-2">
       <input {...register(`variants.color.${index}.hexValue`)} placeholder="Hex Code (#000000)" className="border p-2 rounded-md w-1/2 uppercase font-mono" />
       <div className="w-10 h-10 rounded-full border shadow-sm whitespace-nowrap" style={{ backgroundColor: hexValue || '#eee' }} />
      </div>
      
       {/*Images Array */}
           <input
           ref={fileInputref}
           type='file'
           multiple
           style={{display: "none"}}
           accept= "image/*"
           className="mt-4"
           onChange={(e)=>{
           const newFiles = Array.from(e.target.files || []);
            // Merge old files with new ones..
           const updatedFiles = [...(colorImages || []), ...newFiles]
           setValue(`variants.color.${index}.colorImages`, updatedFiles, {shouldDirty: true});
           }}
           />
            <div className="flex gap-2 items-center ">
            <button onClick={()=> fileInputref.current?.click()} className="border px-2 py-1 rounded-md">Upload Images</button>
            <div>{colorImages.length === 0? "No files selected" : `${colorImages.length} files selected`}</div>
            </div>

            {/* Displaying those images stored in the variants */}
           <div className="flex gap-2 flex-wrap">
              {colorImages.map((file, i)=>(
              <div key={i} className="relative w-20 h-20">
                 <img src={URL.createObjectURL(file)} className=" w-full h-full object-cover hover:scale-110"
                 alt={`color variant ${i}`}/>

               {/* Delete button overlay */}
                <button
                type="button"
                className="absolute top-1 right-1 bg-red-600 text-white text-[10px] px-1 rounded"
                onClick={() => {
                    const updated = colorImages.filter((_, idx) => idx !== i);
                    setValue(`variants.color.${index}.colorImages`,updated, {shouldDirty: true});
                    if(fileInputref.current){
                      fileInputref.current.value = ""; 
                    }
                  }}
                >
                  ✕
                </button>
            </div>
            ))}
           </div>

            {/* Step 2: dropdown */}
          <select
          id={`category-select-${fieldId}`}
          value={selectedCategory || ""}
          onChange={(e) => {
            const newCategory = e.target.value
            setSelectedCategory(newCategory);

            if(newCategory){
              const sizes = Category_Map[newCategory].sizes;
              setValue(`variants.color.${index}.inventory`,
              sizes.map(size => ({size, stock:0}))
              )
            }
          }}
          className="border rounded px-2 py-1"
          >
            <option value="">Select Category</option>
            {Object.entries(Category_Map).map(([key, group]) => (
              <option key={key} value={key}>
                {key} - {group.description}
              </option>
            ))}
          </select>

      {/* Step 3: render sizes only for selected category */}
      {selectedCategory && (
        <div className="mt-4">
          <h4 className="font-bold text-sm">
            {Category_Map[selectedCategory].description}
          </h4>
          {Category_Map[selectedCategory].sizes.map((size, i) => {
              const stockValue = inventoryValue[i]?.stock; // safe lookup

             
          return (
          <div key={size} className="flex gap-2 justify-between flex-nowrap">
          <div className="flex-1 grid grid-cols-2 items-start gap-1">
          <label htmlFor={`stock-${index}-${i}`} >{size}</label>
          <div className="flex flex-col">
              <input
              id={`stock-color-${index}-${i}`}
              type="number"
              {...register(`variants.color.${index}.inventory.${i}.stock`, {
                required: "Stock is required",
                validate: (value) => {
                  if (value === undefined || value === null || Number.isNaN(value)) {
                    return "Stock is required"; 
                  } if (value < 0) {
                    return "Numbers can't be negative";
                  } return true; }
              })}
              className={`border rounded px-1 cursor-pointer row-span-2 ${stockValue < 0 ? "border-red-500" : "border-gray-300"}`}
            />
            {errors?.variants?.color?.[index]?.inventory?.[i]?.stock && (
              <span className="text-red-500 text-xs text-center col-span-2 ">
            {errors.variants?.color?.[index].inventory?.[i]?.stock.message}
              </span>
            )}
          </div>
          
          </div>
          </div>

        )})}

        </div>
      )}
    </div>
  )
}
 
function PrintVariantItem({ fieldId, index, control, register, remove, setValue, errors }){

  const [selectedCategory, setSelectedCategory] = useState("")

  const inventoryValue = useWatch({
    control, name: `variants.print.${index}.inventory`
  }) || [];

  const printImages = useWatch({
    control, name: `variants.print.${index}.printImages`
  }) || [];

  const tempMasterImage = useWatch({
    control, name:`variants.print.${index}.tempMasterImage`
  }) || null;

  const swatchImage = useWatch({
    control, name:`variants.print.${index}.swatchImage`
  }) || "";

  const fileInputref = useRef(null);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between">
        <h4 className="text-xl font-bold text-blue-600">Print Variant #{index+1}</h4>
        <button type="button" onClick={() => remove(index)} className="text-red-500 text-xs font-bold uppercase">Remove</button>
      </div>
      
      <div className="bg-gray-400 border"></div>

      <input {...register(`variants.print.${index}.printName`)} placeholder="Print Name" className="border p-2 rounded" />

       {/* Cropper appears only when a file is chosen */}
            {tempMasterImage && (
              <div className="mt-2">
                <SwatchCropper 
                    imageSrc={tempMasterImage} 
                    onCropComplete={(croppedBase64) => {
                      // Wrap this in a small timeout or ensure it's a simple state update
                      // to prevent React from colliding with the cropper's internal state
                      setValue(`variants.print.${index}.swatchImage`, croppedBase64);
                      setValue(`variants.print.${index}.tempMasterImage`, null); 
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


      
       {/*Images Array */}
           <input
           ref={fileInputref}
           type='file'
           multiple
           style={{display: "none"}}
           accept= "image/*"
           className="mt-4"
           onChange={(e)=>{
           const newFiles = Array.from(e.target.files || []);
            // Merge old files with new ones..
           const updatedFiles = [...(printImages || []), ...newFiles]
           setValue(`variants.print.${index}.printImages`, updatedFiles, {shouldDirty: true});
           }}
           />
            <div className="flex gap-2 items-center ">
            <button onClick={()=> fileInputref.current?.click()} className="border px-2 py-1 rounded-md">Upload Images</button>
            <div>{printImages.length === 0? "No files selected" : `${printImages.length} files selected`}</div>
            </div>

            {/* Displaying those images stored in the variants */}
           <div className="flex gap-2 flex-wrap">
              {printImages.map((file, i)=>(
              <div key={i} className="relative w-20 h-20">
                 <img src={URL.createObjectURL(file)} className=" w-full h-full object-cover hover:scale-110"
                 alt={`Print variant ${i}`}/>

               {/* Delete button overlay */}
                <button
                type="button"
                className="absolute top-1 right-1 bg-red-600 text-white text-[10px] px-1 rounded"
                onClick={() => {
                    const updated = printImages.filter((_, idx) => idx !== i);
                    setValue(`variants.print.${index}.printImages`,updated, {shouldDirty: true});
                    if(fileInputref.current){
                      fileInputref.current.value = ""; 
                    }
                  }}
                >
                  ✕
                </button>
            </div>
            ))}
           </div>

              {/* Inventory Section */}
              {/* Step 2: dropdown */}
          <select
          id={`category-select-${fieldId}`}
          value={selectedCategory || ""}
          onChange={(e) => {
            const newCategory = e.target.value
            setSelectedCategory(newCategory);

            if(newCategory){
              const sizes = Category_Map[newCategory].sizes;
              setValue(`variants.print.${index}.inventory`,
              sizes.map(size => ({size, stock:0}))
              )
            }
          }}
          className="border rounded px-2 py-1"
          >
            <option value="">Select Category</option>
            {Object.entries(Category_Map).map(([key, group]) => (
              <option key={key} value={key}>
                {key} - {group.description}
              </option>
            ))}
          </select>
              {/* Step 3: render sizes only for selected category */}
          {selectedCategory && (
        <div className="mt-4">
          <h4 className="font-bold text-sm">
            {Category_Map[selectedCategory].description}
          </h4>
          {Category_Map[selectedCategory].sizes.map((size, i) => {
              const stockValue = inventoryValue[i]?.stock; // safe lookup

             
          return (
          <div key={size} className="flex gap-2 justify-between flex-nowrap">
          <div className="flex-1 grid grid-cols-2 items-start gap-1">
          <label htmlFor={`stock-${index}-${i}`} >{size}</label>
          <div className="flex flex-col">
              <input
              id={`stock-${index}-${i}`}
              type="number"
              {...register(`variants.print.${index}.inventory.${i}.stock`, {
                required: "Stock is required",
                validate: (value) => {
                  if (value === undefined || value === null || Number.isNaN(value)) {
                    return "Stock is required"; 
                  } if (value < 0) {
                    return "Numbers can't be negative";
                  } return true; }
              })}
              className={`border rounded px-1 cursor-pointer row-span-2 ${stockValue < 0 ? "border-red-500" : "border-gray-300"}`}
            />
            {errors?.variants?.print?.[index]?.inventory?.[i]?.stock && (
              <span className="text-red-500 text-xs text-center col-span-2 ">
            {errors.variants?.print?.[index].inventory?.[i]?.stock.message}
              </span>
            )}
          </div>
          
          </div>
          </div>

        )})}

        </div>
      )}


    
    </div>
  )
}

// 2. MAIN FORM COMPONENT
const ProductFrom = () => {
  const { register, control, handleSubmit, setValue, formState: { errors } } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
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
      variants: {
        color: [{
          hexValue:"",
          inventory:[{
            size:"",
            stock: 0
          }]
        }],
        print: [{
          hexValue:"",
          tempMasterImage: null,
          swatchImage: "",
          inventory:[{
            size:"",
            stock: 0
          }]
        }]
      },
      fabric: 'Organic Cotton',
      clothingCategory: 'Tops',
      tags: [],
      ageGroup: []
    }
  });
  
  const { fields: colorFields, append: appendColor, remove: removeColor } = useFieldArray({
  control,
  name: "variants.color"   // array for color variants
});

const { fields: printFields, append: appendPrint, remove: removePrint } = useFieldArray({
  control,
  name: "variants.print"   // array for print variants
});


  // const discountType = useWatch({ control, name: "discount.discountType" });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };
  
  return (
    <div className="flex flex-col ml-10 mx-auto px-5 py-8 w-[45vw] border-2 rounded-lg bg-white shadow-xl">
      <h1 className="text-2xl font-bold text-center mb-6">Add a Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        
        {/* Title */}
        <div className="flex flex-col gap-1">
          <label className="font-bold text-gray-700">Title
          <input 
            {...register('title', {
              required: "Required", 
              minLength: {value: 10, message: "Title has to be minimum 10 Characters Long"}})}
            className="border rounded-md p-2 w-full"
            placeholder="Product Title"
          />
          </label>
          {errors.title && <span className="text-red-500 font-md text-sm">{errors.title.message}</span>}
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label className="font-bold text-gray-700">Description</label>
          <textarea
            {...register("description", { required: "Required", minLength: {value: 35, message: "Minimum 35 Characters long"}})}
            className="border p-2 rounded-md h-24"
          />
          
          {errors.description && <span className="text-red-500 text-sm font-md">{errors.description.message}</span> }
        </div>

        {/* Gender radio button */}
        <div className="flex items-center gap-2">
        <label htmlFor="gender">Gender:</label>
        
        <label htmlFor="gender" className="flex items-center gap-2">
        <input
        type="radio"
        id="gender-unisex"
        value="Unisex"
         {...register("gender")}
         defaultChecked
         />
         Unisex</label>
         

        <label htmlFor="gender" className="flex items-center gap-2">
        <input
        type="radio"
        id="gender-boy"
        value="Boy"
        {...register("gender")}
         />
        Boy</label>
        
      
        <label htmlFor="gender" className="flex items-center gap-2">
        <input
          type="radio"
          id="gender-girl"
          value="Girl"
          {...register("gender")}
          />
        Girl
        </label>
        
       
        </div>
        
        
        

        {/* Price & Discount Section */}
        <div className="grid grid-cols-2 gap-4 border p-3 rounded-md bg-gray-50">
          <div className="flex flex-col gap-1">
            <label className="font-bold">Price</label>
            <input 
              type="number" 
              {...register("price", {
                min: {value: 0, message: "Price can not be negative"}
              })} 
              className="border p-1 rounded" 
              onWheel={(e) => e.target.blur()}
              />
              
              {errors.price && <span className="text-red-500 text-sm font-md ">{errors.price.message}</span> }
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="discountType" className="font-bold">Discount Type</label>
            <select
            id="discountType"
            {...register("discount.discountType")}
            className="border p-1 rounded">
              <option value="None">None</option>
              <option value="Percentage">Percentage</option>
              <option value="Fixed Amount">Fixed Amount</option>
              <option value="Free Delivery">Free Delivery</option>
              <option value="Buy 1 Get 1 Free">Buy1 Get 1 Free</option>
            </select>
          </div>
        </div>

        {/* Fabric & Clothing Category Section Section */}
          <div className="flex gap-3">
            <div>
              <h3 className="font-bold">{CategoryConfig.fabric.title}</h3>
            <select
            name="fabric"
            id="fabric"
            className="border rounded-md shadow-xs px-2 py-1">
            {CategoryConfig.fabric.values.map((value)=>(
                <option key={value} value={value}>
                {value}
                </option>
            ))}  
            </select>   
            </div>

            <div>
              <div>
              <h3 className="font-bold">{CategoryConfig.clothing.title}</h3>
              <select
              name="clothing"
              id="clothing"
              className="border rounded-md shadow-xs px-2 py-1 ">
              {CategoryConfig.clothing.values.map((value)=>(
                  <option key={value} value={value}>
                  {value}
                  </option>
              ))}  
              </select>   
            </div>
            </div>
          </div>

        {/* Variation section */}
        <div className="border rounded-md px-5">
                {/* Variants Loop */}
          <div className="mt-6 flex flex-col gap-3">        
          {colorFields.map((field, index) => (
            <ColorVariantItem
              key={field.id}
              fieldId={field.id}
              index={index}
              register={register}
              control={control}
              remove={() => removeColor(index)}
              setValue ={setValue}
            />
          ))}
          <button
          type="button"
          onClick={() => appendColor({})}
          className="text-gray-800 cursor-pointer text-center text-md border p-2 rounded-md transition-all hover:bg-red-400 hover:text-white hover:text-xl">Add Color Variant</button>

          {/* border Line between color Variant and the Print variant */}
          <div className="border-blue-600 border shadow-lg"></div>
          {printFields.map((field, index) => (
            <PrintVariantItem
              key={field.id}
              fieldId={field.id}
              index={index}
              register={register}
              control={control}
              remove={() => removePrint(index)}
              setValue ={setValue}
            />
          ))}
          <button type="button" onClick={() => appendPrint({})}>Add Print Variant</button>
        </div>
        </div>   
        
          {/* Tags Mapped Section */}
          <div>
            <div className="flex flex-col gap-2">
                {CategoryConfig.tags.map((tagGroup)=>(
              <div key={tagGroup.title} className="mb-1">
               <CategorySelector
                title={tagGroup.title}
                categories={tagGroup.values}
                onChange={(updated)=> (`selected:`, updated)}
                />
                {/* <div className="flex gap-2 flex-wrap">
                  {tagGroup.values.map((value)=>(
                  <span key={value}
                  onClick={()=> toggleSelector(value)}
                  className="border rounded-md px-2 mr-2">
                    {value}</span>))}
                </div> */}
              </div>
            ))}
            </div>
           
          </div>  

        <button 
          type="submit" 
          className="bg-green-600 text-white font-bold py-3 rounded-lg mt-4 hover:bg-green-700 shadow-lg"
        >
          Submit Product
        </button>

        {/* this is for the fabric and tags section */}

       
      </form>
    </div>
  );
};

export default ProductFrom;
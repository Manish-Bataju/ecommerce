import { useFieldArray, useForm, useWatch } from "react-hook-form";
import {SwatchCropper} from "../utility/SwatchCropper.jsx";
import { Category_Map, CategoryConfig } from "../data/CategoryConfig.js";
import { useRef, useState, useEffect} from "react";
import CategorySelector from "../Components/CategorySelector.jsx";

const localDate = new Date().toLocaleDateString('en-CA');

// 1. SUB-COMPONENT FOR EACH VARIANT

function ColorVariantItem({ fieldId, index, control, register, remove, setValue, errors }){

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
        <h4 className="text-xl font-bold mb-4 border-b pb-2 text-blue-600">Color Variant #{index+1}</h4>
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

    
    </div>
  )
}
 
function PrintVariantItem({ fieldId, index, control, register, remove, setValue, errors }){

  const hexValue = useWatch({
    control, name: `variants.print.${index}.hexValue`
  }) || "";

  const printImages = useWatch({
    control, name: `variants.print.${index}.printImages`
  }) || [];

  const fileInputref = useRef(null);

  // useEffect(() => { if (hexValue) { console.log("Hex value changed:", hexValue); } }, [hexValue]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between">
        <h4 className="text-xl font-bold mb-4 border-b pb-2 text-blue-600">Print Variant #{index+1}</h4>
        <button type="button" onClick={() => remove(index)} className="text-red-500 text-xs font-bold uppercase">Remove</button>
      </div>
      <div className="bg-gray-400 border"></div>

      <div className="flex gap-2">
       <input {...register(`variants.print.${index}.hexValue`)} placeholder="Hex Code (#000000)" className="border p-2 rounded-md w-1/2 uppercase font-mono" />
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
                 alt={`color variant ${i}`}/>

               {/* Delete button overlay */}
                <button
                type="button"
                className="absolute top-1 right-1 bg-red-600 text-white text-[10px] px-1 rounded"
                onClick={() => {
                    const updated = printImages.filter((_, idx) => idx !== i);
                    setValue(`variants.color.${index}.printImages`,updated, {shouldDirty: true});
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

    
    </div>
  )
}


  

//   return (
//     <div key={fieldId} className="border p-4">
//       <div className="flex justify-between ">
//         <h4>Variant #{index+1}</h4>
//         <button 
//         type="button"
//         onClick={()=> remove(index)}
//         className="text-red-500 text-sm">X</button>
//       </div>

//       <div>
//           {/* Dropdown module to select Color or Print */}
//       <select
//       onChange={(e)=>{
//         if(e.target.value === "color"){
//           appendColor({}); //adds a new variant to color
//           } else if (e.target.value === "print"){
//           appendPrint({}) //adds a new variants to print
//           }
//         }}
//         name="" id="">
//         <option value="">Select a Variant</option>
//         <option value="color">Solid Color</option>
//         <option value="print">Printed Fabric</option>
//       </select>

        
//       </div>
      
//     </div>
    
//   );
// };


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
          hexValue:""
        }],
        print: [{
          hexValue:""
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

      <div className="border rounded-md px-5">
              {/* Variants Loop */}
        <div className="mt-6 flex flex-col gap-3">        
        {colorFields.map((field, index) => (
          <ColorVariantItem
            key={field.id}
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
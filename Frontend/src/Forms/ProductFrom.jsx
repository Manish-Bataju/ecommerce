import { useForm } from "react-hook-form";

const localDate = new Date().toLocaleDateString('en-CA');

const ProductFrom = () => {

  const {register, control, handleSubmit, setValue, formState: {errors}}= useForm({
    mode: "all",
    defaultValues:{
      title: '',
      description:'',
      price: 0,
      finalPrice: 0,
      discount:{
        discountType:'None',
        value: 0,
        startDate: localDate,
        endDate: localDate,
      },
      gender:'Unisex',
      variants: [{
        printName: '',
        swatchImage:'',
        images:[],
        inventory:[{
          size:'New Born',
          stock: 0,
      }]
      }],
      
      fabric: 'Organic Cotton',
      clothingCategory: 'Tops',
      tags:[],
      ageGroup: []
    }
  })

  const onSubmit =()=>(
    <h1>Hello</h1>
  );
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Title */}

      <div>
        <label htmlFor="product_title">Title</label>
        <input 
        id="product_title"
        {...register('title', 
        {
          required: "Title is required",
          minLength: {value: 10, message: "Title has to be minimum 10 characters long"},
          maxLength: {value: 35, message: "Maximum title length is 35 characters long"}
        }
      )}
          type="text" placeholder='Enter your Product Title' className='border p-2'/>
          {errors.title && <span>{errors.title.message}</span> }
      </div>

      <div>
        <label htmlFor="product_description">Description</label>
        <input type="text"
        id="product_description"
        {...register("description",
          {
          required: "Description is required",
          minLength: {value: 10, message: "Minimum 10 Characters long"},
        })}
        placeholder= "Write your description"
        className='border p-2'/>
        {errors.description && <span>{errors.description.message}</span> }
      </div>





    </form>
  )
}

export default ProductFrom

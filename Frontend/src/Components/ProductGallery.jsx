import { useEffect, useState } from 'react'
import { fetchAllProducts } from '../services/ProductService.jsx';
import {Link} from 'react-router-dom';

   // defining size Maps based on schema
    const Category_Map= {
    baby: ['New Born', '3M', '6M'],
    tots: ['9M', '12M', '18M'],
    junior: ['2Y', '3Y', '4Y'],
    kids: ['6Y', '8Y', '10Y', '12Y'],
    teen: ['13Y', '14Y', '16Y', '18Y']
};

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NPR',
  }).format(price);
};

const ProductGallery = ({categoryTitle, ageGroup}) => {

    const [products, setProducts]= useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const getProducts = async()=>{
            const allData = await fetchAllProducts();
        

        if(!ageGroup){
            setProducts(allData); //Show all for Shop/Store.
        } else {
            const targetSizes = Category_Map[ageGroup.toLowerCase()];

            const filtered = allData.filter(product => product.inventory.some(item => targetSizes.includes(item.size)));

            setProducts(filtered);
        }
        setLoading(false);
     };
        getProducts();
    }, [ageGroup])

    if(loading) return <div className='py-20 text-center font serif'>Curating the {categoryTitle} Collection....</div>

  return (
    <div>
        <nav className="my-4 ml-2 flex items-center gap-2 text-xl uppercase font-body tracking-[0.2em] text-slate-400">
            <Link to="/" className="hover:text-black transition-colors">Home</Link>
            <span className="text-[8px]">/</span>
            <span className="text-black font-semibold">{categoryTitle}</span>
        </nav>
        <div className='grid grid-cols-2 grid-rows-3 md:grid-cols-4 md:grid-rows-5 lg:grid-cols-5 lg:grid-rows-6 gap-8 mb-6 mx-8'>
            {products.map((product)=>(
            <Link to={`/product/${product.slug}`} key={product._id} className="group block">
                <div className="aspect-3/4 overflow-hidden bg-slate-50 rounded-sm">
                    <img src={product.images[0]}
                    alt={product.title}
                    className='w-full h-full object-cover grayscale-20 group-hover:grayscale-0 transition-all duration-700 hover:scale-110'/>
                </div>
                <div>
                    <h3 className='pt-3 text-md sm:text-l md:text-xl lg:text-2xl lg:font-semibold'>{product.title}</h3>
                    <div>
                    {product.tags.map((tag, index)=>(
                        <span key={index} className='text-base font-heading'><em>{tag}</em>
                        {index < product.tags.length - 1 && ', '}
                        </span>
                    ))}</div>
                    <p className='text-xl lg:text-xl lg:font-semibold'>{formatPrice(product.price)}
                        {/* Only show original price if there is a discount */}
                        {product.finalPrice < product.price && (
                        <span className="text-[10px] bg-red-50 text-red-600 px-1.5 py-0.5 rounded uppercase font-bold tracking-tighter">
                            -{Math.round(((product.price - product.finalPrice) / product.price) * 100)}%
                        </span>
                    )}
                    </p>
                    <p>{product.review}</p>
                </div>
            </Link>
            ))}
        </div>
    </div>
  );
};

export default ProductGallery
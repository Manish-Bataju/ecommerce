import { useGetProductsQuery } from "./productApi.js"

export default function AllProduct() {
  const { isLoading, data, error } = useGetProductsQuery();
  if (isLoading) return <p>Loading...</p>
  if (error) return <p>{error.data?.message}</p>


  return (
    <div>
      {data.map((product) => {
        return <div key={product._id}>
            <img src={product.thumbnails[0]} alt="product image at index 0" />
            <p>{product.title}</p>
            <h3> {product.title}</h3>
            <div>
                <p> Rs: {product.price}</p>
            </div>
        </div>
      })}
    </div>
  )
}
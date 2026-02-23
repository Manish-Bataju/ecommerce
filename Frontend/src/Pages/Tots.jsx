import React from 'react'
import ProductGallery from '../Components/ProductGallery.jsx'

const Tots = () => {
  return (
    <div>{/* We call the gallery and tell it which ageGroup to filter for */}
    <ProductGallery categoryTitle="Toddler's" ageGroup="Tots"/>
    </div>
  )
}

export default Tots
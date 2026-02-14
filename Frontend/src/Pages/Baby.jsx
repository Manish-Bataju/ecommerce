import React from 'react'
import ProductGallery from '../Components/ProductGallery.jsx'

const Baby = () => {
  return (
    <div>  
    {/* We call the gallery and tell it which ageGroup to filter for */}
    <ProductGallery categoryTitle="Baby" ageGroup="baby"/>
    </div>
  )
}

export default Baby
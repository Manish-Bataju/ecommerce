import React from 'react'
import ProductGallery from '../Components/ProductGallery.jsx'

const Teen = () => {
  return (
    <div>{/* We call the gallery and tell it which ageGroup to filter for */}
    <ProductGallery categoryTitle="Teen" ageGroup="teen"/>
    </div>
  )
}

export default Teen
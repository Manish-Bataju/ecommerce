import React from 'react'
import ProductGallery from '../Components/ProductGallery.jsx'

const Junior = () => {
  return (
    <div>
      {/* We call the gallery and tell it which ageGroup to filter for */}
    <ProductGallery categoryTitle="Junior" ageGroup="junior"/>
    </div>
  )
}

export default Junior
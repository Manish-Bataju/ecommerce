import React from 'react'
import ProductGallery from '../Components/ProductGallery.jsx'

const Kids = () => {
  return (
    <div>{/* We call the gallery and tell it which ageGroup to filter for */}
    <ProductGallery categoryTitle="Kids" ageGroup="Kids"/>
    </div>
  )
}

export default Kids
// shared/enums.js
export const Product_Tag_Groups = {
  Marketing: [
    "New Arrival", "Best Seller", "Discounted", "Limited Edition",
    "Buy One Get One Free", "Free Shipping", "Exclusive", "Trending"
  ],
  Performance: [
    "Machine Washable", "Lightweight", "Warm", "Breathable",
    "Durable", "Soft", "Stretchy", "Water-Resistant", "UV Protection"
  ],
  Season: [
    "Seasonal", "Winter Collection", "Summer", "Winter", "Autumn", "Monsoon"
  ]
};

// Flatten for schema validation
export const Product_Tag_Enum = [
  ...Product_Tag_Groups.Marketing,
  ...Product_Tag_Groups.Performance,
  ...Product_Tag_Groups.Season
];

export const Fabric_Category_Enum =
[
'Organic Cotton',
'Bamboo-Blend',
'Linen',
'Merino Wool',
'Hemp',
'Muslin',
'Cotton-Blend',
'Cotton-Viscose',
'Cotton-Polyester',
'100% Polyester',
'100% Cotton'
]

export const Clothing_Category_Enum =[
    'Tops',
    'Bottoms',
    'Outerwear',
    'OverAlls',
    'Sleepwear',
    'Accessories',
    'Bundles',
    'Dresses'
]
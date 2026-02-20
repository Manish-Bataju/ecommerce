import { Clothing_Category_Enum, Fabric_Category_Enum, Product_Tag_Groups } from "../../../Shared/enums.js";

   // defining size Maps based on schema
export const Category_Map= {
    Baby: {
        sizes: ['New Born', '3M', '6M'],
        description: "New Born to 6 Months"
    },
    Tots: {
        sizes: ['9M', '12M', '18M'],
        description: "9 Months to 18 Months"
    },
    Junior: {
        sizes: ['2Y', '3Y', '4Y'],
        description: "2 Years to 4 Years"
    },
    Kids: {
        sizes: ['6Y', '8Y', '10Y', '12Y'],
        description: "6 Years to 12 Years"
    },
    Teen: {
        sizes: ['13Y', '14Y', '16Y', '18Y'],
        description: "13 Years to 18 Years"
    }
};


export const CategoryConfig = {
  clothing: {
    title: "Clothing Category",
    values: Clothing_Category_Enum
  },
  fabric: {
    title: "Fabric Category",
    values: Fabric_Category_Enum
  },
  tags: [
    { title: "Marketing", values: Product_Tag_Groups.Marketing },
    { title: "Performance", values: Product_Tag_Groups.Performance },
    { title: "Seasonal", values: Product_Tag_Groups.Season }
  ]
};

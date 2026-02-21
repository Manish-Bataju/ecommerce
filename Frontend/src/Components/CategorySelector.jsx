import { useState } from "react"

export default function CategorySelector({
    title,
    categories,
    initialSelected =[],
    onChange,
    multiSelect = true
}) {
    const [selected, setSelected] = useState(initialSelected);

    const toggleSelector = (category)=>{
        const updated = selected.includes(category)
        ? selected.filter((c)=> c !== category)
        : [...selected, category];

        setSelected(updated);
        onChange?.(updated); // notify parent if call back Provided.
    }
  return (
    <div>
        {title && <h3 className="font-bold mb-2" >{title}</h3>}
        <div className="flex flex-wrap gap-2">
        {categories.map((category)=>(
            <span
                key={category}
                onClick={()=> toggleSelector(category)}
                className={`cursor-pointer border rounded-md px-2 py-1 shadow-sm
                ${selected.includes(category)? "bg-blue-500 text-white" : "bg-gray-200"}`}
                >
                {category}
                </span>
                
        ))}
    </div>
    </div>
   
  )
}

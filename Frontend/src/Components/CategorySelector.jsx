import { useState } from "react"

export default function CategorySelector({
    title,
    categories,
    initialSelected =[],
    onChange,
    multiSelect = true
}) {
    const [selected, setSelected] = useState([]);

    const toggleSelector = (category)=>{
        const updated = selected.includes(category)
        ? selected.filter((c)=> c !== category)
        : [...selected, category];

        setSelected(updated);
        onChange?.(updated); // notify parent if call back Provided.
    }
  return (
    <div>
        {categories.map((category)=>(
            <span
                key={category}
                onClick={()=> toggleSelector(category)}
                className={`cursor-pointer border rounded px-2 py-1 shadow-sm
                ${selected.includes(category)? "bg-amber-300 text-white" : "bg-gray-200"}`}
                >
                {category}
                </span>
                
        ))}
    </div>
  )
}

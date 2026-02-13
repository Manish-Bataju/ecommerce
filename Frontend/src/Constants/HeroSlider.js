import muslin from '../assets/muslin_hero.png';
import cargo_pants from '../assets/cargo.png';
import frock from '../assets/frock.png'
export const heroSlider =[
  {
    id: 1,
    image: muslin,
    title: "Latest Arrival",
    titleTheme: "text-[#4F4729] font-bold text-xl sm:font-bold sm:text-6xl",
    subTitle:" Pure comfort in every stitch",
    subTheme: "font-semibold text-2xl text-black",
    position: "flex flex-col gap-5 items-center w-3/4 mx-auto", //text position
    btn: "bg-[#4F4729] font-bold text-white sm:text-xl px-6 py-2 rounded-md hover:bg-[#855a32] transition-all duration-300 shadow-sm hover:shadow-lg active:scale-95",
    btnHover:" bg-slate-700",
    background: "col-start-1 row-start-1 relative z-20 w-[30vw] lg:1/3 mx-[8vw] bg-orange-50 backdrop-blur-md"
  },
  {
    id: 2,
    image: cargo_pants,
    title: "Latest Arrival",
    subTitle:" Pure Multi Functional",
    position: "justify-start items-center", //text position
    theme: "text-navy",
    btnColor: "bg-green"
  },
  {
    id: 1,
    image: frock,
    title: "frock",
    subTitle:"Soft and comfortable",
    position: "justify-start items-center", //text position
    theme: "text-navy",
    btnColor: "bg-navy"
  },
]
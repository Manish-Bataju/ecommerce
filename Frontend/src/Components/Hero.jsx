import {heroSlider} from '../Constants/HeroSlider.js';
import {useShop} from '../hooks/useShop'; // Update the path to where useShop is exported



export default function Hero() {
    const {headerHeight} = useShop();

    const currentSlide = heroSlider[0];
    // const [currentSlider, setCurrentSlider] = useState(0);

    // onHandleChange(
    //   setCurrentSlider(prev => prev+1)
      
    // );

  return (
    <section className='grid grid-cols-1 grid-rows-1 w-full h-full relative overflow-hidden'
    style={{ height: `calc(100dvh - ${headerHeight}px)` }}>
        
        {/* Image Layer */}
        <div className="col-start-1 row-start-1 w-full h-full" >
             <img
             src={currentSlide.image}
             alt={currentSlide.image}
             className='w-full h-full object-cover object-position-top block'/>
        </div>

        {/* Text Layer */}
        <div className={`col-start-1 row-start-1 z-20 p-12 flex ${currentSlide.position}`}>
          <h1 className={`font-bold ${currentSlide.theme} text-xl sm:font-bold sm:text-2xl px-6 py-10`}>
            {currentSlide.title}
          </h1>
          <p>{currentSlide.subTitle}</p>
          <div className="flex gap-3"> 
          <button  className={`${currentSlide.btnColor} font-bold text-white sm:text-lg px-2 py-1 rounded-md hover:bg-navy/70 transition-all duration-300`}>Shop Now</button>
          <button className={`${currentSlide.btnColor} font-bold text-white sm:text-lg px-2 py-1 rounded-md hover:bg-navy/70 transition-all duration-300`}>Order Now</button>
          </div>  
        </div>
    </section>
  )
}

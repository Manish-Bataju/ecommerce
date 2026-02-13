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
             className='w-full h-full object-cover object-top block'/>
        </div>

        {/* Text Layer */}
        <div className={`${currentSlide.background}`}>
          <div style={{ marginTop: `calc(0.35 *(100dvh - ${headerHeight}px))`}}
          className={`${currentSlide.position}`}>
          <h1 className={` ${currentSlide.titleTheme}`}>{currentSlide.title}</h1>
          <p className={`${currentSlide.subTheme}`}>{currentSlide.subTitle}</p>
          <div className="flex w-full justify-evenly gap-4"> 
          <button  className={`${currentSlide.btn}`}>Shop Now</button>
          <button className={`${currentSlide.btn}`}>Order Now</button>
          </div> 
        </div>  
        </div>
    </section>
  )
}

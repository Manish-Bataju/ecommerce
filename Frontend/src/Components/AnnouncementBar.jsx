export const AnnouncementBar = () => {
  return (
    <div className='bg-mauve max-md:py-0.5 py-1 overflow-hidden whitespace-nowrap border-b border-navy/10 relative'>
        {/* On Mobile: This flex container will animate. 
            On Desktop: We keep it centered. */}
        <div className="flex items-center gap-10 whitespace-nowrap animate-marquee md:animate-none md:justify-center">
            <p className='font-body font-bold text-lg text-navy px-4 max-md:text-[1rem]'>
            Free delivery over
            <span className="font-bold"> Rs 5000</span>
            <span className="inline md:inline max-md:ml-3 ml-4 text-0.75rem font-bold opacity-100 italic text-espresso">
            *Terms don't apply on clearance products*
          </span>
          </p>
        </div>       
    </div>
  )
}

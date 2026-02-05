export const AnnouncementBar = () => {
  return (
    <div className='bg-mauve py-2 overflow-hidden whitespace-nowrap border-b border-navy/10 relative'>
        {/* On Mobile: This flex container will animate. 
            On Desktop: We keep it centered. */}
        <div className="flex items-center gap-10 whitespace-nowrap animate-marquee md:animate-none md:justify-center">
            <p className='font-body font-bold text-base text-navy px-4'>
            Free delivery over
            <span class="font-bold"> Rs 5000</span>
            <span class="inline md:inline max-md:ml-4 md:ml-3 text-0.75rem font-bold opacity-100 italic text-espresso">
            *Terms don't apply on clearance products*
          </span>
        </p>
        </div>
        
        
    </div>
  )
}

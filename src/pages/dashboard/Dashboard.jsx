import React from 'react';

export default function Dashboard() {

  return (
    <div className='grid sm:grid-cols-2 xl:grid-cols-4 gap-5'>
      <div className='border-2 rounded-xl ps-4 py-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center justify-between gap-5'>
            <div className='rounded-xl size-14 flex items-center justify-center bg-[#D7F5FC]'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#03C3EC" class="size-7">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <div>
              <p className='font-medium line-clamp-1'>Total Tasks</p>
              <p className='font-semibold text-2xl mt-1'>13</p>
            </div>
          </div>
          <div className='h-14 w-[5px] rounded-s-md bg-[#03C3EC]'></div>
        </div>
      </div>
      <div className='border-2 rounded-xl ps-4 py-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center justify-between gap-5'>
            <div className='rounded-xl size-14 flex items-center justify-center bg-[#DDF6E8]'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#40CD7F" className="size-7">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122" />
              </svg>
            </div>
            <div>
              <p className='font-medium line-clamp-1'>Completed Tasks</p>
              <p className='font-semibold text-2xl mt-1'>6</p>
            </div>
          </div>
          <div className='h-14 w-[5px] rounded-s-md bg-[#40CD7F]'></div>
        </div>
      </div>
      <div className='border-2 rounded-xl ps-4 py-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center justify-between gap-5'>
            <div className='rounded-xl size-14 flex items-center justify-center bg-[#E9E7FD]'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#7367F0" class="size-7">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <div>
              <p className='font-medium line-clamp-1'>Pending Tasks</p>
              <p className='font-semibold text-2xl mt-1'>06</p>
            </div>
          </div>
          <div className='h-14 w-[5px] rounded-s-md bg-[#7367F0]'></div>
        </div>
      </div>
      <div className='border-2 rounded-xl ps-4 py-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center justify-between gap-5'>
            <div className='rounded-xl size-14 flex items-center justify-center bg-[#FBEAEA]'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#D32E2E" class="size-7">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
              </svg>
            </div>
            <div>
              <p className='font-medium line-clamp-1'>Next Day Due</p>
              <p className='font-semibold text-2xl mt-1'>01</p>
            </div>
          </div>
          <div className='h-14 w-[5px] rounded-s-md bg-[#D32E2E]'></div>
        </div>
      </div>
    </div>
  )
}
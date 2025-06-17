import React from 'react'

const VideoText = ({title,overview}) => {
  return (
    <div className='flex flex-col  absolute w-full h-full bg-gradient-to-r gap-2 from-black align-middle justify-center px-16 top-0 aspect-video z-10 '>
      <h2 className='text-4xl font-semibold text-white'>{title}</h2>
      <p className='text-base font-medium text-white max-w-[450px]'>{overview}</p>
      <div className='flex gap-2'>
        <button className='text-black bg-white px-8 py-2 rounded-md'> ▶ Play</button>
        <button className='text-white bg-white bg-opacity-20 px-8 py-2 rounded-md '>ⓘ Info</button>
      </div>
    </div>
  )
}

export default VideoText
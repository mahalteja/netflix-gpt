import React from 'react'
import { IMG_CDN_URL } from '../utils/constant'

const MovieCard = ({img_path}) => {
  if (!img_path)return null
  return (
    <div className='flex shrink-0 w-48'>
        <img src={IMG_CDN_URL+img_path} alt='Movie Card'/>
    </div>
  )
}

export default MovieCard
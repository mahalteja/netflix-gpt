import React from 'react'
import appStore from '../utils/appStore'
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

const Header = () => {
  const navigate=useNavigate();
  const user=useSelector(store=>store.user)
  const handleSignout=()=>{
    signOut(auth).then(() => {
  // Sign-out successful.
  navigate("/")
  
}).catch((error) => {
  // An error happened.
});
  }
  return (
    <div className=' w-full flex items-center justify-between'>
      <img className='h-24 ml-24' src='https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png' alt='Logo'/>
      {user &&<div className='flex items-center gap-4 mr-24'>
        <img alt='Profile Icon'  className='w-12 h-12 rounded-full' src={user.photoURL}/>
        <p className='font-semibold'>{user.displayName}</p>
        <button onClick={handleSignout} className='bg-red-600 p-4 rounded-lg text-white'>Sign out</button>
      </div>}
    </div>
  )
}

export default Header
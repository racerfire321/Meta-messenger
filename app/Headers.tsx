import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import LogoutButton from './LogoutButton';
import { getServerSession } from 'next-auth';

async function Headers  ()  {
       const session = await getServerSession();
  if(session){
    return (
      <header className='sticky top-0 z-50 bg-white flex justify-between  items-center p-10 shadow-sm '>
         
           
           <div className='flex space-x-2 '>
           <Image src= {session.user?.image!}
           className='rounded-full mx-2 object-contain'
           height={10}
           width={50}
           alt='logo'/>
          
           
           <div>
          <p className='text-blue-400 '>Logged in as</p>
          <p className='font-bold text-lg'>{session.user?.name}</p>
          </div>
         </div>
         <LogoutButton/>
      </header>
     )
  }
  return (
   <header className='sticky top-0 z-50 bg-white flex justify-between  items-center p-10 shadow-sm '>
      
        <div className='flex flex-col items-center space-x-5' >
        <div className='flex space-x-2 items-center'>
        <Image src="https://links.papareact.com/jne"
        height={10}
        width={50}
        alt='logo'/>
       
        <p>Welcome to Meta Messenger</p>
        </div>
       <Link href="/auth/signin" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Signin</Link>
      </div>
   </header>
  )
}

export default Headers
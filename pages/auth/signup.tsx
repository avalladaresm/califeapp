import Image from 'next/image'
import React from 'react'
import { SignupCard } from '../../components/signupcard'
import Navigation from '../../components/admin_navigation'

export default function Login() {

  return (
    <Navigation>
      <div className='flex h-screen w'>
        <div style={{ backgroundColor: '#f8f9fa', height: '24rem' }} className='w-full flex justify-center self-center'>
          <div className='flex flex-row space-x-3'>
            <SignupCard />
            <div className='flex self-center h-auto max-w-full'>
              <Image src="/login_image.png" alt="login_image" width='auto' height='auto' quality={100} />
            </div>
          </div>
        </div>
      </div>
    </Navigation>
  )
}
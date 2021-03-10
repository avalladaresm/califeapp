import React from 'react'
import Image from 'next/image'
import { HiMenu, HiMenuAlt1 } from 'react-icons/hi'
import { useQueryClient } from 'react-query'
import { LoggedInUser } from '../../pages/auth/AuthModel'
import { useAuth } from '../../pages/auth/AuthService'
import ProfileMenu from '../ProfileMenu'

const Header = (props) => {
  const queryClient = useQueryClient()

  const auth: LoggedInUser = useAuth(queryClient)
  
  const profileMenuOptions = [
    {
      title: 'My Profile',
      route: '/admin/profile'
    },
    {
      title: 'Settings',
      route: '/admin/settings',
    },
    {
      title: 'Logout',
      route: '/auth/login',
      type: 'logout'
    }
  ]

  return (
    <div className='fixed bg-white border-b border-gray-200 h-20 w-full z-100'>
      <div className='flex align-middle justify-between h-full space-x-3 px-3'>
        {auth?.a_t &&
          <div
            className='flex flex-row justify-center self-center hover:shadow-inner hover:bg-blueGray-200 active:bg-blueGray-300'
            onClick={props.onClick}
          >
            <HiMenuAlt1 size='2.5em' />
          </div>
        }
        <div className={`flex flex-row space-x-3 py-1 pr-4 sm:pr-14 ${auth?.a_t ? 'justify-center' : 'justify-start'}`}>
          <Image src="/logo.jpg" alt="login_image" width='auto' height='auto' quality={100} />
        </div>
        <div className='flex flex-row space-x-3'>
          {props.isMobile &&
            <div className='flex flex-row space-x-3 p-1'>
              <div className='flex rounded-sm border border-black' onClick={props.onClick}>
                <HiMenu size='2.5em' />
              </div>
            </div>
          }
        </div>
        {
          auth?.a_t &&
          <div className='flex flex-row space-x-3 py-1 justify-center self-center'>
            <ProfileMenu options={profileMenuOptions} />
          </div>
        }
      </div>
    </div>
  )
}

export default Header
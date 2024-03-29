import React from 'react'
import Image from 'next/image'
import { useQueryClient } from 'react-query'
import { LoggedInUserCookieData } from '../../pages/auth/AuthModel'
import { useAuth } from '../../pages/auth/AuthService'
import ProfileMenu from '../ProfileMenu'
import HeaderOption from '../HeaderOption'
import { PlanTypes } from '../../models'

const { PLAN_PLATA, PLAN_ORO, PLAN_PLATINUM } = PlanTypes

const Header = (props) => {
  const queryClient = useQueryClient()

  const auth: LoggedInUserCookieData = useAuth(queryClient)

  const headerOptions = [
    {
      title: 'Plan',
      subOptions: [
        {
          title: 'Plan Plata',
          planType: PLAN_PLATA
        },
        {
          title: 'Plan Oro',
          planType: PLAN_ORO
        },
        {
          title: 'Plan Platinum',
          planType: PLAN_PLATINUM
        },
      ]
    },
    {
      title: 'Pólizas',
      subOptions: [
        {
          title: 'Póliza Plata'
        },
        {
          title: 'Póliza Oro'
        },
        {
          title: 'Póliza Platinum'
        },
      ]
    }
  ]

  const profileMenuOptions = [
    {
      title: 'Dashbord',
      route: '/client/dashboard'
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
        <div className='flex flex-row'>
          <div className={`flex flex-row space-x-3 py-1 pr-4 sm:pr-14 ${auth?.a_t ? 'justify-center' : 'justify-start'}`}>
            <Image src="/logo.jpg" alt="login_image" width='auto' height='auto' quality={100} />
          </div>
          <div className='flex flex-row self-center space-x-10'>
            {headerOptions.map((ho, i) => {
              return (
                <HeaderOption key={i} title={ho.title} subOptions={ho.subOptions} >
                  {ho.title}
                </HeaderOption>
              )
            })}
          </div>
        </div>
        {
          auth?.a_t &&
          <div className='flex flex-row space-x-3 py-1 justify-center self-center'>
            <ProfileMenu options={profileMenuOptions} customerName={props.customerName} />
          </div>
        }
      </div>
    </div>
  )
}

export default Header
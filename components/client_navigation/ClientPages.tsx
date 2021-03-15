import { useRouter } from "next/router"
import React from "react"

const Client = (props) => {
  const router = useRouter()

  const pages = [
    {
      title: 'Dashboard',
      route: '/client/dashboard'
    },
    {
      title: 'Pólizas',
      route: '/client/policies'
    },
    {
      title: 'Planes',
      route: '/client/plans'
    },
    {
      title: 'Dependientes',
      route: '/client/dependants'
    },
    {
      title: 'Pagos',
      route: '/client/payments'
    },
    {
      title: 'Tickets',
      route: '/client/tickets'
    },
    {
      title: 'Profile',
      route: '/client/profile'
    },
    {
      title: 'Logout',
      route: '/client/dashboard',
      type: 'logout'
    }
  ]

  return (
    <div className='flex flex-col border max-h-176 border-gray-300 bg-white py-5 space-y-5 rounded-sm'>
      <div className='flex flex-col px-20 space-y-2 justify-center'>
        <div className='h-48 w-48 rounded-full bg-orange-400 self-center place-self-center' />
        <div className='text-xl self-center place-self-center'>
          {props.customerName}
        </div>
      </div>
      <div className=''>
        {pages.map((p, i) => {
          return (
            <div key={i} onClick={() => router.push(p.route)} className='py-3 px-5 border-t border-gray-300 hover:text-cyan-400 text-lg cursor-pointer'>
              {p.title}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Client
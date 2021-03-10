import { Menu, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import React from "react";
import { HiChevronDown } from "react-icons/hi";
import { useQueryClient } from "react-query";
import { LoggedInUserCookieData } from "../pages/auth/AuthModel";
import { useAuth, useDoLogout } from "../pages/auth/AuthService";

const ProfileMenu = (props) => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const auth: LoggedInUserCookieData = useAuth(queryClient)

  const onLogout = async () => {
    useDoLogout(queryClient, router, document.cookie)
  }

  return (
    <div className='relative inline-block'>
      <Menu>
        {({ open }) => (
          <div>
            <span>
              <Menu.Button style={{ outline: 'none' }} className='flex flex-row text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                <div style={{ outline: 'none' }} className='h-10 w-10 bg-indigo-700 border border-white rounded-full' />
                <div className='self-center'><HiChevronDown size='1.5em' /></div>
              </Menu.Button>
            </span>

            <Transition
              show={open}
              enter='transition ease-out duration-100'
              enterFrom='transform opacity-0 scale-95'
              enterTo='transform opacity-100 scale-100'
              leave='transition ease-in duration-75'
              leaveFrom='transform opacity-100 scale-100'
              leaveTo='transform opacity-0 scale-95'
            >
              <Menu.Items
                className='absolute right-0 w-auto mt-2 origin-top-right bg-gray-50 border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none'
              >
                <div className='flex flex-row px-4 py-3 space-x-2'>
                  <div className='bg-indigo-700 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                    <div style={{ outline: 'none' }} className='h-10 w-10 border border-white rounded-full' />
                  </div>
                  <div className='flex flex-col self-center'>
                    <p className='text-lg leading-5 whitespace-nowrap'>{props.customerName}</p>
                    {props.userProfile === 2 && <p className='text-sm font-medium leading-5 text-gray-900 truncate'>Administrador</p>}
                  </div>
                </div>
                {props.options.map((o, i) => {
                  return (
                    <div key={i} className='py-1'>
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            onClick={() => o.type === 'logout' ? onLogout() : router.push(o.route)}
                            className={`${active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700'
                              } flex justify-between w-full px-4 py-2 text-md font-semibold leading-5 text-left cursor-pointer`}
                          >
                            {o.title}
                          </div>
                        )}
                      </Menu.Item>
                    </div>
                  )
                })}
              </Menu.Items>
            </Transition>
          </div>
        )}
      </Menu>
    </div>
  )
}

export default ProfileMenu
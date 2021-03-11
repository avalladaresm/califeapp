import { Menu, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { HiChevronDown } from "react-icons/hi";
import { SelectedPlanContext } from "../context/PlanContext";

const HeaderOption = (props) => {
  const router = useRouter()
  const selectedPlan = useContext(SelectedPlanContext)

  return (
    <div className='relative inline-block'>
      <Menu>
        {({ open }) => (
          <div>
            <span>
              <Menu.Button style={{ outline: 'none' }} className='flex flex-row text-lg focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white outline-none'>
                <div style={{ outline: 'none' }} className='' >{props.title}</div>
                <div className='self-center'><HiChevronDown size='1.2em' /></div>
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
                className='absolute w-auto whitespace-nowrap mt-2 origin-top-right bg-gray-50 border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none'
              >
                {props.subOptions.map((so, i) => {
                  return (
                    <div key={i} className='py-1'>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={() => { selectedPlan(so.planType), router.push('/client/plans/new') }}
                            className={`${active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700'
                              } flex justify-between w-full px-4 py-2 text-md font-medium leading-5 text-left`}
                          >
                            {so.title}
                          </a>
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

export default HeaderOption
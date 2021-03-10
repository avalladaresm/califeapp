import React, { FC, ReactElement } from 'react'
import { NavigationItemActions } from './NavigationItemActions'
import ReactTooltip from 'react-tooltip';

interface NavItemSettings {
  title: string
  route?: string
  activePage?: string
  actions?: NavItemSettings[]
  onClick?: () => void
  icon?: ReactElement
  collapsed?: boolean
}
console.log('navigationitem')
export const NavigationItem: FC<NavItemSettings> = (props) => {
  return (
    <div>
      <li className="items-center">
        <div
          data-tip data-for={props.title}
          className={
            `px-2 sm:px-3 py-2 rounded-sm text-sm font-medium hover:bg-cyan-500 cursor-pointer text-white ${props.activePage && 'bg-cyan-400 shadow-inner'}`
          }
          onClick={props.onClick}
        >
          <div className={`flex space-x-2 ${props.collapsed && 'justify-center'}`}>
            <div className='self-center'>
              {props.icon}
            </div>
            {!props.collapsed &&
              <div>
                {props.title}
              </div>
            }
          </div>
        </div>
        {
          props.collapsed &&
          <ReactTooltip id={props.title}>
            <span>{props.title}</span>
          </ReactTooltip>
        }
      </li>
      {props.actions?.length > 0 && props.activePage && !props.collapsed &&
        <NavigationItemActions {...props} />
      }
    </div>
  )
}

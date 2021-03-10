import { FC, ReactElement } from 'react'

interface NavItemSettings {
  title: string
  route?: string
  activePage?: string
  actions?: NavItemSettings[]
  onClick?: () => void
  icon?: ReactElement
  collapsed?: boolean
}

export const NavigationItemActions: FC<NavItemSettings> = (props) => {

  return (
    <div>
      <ul className="flex flex-col bg-blueGray-500">
        {props.actions?.map((a, i) => (
          <li key={i} className="items-center">
            <div
              className='pl-8 px-3 py-2 rounded-sm text-sm font-medium hover:bg-cyan-800 cursor-pointer text-white'
              onClick={a.onClick}
            >
              <div className={`flex space-x-2 ${props.collapsed && 'justify-center'}`}>
                <div className='self-center'>
                  {a.icon}
                </div>
                <div>
                  {a.title}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

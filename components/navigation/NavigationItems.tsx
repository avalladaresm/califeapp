import { useRouter } from 'next/router'
import React from 'react'
import { useQueryClient } from 'react-query'
import { LoggedInUser } from '../../pages/auth/AuthModel'
import { useAuth } from '../../pages/auth/AuthService'
import { isUserAuthorizedToViewThisPage } from '../../utils'
import { NavigationItem } from './NavigationItem'
import { MdAccountBox, MdComment, MdDashboard, MdHistory, MdNotificationsActive, MdViewList } from 'react-icons/md'
import { FaBoxes, FaUsers, FaWarehouse } from 'react-icons/fa'
import { AiOutlineFundProjectionScreen } from 'react-icons/ai'

export const NavigationItems = (props) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const auth: LoggedInUser = useAuth(queryClient)

  const options = [
    {
      title: 'Dashboard',
      route: '/dashboard',
      activePage: router.pathname.startsWith('/dashboard'),
      authorization: ['USER_ADMIN_ROOT'],
      canViewThis: isUserAuthorizedToViewThisPage(auth?.r, ['USER_ADMIN_ROOT']),
      icon: <MdDashboard size='1.5em' />
    },
    {
      title: 'Monedas',
      route: '/currencies',
      actions:[],
      activePage: router.pathname.startsWith('/employees'),
      authorization: ['USER_ADMIN_ROOT'],
      canViewThis: isUserAuthorizedToViewThisPage(auth?.r, ['USER_ADMIN_ROOT']),
      icon: <FaUsers size='1.5em' />
    },
    {
      title: 'Países',
      route: '/countries',
      activePage: router.pathname.startsWith('/accounts'),
      authorization: ['USER_ADMIN_ROOT'],
      canViewThis: isUserAuthorizedToViewThisPage(auth?.r, ['USER_ADMIN_ROOT']),
      icon: <MdAccountBox size='1.5em' />
    },
    {
      title: 'Compañías',
      route: '/companies',
      activePage: router.pathname.startsWith('/loginhistory'),
      authorization: ['USER_ADMIN_ROOT'],
      canViewThis: isUserAuthorizedToViewThisPage(auth?.r, ['USER_ADMIN_ROOT']),
      icon: <MdHistory size='1.5em' />
    },
    {
      title: 'Planes',
      route: '/plans',
      activePage: router.pathname.startsWith('/activitylogs'),
      authorization: ['USER_ADMIN_ROOT'],
      canViewThis: isUserAuthorizedToViewThisPage(auth?.r, ['USER_ADMIN_ROOT']),
      icon: <MdViewList size='1.5em' />
    },
    {
      title: 'Pólizas',
      route: '/policies',
      activePage: false,
      authorization: ['USER_ADMIN_ROOT'],
      canViewThis: isUserAuthorizedToViewThisPage(auth?.r, ['USER_ADMIN_ROOT']),
      icon: <FaBoxes size='1.5em' />
    },
    {
      title: 'Redes de Servicio',
      route: '/networkservices',
      activePage: false,
      authorization: ['USER_ADMIN_ROOT'],
      canViewThis: isUserAuthorizedToViewThisPage(auth?.r, ['USER_ADMIN_ROOT']),
      icon: <FaWarehouse size='1.5em' />
    },
    {
      title: 'Patologías',
      route: '/pathologies',
      activePage: false,
      authorization: ['USER_ADMIN_ROOT'],
      canViewThis: isUserAuthorizedToViewThisPage(auth?.r, ['USER_ADMIN_ROOT']),
      icon: <AiOutlineFundProjectionScreen size='1.5em' />
    },
    {
      title: 'Zonas de Riesgo',
      route: '/riskzones',
      activePage: false,
      authorization: ['USER_ADMIN_ROOT'],
      canViewThis: isUserAuthorizedToViewThisPage(auth?.r, ['USER_ADMIN_ROOT']),
      icon: <MdNotificationsActive size='1.5em' />
    },
    {
      title: 'Periodos de Espera',
      route: '/waitingperiods',
      activePage: false,
      authorization: ['USER_ADMIN_ROOT'],
      canViewThis: isUserAuthorizedToViewThisPage(auth?.r, ['USER_ADMIN_ROOT']),
      icon: <MdComment size='1.5em' />
    },
    {
      title: 'Reportes',
      route: '/reports',
      activePage: false,
      authorization: ['USER_ADMIN_ROOT'],
      canViewThis: isUserAuthorizedToViewThisPage(auth?.r, ['USER_ADMIN_ROOT']),
      icon: <MdComment size='1.5em' />
    },
  ]

  return (
    <ul className="flex flex-col list-none space-y-2">
      {options.map((o, i) => (
        <div key={i}>
          {o.canViewThis && <NavigationItem
            {...props}
            key={i}
            title={o.title}
            onClick={() => o.route && router.push(o.route)}
            activePage={o.activePage}
            route={o.route}
            actions={o.actions}
            icon={o.icon}
          />}
        </div>
      ))}
    </ul>
  )
}

import { useRouter } from 'next/router'
import React from 'react'
import { useQueryClient } from 'react-query'
import { LoggedInUserCookieData } from '../../pages/auth/AuthModel'
import { useAuth } from '../../pages/auth/AuthService'
import { isUserAuthorizedToViewThisPage } from '../../utils'
import { NavigationItem } from './NavigationItem'
import { MdAccountBox, MdComment, MdDashboard, MdHistory, MdNotificationsActive, MdViewList } from 'react-icons/md'
import { FaBoxes, FaUsers, FaWarehouse } from 'react-icons/fa'
import { AiOutlineFundProjectionScreen } from 'react-icons/ai'

export const NavigationItems = (props) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const auth: LoggedInUserCookieData = useAuth(queryClient)

  const options = [
    {
      title: 'Dashboard',
      route: '/admin/dashboard',
      activePage: router.pathname.startsWith('/admin/dashboard'),
      authorization: ['USER_ADMIN_ROOT'],
      canViewThis: isUserAuthorizedToViewThisPage(auth?.r, ['USER_ADMIN_ROOT']),
      icon: <MdDashboard size='1.5em' />
    },
    {
      title: 'Monedas',
      route: '/admin/currencies',
      actions:[],
      activePage: router.pathname.startsWith('/admin/currencies'),
      authorization: ['USER_ADMIN_ROOT'],
      canViewThis: isUserAuthorizedToViewThisPage(auth?.r, ['USER_ADMIN_ROOT']),
      icon: <FaUsers size='1.5em' />
    },
    {
      title: 'Países',
      route: '/admin/countries',
      activePage: router.pathname.startsWith('/admin/countries'),
      authorization: ['USER_ADMIN_ROOT'],
      canViewThis: isUserAuthorizedToViewThisPage(auth?.r, ['USER_ADMIN_ROOT']),
      icon: <MdAccountBox size='1.5em' />
    },
    {
      title: 'Compañías',
      route: '/admin/companies',
      activePage: router.pathname.startsWith('/admin/companies'),
      authorization: ['USER_ADMIN_ROOT'],
      canViewThis: isUserAuthorizedToViewThisPage(auth?.r, ['USER_ADMIN_ROOT']),
      icon: <MdHistory size='1.5em' />
    },
    {
      title: 'Cotizaciones rápidas',
      route: '/admin/quickquotes',
      activePage: router.pathname.startsWith('/admin/quickquotes'),
      authorization: ['USER_ADMIN_ROOT'],
      canViewThis: isUserAuthorizedToViewThisPage(auth?.r, ['USER_ADMIN_ROOT']),
      icon: <MdViewList size='1.5em' />
    },
    {
      title: 'Planes',
      route: '/admin/plans',
      activePage: router.pathname.startsWith('/admin/plans'),
      authorization: ['USER_ADMIN_ROOT'],
      canViewThis: isUserAuthorizedToViewThisPage(auth?.r, ['USER_ADMIN_ROOT']),
      icon: <MdViewList size='1.5em' />
    },
    {
      title: 'Pólizas',
      route: '/admin/policies',
      activePage: router.pathname.startsWith('/admin/policies'),
      authorization: ['USER_ADMIN_ROOT'],
      canViewThis: isUserAuthorizedToViewThisPage(auth?.r, ['USER_ADMIN_ROOT']),
      icon: <FaBoxes size='1.5em' />
    },
    {
      title: 'Redes de Servicio',
      route: '/admin/networkservices',
      activePage: router.pathname.startsWith('/admin/networkservices'),
      authorization: ['USER_ADMIN_ROOT'],
      canViewThis: isUserAuthorizedToViewThisPage(auth?.r, ['USER_ADMIN_ROOT']),
      icon: <FaWarehouse size='1.5em' />
    },
    {
      title: 'Patologías',
      route: '/admin/pathologies',
      activePage: router.pathname.startsWith('/admin/pathologies'),
      authorization: ['USER_ADMIN_ROOT'],
      canViewThis: isUserAuthorizedToViewThisPage(auth?.r, ['USER_ADMIN_ROOT']),
      icon: <AiOutlineFundProjectionScreen size='1.5em' />
    },
    {
      title: 'Zonas de Riesgo',
      route: '/admin/riskzones',
      activePage: router.pathname.startsWith('/admin/riskzones'),
      authorization: ['USER_ADMIN_ROOT'],
      canViewThis: isUserAuthorizedToViewThisPage(auth?.r, ['USER_ADMIN_ROOT']),
      icon: <MdNotificationsActive size='1.5em' />
    },
    {
      title: 'Periodos de Espera',
      route: '/admin/waitingperiods',
      activePage: router.pathname.startsWith('/admin/waitingperiods'),
      authorization: ['USER_ADMIN_ROOT'],
      canViewThis: isUserAuthorizedToViewThisPage(auth?.r, ['USER_ADMIN_ROOT']),
      icon: <MdComment size='1.5em' />
    },
    {
      title: 'Reportes',
      route: '/admin/reports',
      activePage: router.pathname.startsWith('/admin/reports'),
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

import React from 'react'
import Navigation from '../components/admin_navigation'
import { LoggedInUserCookieData } from './auth/AuthModel';
import { FetchAccountRolesOnly, useAuth } from '../pages/auth/AuthService';
import { useQueryClient } from 'react-query';
import Mayre from 'mayre'
import { Context } from 'vm';
import { documentCookieJsonify } from '../utils/';

const Home = () => {
  const queryClient = useQueryClient()
  const auth: LoggedInUserCookieData = useAuth(queryClient)
  const _isMobile = window.innerWidth < 640
  return (
    <Mayre
      of={
        <Navigation _isMobile={_isMobile}></Navigation>
      }
      or={
        <Mayre
          of={<div>Signing you in...</div>}
          when={!!auth?.r}
        />
      }
      when={!!auth?.uid && !!auth?.r}
    />
  )
}

export const getServerSideProps = async (ctx: Context) => {
  const parsedCookie: LoggedInUserCookieData = ctx.req.headers.cookie && documentCookieJsonify(ctx.req?.headers?.cookie)

  if (!parsedCookie?.a_t) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false
      }
    }
  }

  const accountRoles = await FetchAccountRolesOnly(parsedCookie)
  if (accountRoles === 'USER_ADMIN_ROOT') {
    return {
      redirect: {
        destination: '/admin/dashboard',
        permanent: false
      }
    }
  } else if (accountRoles === 'USER_CLIENT') {
    return {
      redirect: {
        destination: '/app',
        permanent: false
      }
    }
  }
}

export default Home
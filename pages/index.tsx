import React from 'react'
import Navigation from '../components/navigation'
import { CurrentUserAuthData } from './auth/AuthModel';
import { useAuth } from '../pages/auth/AuthService';
import { useQueryClient } from 'react-query';
import Mayre from 'mayre'
import { Context } from 'vm';
import { documentCookieJsonify } from '../utils/';

const Home = () => {
  const queryClient = useQueryClient()
  const auth: CurrentUserAuthData = useAuth(queryClient)
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
      when={!!auth?.u && !!auth?.r}
    />
  )
}

export const getServerSideProps = async (ctx: Context) => {
  const parsedCookie: CurrentUserAuthData = ctx.req.headers.cookie && documentCookieJsonify(ctx.req?.headers?.cookie)

  if (!parsedCookie?.a_t) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false
      }
    }
  }

  return {
    redirect: {
      destination: '/dashboard',
      permanent: false
    }
  }
}

export default Home
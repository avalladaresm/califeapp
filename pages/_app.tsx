import '../styles/index.css'
import 'tailwindcss/tailwind.css';
import 'nprogress/nprogress.css'
import "react-datepicker/dist/react-datepicker.css";
import 'react-phone-number-input/style.css'
import 'react-notifications-component/dist/theme.css'

import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useRouter } from 'next/router';
import { ReactQueryDevtools } from 'react-query/devtools'
import { FetchAccountRoles, useAuth } from './auth/AuthService';
import { deleteSpecificCookies, documentCookieJsonify } from '../utils';
import NProgress from 'nprogress'
import { LoggedInUserCookieData } from './auth/AuthModel';
import { PlanProvider } from '../context/PlanContext';
import ReactNotification from 'react-notifications-component'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: Infinity
    },
  },
})

function MyApp({ Component, pageProps }) {
  const [currentAuth, setCurrentAuth] = useState<LoggedInUserCookieData>(undefined)
  const [resolved, setResolved] = useState<boolean>(false)

  const router = useRouter()
  const auth: LoggedInUserCookieData = useAuth(queryClient)

  useEffect(() => {
    currentAuth && (async () => {
      try {
        const res: LoggedInUserCookieData = await FetchAccountRoles(queryClient, currentAuth)
        console.log('haww', res)
        if (res?.error) {
          router.push('/auth/login')
          deleteSpecificCookies(['uid', 'a_t'])
        }
        setResolved(true)
      }
      catch (e) {
        throw e
      }
    })()
  }, [currentAuth])

  useEffect(() => {
    const parsedCookie: LoggedInUserCookieData = documentCookieJsonify(document.cookie)
    const isParsedCookieUnd = parsedCookie.uid === null || parsedCookie.a_t === '' ? false : true
    const authData = auth ?? parsedCookie

    auth ?? !isParsedCookieUnd ? undefined : setCurrentAuth({ uid: parsedCookie.uid, a_t: parsedCookie.a_t })

    const listenCookieChange = (callback, interval) => {
      let cookieInQuery = authData?.uid?.toString()

      if (cookieInQuery) {
        let timer = setInterval(() => {
          let cookieExists = document.cookie.includes(cookieInQuery)
          if (!cookieExists) {
            try {
              callback();
              clearInterval(timer)
              queryClient.clear()
            } finally {
              cookieInQuery = authData?.uid?.toString()
            }
          }
        }, interval);
      }
    }

    listenCookieChange(() => {
      router.push('/auth/login')
    }, 3000);

  }, [])

  useEffect(() => {
    const parsedCookie: LoggedInUserCookieData = documentCookieJsonify(document.cookie)

    if ((!parsedCookie.uid || !parsedCookie.a_t) && router.pathname !== '/auth/signup') router.push('/auth/login')
  }, [])

  useEffect(() => { }, [resolved])

  useEffect(() => {
    NProgress.configure({ showSpinner: true })
    let routeChangeStart = () => NProgress.start();
    let routeChangeComplete = () => NProgress.done();

    router.events.on('routeChangeStart', routeChangeStart);
    router.events.on('routeChangeComplete', routeChangeComplete);
    router.events.on('routeChangeError', routeChangeComplete);
    return () => {
      router.events.off('routeChangeStart', routeChangeStart);
      router.events.off('routeChangeComplete', routeChangeComplete);
      router.events.off('routeChangeError', routeChangeComplete);
    };
  }, []);

  useEffect(() => {
    if (!!auth?.uid && router.pathname === '/') router.push('/')
  }, [auth?.uid])

  return (
    <QueryClientProvider client={queryClient}>
      <PlanProvider>
        <ReactNotification />
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </PlanProvider>
    </QueryClientProvider>
  )
}

export default MyApp

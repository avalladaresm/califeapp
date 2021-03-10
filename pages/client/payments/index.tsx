import { GetServerSidePropsContext } from "next"
import React from "react"
import MainContainer from "../../../components/client_navigation"
import ClientPages from "../../../components/client_navigation/ClientPages"
import { FetchUser, useUser } from "../../../services/User"
import { documentCookieJsonify } from "../../../utils"
import { LoggedInUserCookieData } from "../../auth/AuthModel"

const Payments = (props) => {
  const { data } = useUser(props?.cookies?.a_t, props?.loggedInUser?.idUser)

  return (
    <MainContainer customerName={data && data.name} userProfile={data && data.idUserProfile}>
      <div className='flex flex-row space-x-3'>
        <ClientPages customerName={data && data.name} />
        <div className='w-full p-5 border border-gray-300 bg-white'>
          Payments
        </div>
      </div>
    </MainContainer>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const parsedCookie: LoggedInUserCookieData = ctx.req.headers.cookie && documentCookieJsonify(ctx.req?.headers?.cookie)

  if (!parsedCookie?.a_t) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false
      }
    }
  }

  const loggedInUser = await FetchUser(parsedCookie.a_t, parsedCookie.uid)
  return {
    props: {
      cookies: {
        uid: parsedCookie.uid,
        a_t: parsedCookie.a_t
      },
      loggedInUser: loggedInUser
    }
  }
}

export default Payments
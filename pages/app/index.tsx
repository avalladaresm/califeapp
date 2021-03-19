import { GetServerSidePropsContext } from "next"
import React, { Context } from "react"
import MainContainer from '../../components/client_navigation'
import { documentCookieJsonify } from "../../utils"
import { LoggedInUserCookieData } from "../auth/AuthModel"
import { FetchAccountRolesOnly } from "../auth/AuthService"
import { usePlans } from "../client/plans/PlansService"

const MainApp = (props) => {
  const { } = usePlans(props?.cookies?.a_t)

  return (
    <MainContainer>
      <div>Main App</div>
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

  const accountRoles = await FetchAccountRolesOnly(parsedCookie)
  return {
    props: {
      cookies: {
        uid: parsedCookie.uid,
        a_t: parsedCookie.a_t,
        r: accountRoles
      }
    }
  }
}

export default MainApp
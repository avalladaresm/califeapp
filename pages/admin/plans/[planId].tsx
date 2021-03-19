import { GetServerSidePropsContext } from "next"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import MainContainer from "../../../components/admin_navigation"
import ViewCustomer from "../../../components/forms/ViewCustomer"
import PageContent from "../../../components/PageContent"
import { documentCookieJsonify } from "../../../utils"
import { LoggedInUserCookieData } from "../../auth/AuthModel"
import { FetchAccountRolesOnly } from "../../auth/AuthService"
import { FetchCustomerPlan } from "./PlanService"

const Plans = (props) => {
  const [_customerPlanData, _setCustomerPlanData] = useState();
  const router = useRouter()
  const { planId } = router.query
  console.log('planId', planId)
  useEffect(() => {
    (async () => {
      _setCustomerPlanData(await FetchCustomerPlan(props?.cookies?.a_t, Number(planId)))
    })()
  }, []);

  return (
    <MainContainer>
      {
        _customerPlanData ?
          <PageContent title={'Detalles del plan'}>
            <ViewCustomer customerData={_customerPlanData} />
          </PageContent> :
          'Loading...'
      }
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

export default Plans
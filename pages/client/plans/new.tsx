import { GetServerSidePropsContext } from "next"
import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from "react"
import MainContainer from "../../../components/client_navigation"
import ClientPages from "../../../components/client_navigation/ClientPages"
import NewCustomer from "../../../components/forms/NewCustomer"
import Quote from "../../../components/forms/Quote"
import PageContent from "../../../components/PageContent"
import PlanDescription from "../../../components/PlanDescription"
import { PlanContext } from "../../../context/PlanContext"
import { FetchUser, useUser } from "../../../services/User"
import { documentCookieJsonify } from "../../../utils"
import { LoggedInUserCookieData } from "../../auth/AuthModel"
import { Plan } from "./PlansModel"
import { usePlans } from "./PlansService"

const NewPlan = (props) => {
  const [_selectedPlan, _setSelectedPlan] = useState<Plan>()
  const [_quoteResult, _setQuoteResult] = useState([]);
  const [_quoteResultAccepted, _setQuoteResultAccepted] = useState<boolean>(false);

  const user = useUser(props?.cookies?.a_t, props?.loggedInUser?.idUser)
  const plan = useContext(PlanContext)
  const plans = usePlans(props?.cookies?.a_t)
  const router = useRouter()

  useEffect(() => {
    if (router.pathname === '/client/plans/new' && !plans.data) {
      router.push('/client/plans')
    }
  }, [])

  useEffect(() => {
    _setSelectedPlan(plans.data?.filter((p: Plan) => p.idPlan === plan)[0])
  }, [plan])

  return (
    <MainContainer customerName={user.data && user.data.name} userProfile={user.data && user.data.idUserProfile}>
      <div className='flex flex-row space-x-3'>
        <ClientPages customerName={user.data && user.data.name} />
        <div className='w-full p-5 border border-gray-300 bg-white'>
          {
            plans.isLoading ? <div>loading...</div> :
              <PageContent title={`Nuevo Plan - ${_selectedPlan?.name}`}>
                <PlanDescription planDescription={_selectedPlan} />
                <Quote setQuoteResult={_setQuoteResult} setQuoteResultAccepted={_setQuoteResultAccepted} />
                {_quoteResultAccepted && <NewCustomer quoteResult={_quoteResult} />}
              </PageContent>
          }
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

export default NewPlan
import { GetServerSidePropsContext } from "next"
import React from "react"
import MainContainer from "../../../components/admin_navigation"
import PageContent from "../../../components/PageContent"
import { documentCookieJsonify } from "../../../utils"
import { LoggedInUser } from "../../auth/AuthModel"
import { FetchAccountRolesOnly, useAuth } from "../../auth/AuthService"
import { usePlansCustomers } from "./PlanService"

const Plans = (props) => {
  const { data, isLoading } = usePlansCustomers(props?.cookies?.a_t)

  const columns = [
    {
      id: 'planName',
      accessor: 'planName',
      Header: 'Plan'
    },
    {
      id: 'initialFee',
      accessor: 'initialFee',
      Header: 'Initial Fee'
    },
    {
      id: 'monthlyFee',
      accessor: 'monthlyFee',
      Header: 'Monthly Fee'
    },
    {
      id: 'status',
      accessor: 'status',
      Header: 'Status'
    },
    {
      id: 'createdDate',
      accessor: 'createdDate',
      Header: 'Requested date'
    }
  ]

  return (
    <MainContainer>
      {data ? <PageContent title={'Customers\' plans'} data={data} columns={columns} isLoading={isLoading} /> : 'Loading...'}
    </MainContainer>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const parsedCookie: LoggedInUser = ctx.req.headers.cookie && documentCookieJsonify(ctx.req?.headers?.cookie)
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
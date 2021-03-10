import React from "react"
import { useQueryClient } from "react-query"
import MainContainer from "../../components/navigation"
import PageContent from "../../components/PageContent"
import { useAuth } from "../auth/AuthService"
import { usePlansCustomers } from "./PlanService"

const Plans = () => {
  const queryClient = useQueryClient()
  const auth = useAuth(queryClient)
  const { data, isLoading } = usePlansCustomers(auth?.a_t)

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

export default Plans
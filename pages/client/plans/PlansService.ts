import axios, { AxiosError } from "axios"
import { QueryObserverResult, useQuery } from "react-query"
import { Plan, PlanCustomer } from './PlansModel'

const FetchPlansCustomer = async (accessToken: string, userId: number): Promise<PlanCustomer[]> => {
  const plans = await axios.get(`http://localhost:4000/planCustomer/${userId}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
  return plans.data
}

export const usePlansCustomer = (accessToken: string, userId: number): QueryObserverResult<PlanCustomer[], AxiosError> => {
  return useQuery('PlansCustomers', async () => await FetchPlansCustomer(accessToken, userId), { refetchOnMount: false })
}

const FetchPlans = async (accessToken: string): Promise<Plan[]> => {
  const plans = await axios.get(`http://localhost:4000/plan/getAllPlans`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
  return plans.data
}

export const usePlans = (accessToken: string): QueryObserverResult<Plan[], AxiosError> => {
  return useQuery('Plans', async () => await FetchPlans(accessToken), { refetchOnMount: false })
}
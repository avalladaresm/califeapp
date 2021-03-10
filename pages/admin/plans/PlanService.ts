import axios, { AxiosError } from "axios"
import { QueryObserverResult, useQuery } from "react-query"
import { Plan } from "./PlanModel"

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

const FetchPlansCustomers = async (accessToken: string): Promise<Plan[]> => {
  const plansCustomers = await axios.get(`http://localhost:4000/planCustomer/getAllPlansCustomers`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
  return plansCustomers.data
}

export const usePlansCustomers = (accessToken: string): QueryObserverResult<Plan[], AxiosError> => {
  return useQuery('PlansCustomers', async () => await FetchPlansCustomers(accessToken), { refetchOnMount: false })
}
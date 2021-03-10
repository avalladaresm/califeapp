import axios, { AxiosError } from "axios"
import { QueryObserverResult, useQuery } from "react-query"
import { Company } from "./CompanyModel"

const FetchCompanies = async (accessToken: string): Promise<Company[]> => {
  const companies = await axios.get(`http://localhost:4000/company/getAllCompanies`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
  return companies.data
}

export const useCompanies = (accessToken: string): QueryObserverResult<Company[], AxiosError> => {
  return useQuery('Companies', async () => await FetchCompanies(accessToken), { refetchOnMount: false })
}
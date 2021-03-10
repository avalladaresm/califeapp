import axios, { AxiosError } from "axios"
import { QueryClient, QueryObserverResult, useQuery } from "react-query"
import { LoggedInUserCookieData } from "../pages/auth/AuthModel"

interface User {
  idUser: number
  idUserProfile: number
  name: string
  email: string
  createdDate: Date
}

export const FetchUser = async (accessToken: string, id: number): Promise<User> => {
  const user = await axios.get(`http://localhost:4000/user/${id}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
  return user.data
}

export const setAuth = (queryClient: QueryClient, authData: LoggedInUserCookieData) => {
  queryClient.setQueryData('LoggedInUser', authData)
}

export const useUser = (accessToken: string, id: number): QueryObserverResult<User, AxiosError> => {
  return useQuery('LoggedInUser', async () => await FetchUser(accessToken, id), { refetchOnMount: false })
}
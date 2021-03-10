import axios, { AxiosError } from "axios"
import { QueryClient, useMutation } from "react-query"
import { cookieNames, deleteCookie } from "../../utils"
import { AccountLogIn, AccountSignUp } from "./AuthModel"
import { LoggedInUser } from "./AuthModel"

export const useDoLogin = (queryClient: QueryClient, router) => {
  return useMutation((values: AccountLogIn) => {
    return axios.post(`http://localhost:4000/auth/login`, {
      data: {
        email: values.email, password: values.password
      }
    })
  }, {
    onSuccess: (data, variables) => {
      const loginRes: LoggedInUser = data.data
      const authData = { a_t: loginRes.a_t, r: loginRes.r, uid: loginRes.uid }
      setAuth(queryClient, authData)
      document.cookie = 'uid=' + authData.uid + ";path=/"
      document.cookie = 'a_t=' + authData.a_t + ";path=/"
      router.push('/')
    }, onError: (error: AxiosError) => {
      console.log('erorrr', error.response.data)
    }
  })
}

export const signup = async (values: AccountSignUp) => {
  try {
    const signup = await axios.post(`http://localhost:4000/auth/signup`, {
      data: {
        firstname: values.firstname, surname: values.surname,
        phoneNumber: values.phoneNumber, dob: values.dob,
        country: values.country, email: values.email,
        password: values.password,
      }
    })

    return signup
  } catch (e) {
    throw e
  }
}

export const FetchAccountRolesOnly = async (cookieData: LoggedInUser): Promise<LoggedInUser> => {
  try {
    const accountRole = await axios.get(`http://localhost:4000/auth/${cookieData.uid}/account-roles`, {
      headers: {
        'Authorization': `Bearer ${cookieData.a_t}`
      }
    })
    const authData = { ...cookieData, r: accountRole.data.roles }
    return accountRole.data.roles
  }
  catch (e) {
    const res: LoggedInUser = { ...cookieData, error: e }
    return res
  }
}

export const FetchAccountRoles = async (queryClient: QueryClient, cookieData: LoggedInUser): Promise<LoggedInUser> => {
  try {
    const accountRole = await axios.get(`http://localhost:4000/auth/${cookieData.uid}/account-roles`, {
      headers: {
        'Authorization': `Bearer ${cookieData.a_t}`
      }
    })
    const authData = { ...cookieData, r: accountRole.data.roles }
    setAuth(queryClient, authData)
    return accountRole.data.roles
  }
  catch (e) {
    const res: LoggedInUser = { ...cookieData, error: e }
    return res
  }
}

export const useDoLogout = (queryClient: QueryClient, router, cookie: string) => {
  queryClient.clear()
  router.push('/auth/login')
  cookieNames(cookie).map(c => {
    document.cookie = deleteCookie(c)
  })
}

export const setAuth = (queryClient: QueryClient, authData: LoggedInUser) => {
  queryClient.setQueryData('Auth', authData)
}

export const useAuth = (queryClient: QueryClient) => {
  const res: LoggedInUser = queryClient.getQueryData('Auth')
  return res
}
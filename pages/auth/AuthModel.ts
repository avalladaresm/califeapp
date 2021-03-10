import { AxiosError } from "axios";

export interface AccountLogIn {
  email: string
  password: string
}

export interface AccountSignUp {
  firstname: string
  surname: string
  phoneNumber: string
  dob: Date
  country: string
  email: string
  password: string
}

export interface LoggedInUser {
  a_t: string
  r?: string[]
  uid: number
  error?: AxiosError
}
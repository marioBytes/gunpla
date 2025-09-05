import type { AxiosError, AxiosResponse } from 'axios'

export interface AuthParams {
  email: string
  password: string
}

interface Sucess {
  status: number
  data: Record<any, any>
}

interface Error {
  status: number
  errorMessage: string
}

export const success = (response: AxiosResponse): Sucess => {
  return { status: response.status, data: response.data }
}

export const error = (res: AxiosError): Error => {
  return { status: res.status!, errorMessage: res.message }
}

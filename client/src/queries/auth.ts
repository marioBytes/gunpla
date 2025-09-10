import axios from './base'
import type { AuthParams } from '@/types/auth'

export const userSignupQueryFn = async (payload: AuthParams) => {
  const { data } = await axios.post('/signup', { user: payload })

  return data
}

export const userLoginQueryFn = async (payload: AuthParams) => {
  const { data } = await axios.post('/login', { user: payload })

  return data
}

export const userResetPasswordQueryFn = async (email: string) => {
  const { data } = await axios.post('/users/reset_password', {
    user: { email: email },
  })

  return data
}

export const userLogoutFn = async () => {
  const { data } = await axios.delete('/logout')

  return data
}

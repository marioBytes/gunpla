import axios from './base'
import type { AuthParams } from '@/types/auth'

export const userLoginQueryFn = async (payload: AuthParams) => {
  const { data } = await axios.post('/login', { user: payload })

  return data
}

export const userLogoutFn = async () => {
  const { data } = await axios.delete('/logout')

  return data
}

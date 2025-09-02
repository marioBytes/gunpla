import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:4000/api',
  timeout: 1000,
  withCredentials: true,
})

interface QueryParams {
  queryKey: string
}

interface Entry {
  id?: string
  name: string
  status: string
  grade: string
  series?: string
  image?: string | null
}

export interface AuthParams {
  email: string
  password: string
}

export const userLoginQueryFn = async (payload: AuthParams) => {
  const { data } = await instance.post('/login', { user: payload })

  return await data
}

export const modelsQueryFn = async () => {
  const { data } = await instance.get('/models')

  return await data
}

export const modelQueryFn = async ({ queryKey }: QueryParams) => {
  const { data } = await instance.get(`/models/${queryKey}`)

  return data
}

export const modelCreateQueryFn = async (modelData: Entry) => {
  const payload = { model: modelData }
  const { data } = await instance.post('/models', payload)

  return await data
}

export const modelUpdateQueryFn = async (modelData: Entry) => {
  const payload = { id: modelData.id, model: modelData }
  const { data } = await instance.put(`/models/${modelData.id}`, payload)

  return await data
}

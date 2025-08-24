import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:4000/api',
  timeout: 1000,
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

export const userLoginQueryFn = async () => {
  const { data } = await instance.post('/users')

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
  const { data } = await instance.post('/models', modelData)

  return await data
}

export const modelUpdateQueryFn = async (modelData: Entry) => {
  const { data } = await instance.put(`/models/${modelData.id}`, modelData)

  return await data
}

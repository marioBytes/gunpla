import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:4000/api',
  timeout: 1000,
})

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject()
  },
)

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken')
      window.location.href = '/login'
    }
    return Promise.reject()
  },
)

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

  if (data.data.token) {
    console.log(data.data.token)
    localStorage.setItem('authToken', data.data.token)
  }

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

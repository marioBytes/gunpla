import axios from './base'

import type { Entry } from '@/types/entries'

interface QueryParams {
  queryKey: string
}

export const userQueryFn = async () => {
  const { data } = await axios.get('/users')

  return await data
}

export const modelsQueryFn = async () => {
  const { data } = await axios.get('/models')

  return data
}

export const modelQueryFn = async ({ queryKey }: QueryParams) => {
  const { data } = await axios.get(`/models/${queryKey}`)

  return data
}

export const modelCreateQueryFn = async (modelData: Entry) => {
  const payload = { model: modelData }
  const { data } = await axios.post('/models', payload)

  return await data
}

export const modelUpdateQueryFn = async (modelData: Entry) => {
  const payload = { id: modelData.id, model: modelData }
  const { data } = await axios.put(`/models/${modelData.id}`, payload)

  return await data
}

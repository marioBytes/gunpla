import { createContext, useContext, useEffect, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'

import type { AxiosError } from 'axios'
import type { AuthParams } from '@/types/auth'
import type { AuthState, User } from './types/auth'

import {
  userLoginQueryFn,
  userLogoutFn,
  userQueryFn,
  userRequestResetPasswordQueryFn,
  userResetPasswordQueryFn,
  userSignupQueryFn,
} from '@/queries'

const AuthContext = createContext<AuthState | undefined>(undefined)

interface AuthProviderProps {
  children: React.ReactNode
}

export interface PasswordResetParams {
  password: string
  token: string
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authIsLoading, setAuthIsLoading] = useState(true)
  const [isConfirmed, setIsConfirmed] = useState(false)

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ['/users'],
    queryFn: userQueryFn,
    retry: (failureCount: number, error: Error) => {
      const axiosError = error as AxiosError
      if (axiosError.response?.status === 401) {
        return false
      }
      return failureCount < 3
    },
  })

  const loginMutation = useMutation({
    mutationFn: (authData: AuthParams) => userLoginQueryFn(authData),
  })

  const logoutMutation = useMutation({
    mutationFn: userLogoutFn,
  })

  const signupMutation = useMutation({
    mutationFn: (authData: AuthParams) => userSignupQueryFn(authData),
  })

  const requestResetPasswordMutation = useMutation({
    mutationFn: (email: string) => userRequestResetPasswordQueryFn(email),
  })

  const resetPasswordMutation = useMutation({
    mutationFn: (params: PasswordResetParams) =>
      userResetPasswordQueryFn(params),
  })

  useEffect(() => {
    if (data && isSuccess) {
      setUser(data.data)
      setIsAuthenticated(true)
      setAuthIsLoading(false)
    } else if (isError) {
      setUser(null)
      setIsAuthenticated(false)
      setAuthIsLoading(false)
    }
  }, [isSuccess, isError, data])

  if (isLoading || authIsLoading) {
    return <div>Loading...</div>
  }

  const signup = (email: string, password: string) => {
    const res = signupMutation.mutateAsync({ email, password })
    setAuthIsLoading(true)

    res
      .then((resp) => {
        setUser(resp.data)
        setIsAuthenticated(true)
      })
      .catch((_error) => {
        setUser(null)
        setIsAuthenticated(false)
      })
      .finally(() => {
        setAuthIsLoading(false)
      })
  }

  const login = (email: string, password: string) => {
    const res = loginMutation.mutateAsync({ email, password })
    setAuthIsLoading(true)

    res
      .then((resp) => {
        setUser(resp.data)
        setIsAuthenticated(true)
        setIsConfirmed(!!resp.data.confirmed_at)
      })
      .catch((_error) => {
        setUser(null)
        setIsAuthenticated(false)
      })
      .finally(() => {
        setAuthIsLoading(false)
      })
  }

  const reqestResetPassword = (email: string) => {
    requestResetPasswordMutation.mutate(email)
  }

  const resetPassword = (password: string, token: string) => {
    resetPasswordMutation.mutate({ password, token })
  }

  const logout = () => {
    const res = logoutMutation.mutateAsync()
    setAuthIsLoading(true)

    res
      .then((_data) => {
        setUser(null)
        setIsAuthenticated(false)
      })
      .catch(() => {
        throw new Error('Logout failed')
      })
      .finally(() => {
        setAuthIsLoading(false)
      })
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading: authIsLoading,
        user,
        login,
        logout,
        signup,
        reqestResetPassword,
        resetPassword,
        isConfirmed,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

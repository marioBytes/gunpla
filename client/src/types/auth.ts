export interface User {
  id: string
  username: string | null
  email: string
  confirmed_at: Date | null
}

export interface AuthState {
  isAuthenticated: boolean
  isLoading: boolean
  isConfirmed: boolean
  user: User | null
  login: (email: string, password: string) => void
  logout: () => void
  signup: (email: string, password: string) => void
  reqestResetPassword: (email: string) => void
  resetPassword: (password: string, token: string) => void
}

export interface AuthParams {
  email: string
  password: string
}

export interface User {
  id: string
  username: string | null
  email: string
}

export interface AuthState {
  isAuthenticated: boolean
  isLoading: boolean
  user: User | null
  login: (email: string, password: string) => void
  logout: () => void
  signup: (email: string, password: string) => void
  resetPassword: (email: string) => void
}

export interface AuthParams {
  email: string
  password: string
}

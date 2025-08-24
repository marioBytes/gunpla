import { createFileRoute } from '@tanstack/react-router'

import LoginForm from '@/components/LoginForm'

function Login() {
  return <LoginForm />
}

export const Route = createFileRoute('/login')({
  component: Login,
})

export default Login

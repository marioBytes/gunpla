import { User } from 'lucide-react'
import { Link } from '@tanstack/react-router'

import type { AuthState } from '@/types/auth'
import { useAppForm } from '@/hooks/form'

interface Props {
  auth: AuthState
  redirect: any
  navigate: any
  isLogin: boolean
}

const AuthForm: React.FC<Props> = ({ auth, redirect, navigate, isLogin }) => {
  const form = useAppForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onChange: ({ value }) => {
        const errors = {
          fields: {},
        } as {
          fields: Record<string, string>
        }

        const { email, password } = value

        if (email.trim().length === 0) {
          errors.fields.email = 'Email is required!'
        }

        if (password.trim().length === 0) {
          errors.fields.password = 'Password is required'
        }

        return errors
      },
    },
    onSubmit: ({ value }) => {
      if (isLogin) {
        auth.login(value.email, value.password)
      } else {
        auth.signup(value.email, value.password)
      }

      navigate({ to: redirect })
    },
  })

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-neutral-400">
            Sign in to access your Gunpla collection
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
          className="bg-neutral-900 border border-neutral-700 rounded-lg p-6 shadow-xl"
        >
          <div className="space-y-4">
            <form.AppField name="email">
              {(field) => (
                <field.TextField
                  type="email"
                  label="Email"
                  placeholder="Enter your email"
                />
              )}
            </form.AppField>

            <form.AppField name="password">
              {(field) => (
                <field.TextField
                  type="password"
                  label="Password"
                  placeholder="Enter your Password"
                />
              )}
            </form.AppField>
            <div className="flex justify-end">
              <button className="text-sm text-yellow-400 hover:text-yellow-300 transition-colors hover:cursor-pointer">
                Forgot your password?
              </button>
            </div>

            <form.AppForm>
              <form.SubscribeButton label="Sign In" className="w-full" />
            </form.AppForm>
          </div>
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?
              <Link
                to="/signup"
                className="ml-2 text-yellow-400 hover:text-yellow-300 font-medium transition-colors hover:cursor-pointer"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AuthForm

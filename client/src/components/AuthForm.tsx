import { User } from 'lucide-react'
import { Link } from '@tanstack/react-router'

import type { AuthState } from '@/types/auth'
import { PasswordField } from '@/components/FormComponents'
import { useAppForm } from '@/hooks/form'
import { validatePasswordRequirements } from '@/utils/utils'

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
      passwordConfirmation: '',
    },
    validators: {
      onChange: ({ value }) => {
        const errors = {
          fields: {},
        } as {
          fields: Record<string, string>
        }

        const { email, password, passwordConfirmation } = value

        if (email.trim().length === 0) {
          errors.fields.email = 'Email is required!'
        }

        if (!isLogin) {
          const requirements = validatePasswordRequirements(password)
          const allRequirementsMet = Object.values(requirements).every(Boolean)

          if (password && !allRequirementsMet) {
            errors.fields.password = 'Password does not meet requirements'
          }

          if (allRequirementsMet) {
            if (passwordConfirmation && password !== passwordConfirmation) {
              errors.fields.passwordConfirmation = 'Passwords do not match'
            }
          }
        } else {
          if (password.trim().length === 0) {
            errors.fields.password = 'Password is required!'
          }
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
          <h1 className="text-3xl font-bold text-white mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-neutral-400">
            {isLogin
              ? 'Login to access your model collection backlog'
              : 'Signup to track your model collection backlog'}
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
              {(_field) => (
                <PasswordField
                  label="Password"
                  placeholder="Enter your Password"
                  showValidation={!isLogin}
                />
              )}
            </form.AppField>

            {!isLogin && (
              <form.AppField name="passwordConfirmation">
                {(_field) => (
                  <PasswordField
                    label="Confirm Password"
                    placeholder="Confirm your Password"
                  />
                )}
              </form.AppField>
            )}

            {isLogin && (
              <div className="flex justify-end">
                <Link
                  to="/reset-password"
                  className="text-sm text-yellow-400 hover:text-yellow-300 transition-colors hover:cursor-pointer"
                >
                  Forgot your password?
                </Link>
              </div>
            )}

            <form.AppForm>
              <form.SubscribeButton label="Sign In" className="w-full" />
            </form.AppForm>
          </div>
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <Link
                to={isLogin ? '/signup' : '/login'}
                search={{ redirect: redirect }}
                className="ml-2 text-yellow-400 hover:text-yellow-300 font-medium transition-colors hover:cursor-pointer"
              >
                {isLogin ? 'Signup' : 'Login'}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AuthForm

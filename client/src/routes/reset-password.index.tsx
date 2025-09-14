import { Link, createFileRoute } from '@tanstack/react-router'

import type { AuthState } from '@/types/auth'
import { useAppForm } from '@/hooks/form'

export const Route = createFileRoute('/reset-password/')({
  component: RouteComponent,
})

interface Props {
  auth: AuthState
}

const ResetPasswordForm: React.FC<Props> = ({ auth }) => {
  const form = useAppForm({
    defaultValues: {
      email: '',
    },
    validators: {
      onChange: ({ value }) => {
        const errors = {
          fields: {},
        } as {
          fields: Record<string, string>
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const { email } = value

        if (email.trim().length === 0) {
          errors.fields.email = 'Email is required!'

          return errors
        }

        if (!emailRegex.test(email.trim())) {
          errors.fields.email = 'Please enter a valid email address'
        }
      },
    },
    onSubmit: ({ value }) => {
      auth.reqestResetPassword(value.email)
    },
  })

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-neutral-900 rounded-lg p-8 border border-neutral-700">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">
              Reset Your Password
            </h1>
            <p className="text-neutral-400">
              Enter your email address and we'll send you a link to reset your
              password.
            </p>
          </div>

          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit()
            }}
          >
            <div>
              <form.AppField name="email">
                {(field) => (
                  <field.TextField
                    type="email"
                    label="Email"
                    placeholder="Enter your email"
                  />
                )}
              </form.AppField>
            </div>

            <form.AppForm>
              <form.SubscribeButton
                label="Send Reset Link"
                className="w-full"
              />
            </form.AppForm>
          </form>
        </div>

        <p className="text-center text-neutral-500 text-sm mt-6">
          Remember your password?{' '}
          <Link
            to="/login"
            search={{ redirect: '/' }}
            className="text-yellow-500 hover:text-yellow-400 transition-colors"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  )
}

function RouteComponent() {
  const { auth } = Route.useRouteContext()
  return <ResetPasswordForm auth={auth} />
}

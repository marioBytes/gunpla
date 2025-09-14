import { createFileRoute, useParams } from '@tanstack/react-router'

import type { AuthState } from '@/types/auth'
import { useAppForm } from '@/hooks/form'
import { PasswordField } from '@/components/FormComponents'
import { validatePasswordRequirements } from '@/utils/utils'

export const Route = createFileRoute('/reset-password/$token')({
  component: RouteComponent,
})

interface Props {
  auth: AuthState
  token: string
}

const ResetPasswordForm: React.FC<Props> = ({ auth, token }) => {
  const form = useAppForm({
    defaultValues: {
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

        const { password, passwordConfirmation } = value

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

        return errors
      },
    },
    onSubmit: ({ value }) => {
      auth.resetPassword(value.password, token)
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
            <p className="text-white">
              Create a strong password for your account
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
              <form.AppField name="password">
                {(_field) => (
                  <PasswordField
                    label="New Password"
                    placeholder="Enter new password"
                    showValidation
                  />
                )}
              </form.AppField>
            </div>

            <div>
              <form.AppField name="passwordConfirmation">
                {(_field) => (
                  <PasswordField
                    label="Confirm Password"
                    placeholder="Confirm password"
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
      </div>
    </div>
  )
}

function RouteComponent() {
  const { auth } = Route.useRouteContext()
  const { token } = useParams({ from: '/reset-password/$token' })

  return <ResetPasswordForm auth={auth} token={token} />
}

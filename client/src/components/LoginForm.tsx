import type { AuthState } from '@/types/auth'
import { useAppForm } from '@/hooks/form'

interface LoginFormProps {
  auth: AuthState
  redirect: any
  navigate: any
}

const LoginForm: React.FC<LoginFormProps> = ({ auth, redirect, navigate }) => {
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
      auth.login(value.email, value.password)
      navigate({ to: redirect })
    },
  })

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="container mx-auto px-4 py-8">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
          className="bg-gray-800 rounded-lg p-6 shadow-xl text-white"
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
              <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors hover:cursor-pointer">
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
              <button
                onClick={() => console.log('goodbye world')}
                className="ml-2 text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                Sign Up
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm

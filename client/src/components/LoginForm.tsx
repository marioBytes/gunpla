import { useMutation } from '@tanstack/react-query'
import type { AuthParams } from '@/query'
import { useAppForm } from '@/hooks/form'
import { userLoginQueryFn } from '@/query'

const LoginForm: React.FC<{}> = () => {
  const login = useMutation({
    mutationFn: (authData: AuthParams) => {
      return userLoginQueryFn(authData)
    },
  })

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
      login.mutate({ email: value.email, password: value.password })
    },
  })

  if (login.isSuccess) {
    console.log(login.data)
  }

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

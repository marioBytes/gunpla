import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { Info, Loader2, Mail, RefreshCw } from 'lucide-react'

import type { AuthState } from '@/types/auth'
import { userResendConfirmAccountQueryFn } from '@/queries'

interface EmailConfirmationProps {
  auth: AuthState
}

const EmailConfirmation: React.FC<EmailConfirmationProps> = ({ auth }) => {
  const [isResending, setIsResending] = useState(false)

  const resendMutation = useMutation({
    mutationFn: () => userResendConfirmAccountQueryFn(auth.user!.email),
  })

  const resend = () => {
    const res = resendMutation.mutateAsync()
    setIsResending(true)

    res
      .then((_resp) => {
        console.log('confirmation email resent')
      })
      .catch((_error) => {
        console.error('oh shit, something went wrong')
      })
      .finally(() => {
        setIsResending(false)
      })
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-neutral-900 border border-neutral-700 rounded-lg p-8 shadow-2xl">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500 rounded-full mb-4">
                <Mail className="w-8 h-8 text-black" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">
                Check Your Email
              </h1>
              <p className="text-neutral-400">
                We've sent you a confirmation link
              </p>
            </div>

            <div className="space-y-6">
              <div className="text-center">
                <p className="text-neutral-300 leading-relaxed">
                  Before you can start managing your Gunpla backlog, please
                  confirm your email address by clicking the verification link
                  we just sent to:
                </p>
                <div className="mt-3 p-3 bg-neutral-800 border border-neutral-600 rounded-lg">
                  <p className="text-yellow-500 font-medium break-all">
                    {auth.user?.email}
                  </p>
                </div>
              </div>

              <div className="bg-neutral-800 border border-neutral-600 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-3 flex items-center">
                  <Info className="w-4 h-4 text-yellow-500 mr-2" />
                  Next Steps:
                </h3>
                <ol className="space-y-2 text-sm text-neutral-300">
                  <li className="flex items-start">
                    <span className="bg-yellow-500 text-black rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                      1
                    </span>
                    Check your inbox for an email from us
                  </li>
                  <li className="flex items-start">
                    <span className="bg-yellow-500 text-black rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                      2
                    </span>
                    Click the "Confirm Email" button in the email
                  </li>
                  <li className="flex items-start">
                    <span className="bg-yellow-500 text-black rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                      3
                    </span>
                    Start building your Gunpla collection!
                  </li>
                </ol>
              </div>

              <div className="text-center">
                <p className="text-neutral-400 text-sm mb-4">
                  Don't see the email? Check your spam folder or try these
                  options:
                </p>
                <div className="space-y-2">
                  <button
                    onClick={resend}
                    disabled={isResending}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-600 disabled:opacity-75 text-black font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                  >
                    {isResending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Resend Confirmation Email
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/_authenticated/confirm-email/')({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (context.auth.user?.confirmed_at) {
      throw redirect({
        to: '/dashboard',
      })
    }
  },
})

function RouteComponent() {
  const { auth } = Route.useRouteContext()
  return <EmailConfirmation auth={auth} />
}

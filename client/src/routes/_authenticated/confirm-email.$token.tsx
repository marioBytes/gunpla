import { useEffect, useState } from 'react'
import { createFileRoute, redirect, useParams } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'

import { ArrowRight, BookOpen, CheckCircle, Users, Zap } from 'lucide-react'

import type { AuthState } from '@/types/auth'
import ButtonLink from '@/components/ButtonLink'
import { userConfirmAccountQueryFn } from '@/queries'

interface EmailConfirmedProps {
  auth: AuthState
}

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
}

const EmailConfirmed: React.FC<EmailConfirmedProps> = ({ auth }) => {
  const { token } = useParams({ from: '/_authenticated/confirm-email/$token' })
  const [loading, setLoading] = useState(false)

  const confirmMutation = useMutation({
    mutationFn: () => userConfirmAccountQueryFn(token),
  })

  useEffect(() => {
    const res = confirmMutation.mutateAsync()

    setLoading(true)
    res
      .then(() => {
        console.log('email confirmed')
      })
      .catch((err) => {
        console.error('oh shit, something went wrong', err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div>loading</div>
  }

  const features: Array<Feature> = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: 'Track Your Backlog',
      description: 'Manage your unbuilt kits and plan your next builds',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Progress Tracking',
      description: 'Log your build progress and showcase completed models',
    },
    // {
    //   icon: <Users className="w-6 h-6" />,
    //   title: 'Community Features',
    //   description: 'Share builds and connect with fellow Gunpla enthusiasts',
    // },
  ]

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-lg w-full">
          <div className="bg-neutral-900 border border-neutral-700 rounded-lg p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-500 rounded-full mb-4">
                <CheckCircle className="w-10 h-10 text-black" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Email Confirmed!
              </h1>
              <p className="text-neutral-400">
                Welcome to your Gunpla journey {auth.user?.email}
              </p>
              <div className="mt-3 p-2 bg-neutral-800 border border-neutral-600 rounded-lg">
                <p className="text-yellow-500 text-sm font-medium break-all">
                  {auth.user?.email}
                </p>
              </div>
            </div>

            <div className="bg-neutral-800 border border-neutral-600 rounded-lg p-4 mb-6">
              <p className="text-neutral-300 text-center leading-relaxed">
                🎉 Your account is now active! You're ready to start organizing
                your Gunpla collection and tracking your builds.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-4 text-center">
                What you can do now:
              </h3>
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start p-3 bg-neutral-800 border border-neutral-600 rounded-lg hover:border-neutral-500 transition-colors duration-200"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center text-black mr-3">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-neutral-400">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <ButtonLink
                to="/dashboard"
                className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-600 disabled:opacity-75 text-black font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center text-lg"
              >
                Continue to Dashboard
                <ArrowRight className="w-5 h-5 ml-2" />
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/_authenticated/confirm-email/$token')({
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
  return <EmailConfirmed auth={auth} />
}

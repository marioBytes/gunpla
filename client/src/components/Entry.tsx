import { useState } from 'react'
import {
  ArrowLeft,
  Camera,
  ChevronLeft,
  ChevronRight,
  Edit,
} from 'lucide-react'
import { Link, useParams } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'

import EntryForm from './EntryForm'
import type { Entry } from '@/types/entries'
import { GRADES } from '@/constants'
import { modelQueryFn } from '@/queries'
import { useAuth } from '@/auth'

const ModelViewPage: React.FC<{}> = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isEditMode, setIsEditMode] = useState(false)
  const { user } = useAuth()
  const { entryId } = useParams({ from: '/entries/$entryId' })

  const { data, isError, isLoading } = useQuery({
    queryKey: ['/model', '$entryId'],
    queryFn: () => modelQueryFn({ queryKey: entryId }),
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error loading model</div>
  }

  const model: Entry = data.data

  const statusOptions = [
    { value: '', label: '' },
    { value: 'backlog', label: 'Backlog' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'on-hold', label: 'On Hold' },
  ]

  const nextImage = () => {
    if (model.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % model.images.length)
    }
  }

  const prevImage = () => {
    if (model.images.length > 0) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + model.images.length) % model.images.length,
      )
    }
  }

  const getGrade = (value: string) => {
    const grade = GRADES.find((g) => g.value === value)

    if (grade) {
      return grade.label
    }

    return 'N/A'
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {user && (
          <div className="flex items-center gap-4 mb-6">
            <Link
              to="/dashboard"
              className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors border border-neutral-600"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="bg-neutral-900 border border-neutral-700 rounded-lg overflow-hidden">
              <div className="aspect-square bg-neutral-800 relative">
                {model.images.length > 0 ? (
                  <>
                    <img
                      src={model.images[currentImageIndex]}
                      alt={model.name}
                      className="w-full h-full object-cover"
                    />

                    {model.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>
                      </>
                    )}

                    {/* Image counter */}
                    {model.images.length > 1 && (
                      <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                        {currentImageIndex + 1} / {model.images.length}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-neutral-400">
                    <Camera className="w-16 h-16 mb-4" />
                    <span className="text-lg font-medium mb-2">
                      No images uploaded
                    </span>
                    <p className="text-sm text-center max-w-xs">
                      Upload some photos of your Gunpla model to showcase your
                      build!
                    </p>
                    <button className="mt-4 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg transition-colors font-medium">
                      Upload Images
                    </button>
                  </div>
                )}
              </div>
            </div>

            {model.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {model.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                      currentImageIndex === index
                        ? 'border-yellow-500'
                        : 'border-neutral-600 hover:border-neutral-500'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${model.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {isEditMode ? (
            <EntryForm entry={model} onCancel={() => setIsEditMode(false)} />
          ) : (
            <>
              <div className="bg-neutral-900 border border-neutral-700 rounded-lg p-6">
                <div className="space-y-6">
                  <div>
                    <p className="block text-sm font-medium text-neutral-400 mb-2">
                      Model Name
                    </p>
                    <h1 className="text-2xl font-bold text-white">
                      {data.data.name}
                    </h1>
                  </div>

                  <div>
                    <p className="block text-sm font-medium text-neutral-400 mb-2">
                      Grade
                    </p>
                    <p className="text-lg text-white">
                      {getGrade(model.grade)}
                    </p>
                  </div>

                  <div>
                    <p className="block text-sm font-medium text-neutral-400 mb-2">
                      Series
                    </p>
                    <p className="text-lg text-white">
                      {model.series || 'Not specified'}
                    </p>
                  </div>

                  <div>
                    <p className="block text-sm font-medium text-neutral-400 mb-2">
                      Status
                    </p>
                    <div className="inline-flex items-center gap-2 px-3 py-2 bg-neutral-800 border border-neutral-600 rounded-lg">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          model.status === 'completed'
                            ? 'bg-yellow-500'
                            : model.status === 'in-progress'
                              ? 'bg-yellow-400'
                              : model.status === 'on-hold'
                                ? 'bg-neutral-400'
                                : 'bg-neutral-500'
                        }`}
                      />
                      <span className="text-white capitalize">
                        {statusOptions.find((opt) => opt.value === model.status)
                          ?.label || model.status}
                      </span>
                    </div>
                  </div>
                </div>

                {user?.id === model.owner_id && (
                  <div className="mt-8 pt-6 border-t border-neutral-700">
                    <button
                      onClick={() => setIsEditMode(true)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg transition-colors font-medium"
                    >
                      <Edit className="w-5 h-5" />
                      Edit Model Information
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ModelViewPage

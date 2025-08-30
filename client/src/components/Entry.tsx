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
import type { Entry } from '@/types'
import { GRADES } from '@/constants'
import { modelQueryFn } from '@/query'

const ModelViewPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isEditMode, setIsEditMode] = useState(false)
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
    const grade = GRADES.find((grade) => grade.value === value)

    if (grade) {
      return grade.label
    }

    return 'N/A'
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center gap-4 mb-6">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="aspect-square bg-gray-700 relative">
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
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
                    <Camera className="w-16 h-16 mb-4" />
                    <span className="text-lg font-medium mb-2">
                      No images uploaded
                    </span>
                    <p className="text-sm text-center max-w-xs">
                      Upload some photos of your Gunpla model to showcase your
                      build!
                    </p>
                    <button className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
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
                        ? 'border-blue-400'
                        : 'border-gray-600 hover:border-gray-500'
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
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="space-y-6">
                  <div>
                    <p className="block text-sm font-medium text-gray-400 mb-2">
                      Model Name
                    </p>
                    <h1 className="text-2xl font-bold text-white">
                      {data.data.name}
                    </h1>
                  </div>

                  <div>
                    <p className="block text-sm font-medium text-gray-400 mb-2">
                      Grade
                    </p>
                    <p className="text-lg text-white">
                      {getGrade(model.grade)}
                    </p>
                  </div>

                  <div>
                    <p className="block text-sm font-medium text-gray-400 mb-2">
                      Series
                    </p>
                    <p className="text-lg text-white">
                      {model.series || 'Not specified'}
                    </p>
                  </div>

                  <div>
                    <p className="block text-sm font-medium text-gray-400 mb-2">
                      Status
                    </p>
                    <div className="inline-flex items-center gap-2 px-3 py-2 bg-gray-700 rounded-lg">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          model.status === 'completed'
                            ? 'bg-green-400'
                            : model.status === 'in-progress'
                              ? 'bg-yellow-400'
                              : model.status === 'on-hold'
                                ? 'bg-orange-400'
                                : 'bg-blue-400'
                        }`}
                      />
                      <span className="text-white capitalize">
                        {statusOptions.find((opt) => opt.value === model.status)
                          ?.label || model.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Edit/Save buttons at bottom */}
                <div className="mt-8 pt-6 border-t border-gray-700">
                  <button
                    onClick={() => setIsEditMode(true)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                  >
                    <Edit className="w-5 h-5" />
                    Edit Model Information
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ModelViewPage

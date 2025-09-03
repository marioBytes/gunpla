import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'

import type { Entry } from '@/types/entries'
import { modelsQueryFn } from '@/query'

import EntryForm from '@/components/EntryForm'
import Status from '@/components/Status'
import EntryCard from '@/components/EntryCard'
import { STATUS } from '@/constants'

type SortBy = 'name' | 'status' | 'grade' | 'dateAdded'

const Dashboard: React.FC<{}> = () => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [sortBy, setSortBy] = useState<SortBy>('dateAdded')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const { data, isLoading, isError } = useQuery({
    queryKey: ['/models'],
    queryFn: modelsQueryFn,
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error...</div>
  }

  const entries = data.data

  const sortOptions = [
    { label: 'Name', value: 'name' },
    { label: 'Status', value: 'status' },
    { label: 'Grade', value: 'grade' },
    { label: 'Date Added', value: 'dateAdded' },
  ]

  const filteredAndSortedEntries = () => {
    const filtered = entries.filter(
      (entry: Entry) =>
        entry.name
          .toLocaleLowerCase()
          .includes(searchTerm.toLocaleLowerCase()) ||
        entry.series
          ?.toLocaleLowerCase()
          .includes(searchTerm.toLocaleLowerCase()),
    )

    return filtered.sort((a: Entry, b: Entry) => {
      let aValue: string | Date = a[sortBy]
      let bValue: string | Date = b[sortBy]

      if (sortBy === 'dateAdded') {
        aValue = new Date(aValue)
        bValue = new Date(bValue)
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      }

      return aValue < bValue ? 1 : -1
    })
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Gunpla Backlog</h1>
          <p className="text-gray-400">
            Track your Gundam model collection and build progress
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search by name or series..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortBy)}
              className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors"
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-medium"
          >
            Add Entry
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {STATUS.map((status) => {
            if (entries.length === 0) {
              return
            }

            const count = entries.filter((entry: Entry) => {
              const transformedStatus = entry.status
                .split(' ')
                .join('_')
                .toLowerCase()

              return transformedStatus === status.value
            }).length

            return <Status key={status.value} status={status} count={count} />
          })}
        </div>

        {filteredAndSortedEntries().length > 0 ? (
          <div className="space-y-2">
            {filteredAndSortedEntries().map((entry: Entry) => {
              return (
                <div key={entry.id}>
                  <Link
                    to="/entries/$entryId"
                    params={{ entryId: entry.id }}
                    key={entry.id}
                  >
                    <EntryCard key={entry.id} entry={entry} />
                  </Link>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">No entries found</p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <EntryForm onCancel={() => setShowModal(false)} />
        </div>
      )}
    </div>
  )
}

export default Dashboard

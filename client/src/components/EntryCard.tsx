import type { Entry } from '../types'

interface EntryProps {
  entry: Entry
}

const EntryCard: React.FC<EntryProps> = ({ entry }) => {
  return (
    <div
      key={entry.id}
      className="bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition-colors"
    >
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gray-700 rounded-lg flex-shrink-0 overflow-hidden">
          {entry.image ? (
            <img
              src={entry.image}
              alt={entry.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center"></div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-white text-lg truncate">
                {entry.name}
              </h3>
              <p className="text-gray-400 text-sm">{entry.series}</p>
              <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                <span>{entry.grade}</span>
                <span>{entry.status}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EntryCard

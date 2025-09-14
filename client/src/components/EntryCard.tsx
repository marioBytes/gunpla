import type { Entry } from '@/types/entries'

interface EntryProps {
  entry: Entry
}

const EntryCard: React.FC<EntryProps> = ({ entry }) => {
  return (
    <div
      key={entry.id}
      className="bg-neutral-900 border border-neutral-700 rounded-lg p-4 hover:bg-neutral-800 transition-colors"
    >
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-neutral-800 border border-neutral-600 rounded-lg flex-shrink-0 overflow-hidden">
          {entry.images.length > 0 ? (
            <img
              src={entry.images[0]}
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
              <h3 className="font-semibold text-white text-lg">{entry.name}</h3>
              <p className="text-neutral-400 text-sm">{entry.series}</p>
              <div className="flex items-center gap-4 mt-1 text-sm text-neutral-500">
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

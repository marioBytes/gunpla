interface Status {
  label: string
}

interface StatusProps {
  status: Status
  count: number
}

const Status: React.FC<StatusProps> = ({ status, count }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-sm text-gray-400">{status.label}</span>
      </div>
      <div className="text-2xl font-bold">{count}</div>
    </div>
  )
}

export default Status

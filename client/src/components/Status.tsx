interface Status {
  label: string
}

interface StatusProps {
  status: Status
  count: number
}

const Status: React.FC<StatusProps> = ({ status, count }) => {
  return (
    <div className="bg-neutral-900 border border-neutral-700 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-sm text-neutral-400">{status.label}</span>
      </div>
      <div className="text-2xl font-bold text-white">{count}</div>
    </div>
  )
}

export default Status

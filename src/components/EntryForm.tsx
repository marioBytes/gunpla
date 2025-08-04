import { GRADES, STATUS } from '@/constants'
import { useAppForm } from '@/hooks/form'

interface EntryFormProps {
  onCancel: () => void
}

const EntryForm: React.FC<EntryFormProps> = ({ onCancel }) => {
  const form = useAppForm({
    defaultValues: {
      name: '',
      grade: '',
      series: '',
      status: '',
      imageUrl: '',
    },
    validators: {
      onChange: ({ value }) => {
        const errors = {
          fields: {},
        } as {
          fields: Record<string, string>
        }

        if (value.name.trim().length === 0) {
          errors.fields.name = 'Name is required'
        }

        return errors
      },
    },
    onSubmit: ({ value }) => {
      console.log(value)
    },
  })

  const handleOnCancel = () => {
    if (form.state.isDirty) {
      form.reset()
    }

    onCancel()
  }

  return (
    <div className="bg-gray-800 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
        className="p-6"
      >
        <h2 className="text-xl font-bold mb-4">Add New Entry</h2>

        <div className="space-y-4">
          <form.AppField name="name">
            {(field) => (
              <field.TextField label="Name *" placeholder="e.g. RG Nu Gundam" />
            )}
          </form.AppField>

          <form.AppField name="grade">
            {(field) => <field.Select label="Grade" values={GRADES} />}
          </form.AppField>

          <form.AppField name="series">
            {(field) => (
              <field.TextField
                label="Series"
                placeholder="e.g. Mobile Suit Gunam"
              />
            )}
          </form.AppField>

          <form.AppField name="status">
            {(field) => <field.Select label="Status" values={STATUS} />}
          </form.AppField>

          <form.AppField name="imageUrl">
            {(field) => <field.TextField label="Image URL" />}
          </form.AppField>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => handleOnCancel()}
            className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <form.AppForm>
            <form.SubscribeButton label="Add Entry" />
          </form.AppForm>
        </div>
      </form>
    </div>
  )
}

export default EntryForm

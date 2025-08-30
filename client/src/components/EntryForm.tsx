import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { Entry } from '@/types'
import { GRADES, STATUS } from '@/constants'
import { useAppForm } from '@/hooks/form'
import { modelCreateQueryFn, modelQueryFn, modelUpdateQueryFn } from '@/query'

interface EntryFormProps {
  entry?: Entry
  onCancel: () => void
}

const EntryForm: React.FC<EntryFormProps> = ({ entry, onCancel }) => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: entry ? modelUpdateQueryFn : modelCreateQueryFn,
    onSuccess: (data, variables) => {
      queryClient.setQueryData(['models', { id: variables.id }], data)

      queryClient.fetchQuery({
        queryKey: ['/model', '$entryId'],
        queryFn: () => modelQueryFn({ queryKey: data.data.id }),
      })

      onCancel()
    },
    onError: (error) => {
      console.error('Something went wrong:', error)
    },
  })

  const form = useAppForm({
    defaultValues: {
      name: entry?.name || '',
      grade: entry?.grade || '',
      series: entry?.series || '',
      status: entry?.status || STATUS[0].value,
      images: entry?.images || [],
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
      const mutationData = {
        ...(entry && { id: entry.id }),
        name: value.name,
        grade: value.grade,
        series: value.series,
        status: value.status,
      }

      mutation.mutate(mutationData)
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
        <h2 className="text-xl font-bold mb-4">
          {entry ? 'Update ' : 'Add New '} Entry
        </h2>

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
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => handleOnCancel()}
            className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <form.AppForm>
            <form.SubscribeButton
              label={`${entry ? 'Update' : 'Add'} Entry`}
              mutation={mutation}
            />
          </form.AppForm>
        </div>
      </form>
    </div>
  )
}

export default EntryForm

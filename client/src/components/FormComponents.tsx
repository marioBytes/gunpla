import { useState } from 'react'
import { useStore } from '@tanstack/react-form'
import { Check, Eye, EyeOff, X } from 'lucide-react'

import { useFieldContext, useFormContext } from '../hooks/form-context'
import type { UseMutationResult } from '@tanstack/react-query'
import { validatePasswordRequirements } from '@/utils/utils'

export function SubscribeButton({
  label,
  className,
  mutation,
}: {
  label: string
  className?: string
  mutation?: UseMutationResult<any, Error, any, unknown>
}) {
  const form = useFormContext()
  return (
    <form.Subscribe selector={(state) => state}>
      {(state) => {
        const isPending = mutation?.isPending || false

        return (
          <button
            type="submit"
            disabled={state.isSubmitting || isPending}
            className={`w-full py-3 px-4 bg-yellow-500 hover:bg-yellow-600 disabled:bg-neutral-600 text-black font-medium rounded-lg transition-colors flex items-center justify-center gap-2${className ? ` ${className}` : ''}`}
          >
            {isPending || state.isSubmitting ? 'Submitting...' : label}
          </button>
        )
      }}
    </form.Subscribe>
  )
}

function ErrorMessages({
  errors,
}: {
  errors: Array<string | { message: string }>
}) {
  return (
    <>
      {errors.map((error) => (
        <div
          key={typeof error === 'string' ? error : error.message}
          className="text-red-500 italic"
        >
          <small>{typeof error === 'string' ? error : error.message}</small>
        </div>
      ))}
    </>
  )
}

export function TextField({
  label,
  placeholder,
  type = 'text',
  required = false,
}: {
  label: string
  placeholder?: string
  type?: 'email' | 'number' | 'password' | 'text'
  required?: boolean
}) {
  const field = useFieldContext<string>()
  const errors = useStore(field.store, (state) => state.meta.errors)

  return (
    <div className="space-y-4">
      <label
        htmlFor={label}
        className="block text-sm font-medium text-neutral-300 mb-2"
      >
        {label}
      </label>
      <input
        type={type}
        value={field.state.value}
        placeholder={placeholder}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        className="w-full pl-3 pr-4 py-3 bg-neutral-800 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-colors text-white"
        required={required}
      />
      {field.state.meta.isTouched && <ErrorMessages errors={errors} />}
    </div>
  )
}

const RequirementItem: React.FC<{
  met: boolean
  children: React.ReactNode
}> = ({ met, children }) => {
  return (
    <div
      className={`flex items-center space-x-2 text-sm transition-colors duration-200 ${
        met ? 'text-green-400' : 'text-neutral-400'
      }`}
    >
      {met ? (
        <Check className="w-4 h-4 text-green-400" />
      ) : (
        <X className="w-4 h-4 text-neutral-500" />
      )}
      <span>{children}</span>
    </div>
  )
}

export function PasswordField({
  label,
  placeholder,
  showValidation = false,
}: {
  label: string
  placeholder: string
  showValidation?: boolean
}) {
  const field = useFieldContext<string>()
  const [showPassword, setShowPassword] = useState(false)
  const errors = useStore(field.store, (state) => state.meta.errors)

  const password = field.state.value
  const requirements = validatePasswordRequirements(password)

  return (
    <div className="space-y-4">
      <label
        htmlFor={label}
        className="block text-sm font-medium text-white mb-2"
      >
        {label}
      </label>

      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          placeholder={placeholder}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          className="w-full bg-neutral-800 border text-white rounded-lg py-3 pl-3 pr-12 focus:outline-none focus:ring-2 transition-colors"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-white transition-colors"
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      </div>

      {field.state.meta.isTouched && errors.length > 0 && (
        <ErrorMessages errors={errors} />
      )}

      {showValidation && (
        <div className="bg-neutral-800 rounded-lg p-4 border border-neutral-600 space-y-2">
          <div className="text-sm font-medium text-neutral-300 mb-2">
            Password Requirements:
          </div>
          <RequirementItem met={requirements.length}>
            At least 12 characters
          </RequirementItem>
          <RequirementItem met={requirements.uppercase}>
            One uppercase letter (A-Z)
          </RequirementItem>
          <RequirementItem met={requirements.number}>
            One number (0-9)
          </RequirementItem>
          <RequirementItem met={requirements.special}>
            One special character (!@#$%^&*)
          </RequirementItem>
        </div>
      )}
    </div>
  )
}

export function TextArea({
  label,
  rows = 3,
}: {
  label: string
  rows?: number
}) {
  const field = useFieldContext<string>()
  const errors = useStore(field.store, (state) => state.meta.errors)

  return (
    <div>
      <label htmlFor={label} className="block font-bold mb-1 text-xl">
        {label}
        <textarea
          value={field.state.value}
          onBlur={field.handleBlur}
          rows={rows}
          onChange={(e) => field.handleChange(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white"
        />
      </label>
      {field.state.meta.isTouched && <ErrorMessages errors={errors} />}
    </div>
  )
}

export function Select({
  label,
  values,
}: {
  label: string
  values: Array<{ label: string; value: string }>
  placeholder?: string
}) {
  const field = useFieldContext<string>()
  const errors = useStore(field.store, (state) => state.meta.errors)

  return (
    <div>
      <label htmlFor={label} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <select
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        className="w-full px-3 py-3 bg-neutral-800 border border-white rounded-lg focus:ring-yellow-400 focus:border-yellow-400"
      >
        {values.map((value) => (
          <option key={value.value} value={value.value}>
            {value.label}
          </option>
        ))}
      </select>
      {field.state.meta.isTouched && <ErrorMessages errors={errors} />}
    </div>
  )
}

export function PasswordValidator({ value }: { value: string }) {
  console.log(value)

  return <div>Hello</div>
}

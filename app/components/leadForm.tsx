'use client'

import { useState } from 'react'

export default function LeadForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError('')

    const form = new FormData(event.target)

    const data = {
      full_name: form.get('full_name'),
      email: form.get('email'),
      company: form.get('company'),
      source: form.get('source'),
      message: form.get('message'),
    }

    try {
      const res = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      const result = await res.json()

      if (!res.ok) {
        setError(result.error || 'Something went wrong.')
        return
      }

      setSuccess(true)
      event.target.reset()
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold">Thank You</h2>
        <p className="text-gray-500 mt-2">
          Your details have been submitted successfully.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-4 text-blue-600 text-sm underline cursor-pointer"
        >
          Submit another lead
        </button>
      </div>
    )
  }

  const classes="w-full border border-gray-300 px-4 py-2 rounded-lg text-gray-900 placeholder-gray-400 focus:border-blue-500"
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* Error Message */}
      {error && (
        <p className="text-sm text-red-600 bg-red-50 p-2 rounded">
          {error}
        </p>
      )}

      <input
        name="full_name"
        required
        placeholder="Full name"
        className={classes}
        autoFocus
      />

      <input
        name="email"
        type="email"
        required
        placeholder="Email"
        className={classes}
      />

      <input
        name="company"
        placeholder="Company (optional)"
        className={classes}
      />

      <select
        name="source"
        required
        className={classes}
      >
        <option value="">How did you hear about us?</option>
        <option value="Google">Google</option>
        <option value="Referral">Referral</option>
        <option value="Social">Social</option>
        <option value="Other">Other</option>
      </select>

      <textarea
        name="message"
        rows={3}
        placeholder="Message (optional)"
        className={classes}
      />

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 rounded-lg disabled:opacity-60 cursor-pointer"
      >
        {isLoading ? 'Submitting...' : 'Submit'}
      </button>

    </form>
  )
}
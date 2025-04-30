'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from './Button'

export default function WaitlistForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const form = e.target
    const fullName = form.fullName.value
    const email = form.email.value
    const role = form.role.value

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, role })
      })

      if (!res.ok) {
        const result = await res.json()
        throw new Error(result.error || 'Something went wrong')
      }

      router.push('/thankyou')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative bg-white/20 p-8 rounded-lg my-8 max-w-2xl mx-auto waitlist-form">
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="fullName" className="block mb-2 font-medium uppercase text-sm">
            FULL NAME
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            className="w-full p-4 rounded-lg bg-white/90 text-black placeholder-gray-500"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 font-medium uppercase text-sm">
            EMAIL ADDRESS
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-4 rounded-lg bg-white/90 text-black placeholder-gray-500"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="role" className="block mb-2 font-medium uppercase text-sm">
            I AM A...
          </label>
          <select
            id="role"
            name="role"
            className="w-full p-4 rounded-lg bg-gray-800 text-white"
            required
            defaultValue=""
          >
            <option value="" disabled>Select your role</option>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="nurse">Nurse</option>
            <option value="other_healthcare_professional">Other Healthcare Professional</option>
          </select>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <Button disabled={loading}>
          {loading ? 'Submitting...' : 'Join Waitlist'}
        </Button>
      </form>
    </div>
  )
}

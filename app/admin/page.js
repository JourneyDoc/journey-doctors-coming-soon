'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function AdminPage() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchEntries() {
      try {
        // Fix: Added the /api prefix to the fetch URL
        const res = await fetch('/api/submit')
        
        if (!res.ok) {
          throw new Error(`Failed to load entries: ${res.status}`)
        }
        
        const data = await res.json()

        if (!Array.isArray(data)) {
          throw new Error('Invalid data received')
        }

        setEntries(data)
      } catch (err) {
        console.error('Failed to load entries:', err)
        setError('Invalid data received')
      } finally {
        setLoading(false)
      }
    }

    fetchEntries()
  }, [])

  function exportCSV() {
    if (entries.length === 0) return

    const header = ['Full Name', 'Email', 'Role', 'Date']
    const rows = entries.map(entry => [
      entry.fullName,
      entry.email,
      entry.role,
      new Date(entry.createdAt).toLocaleString()
    ])

    const csvContent = [header, ...rows].map(e => e.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'waitlist.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-indigo-600 via-purple-700 to-purple-900 text-white">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Waitlist Entries</h1>
          <div className="flex gap-3">
            <button
              onClick={exportCSV}
              disabled={entries.length === 0}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-medium disabled:bg-green-300 disabled:cursor-not-allowed shadow-lg transition-colors"
            >
              Export CSV
            </button>
            <Link
              href="/"
              className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-medium hover:bg-opacity-90 transition-colors shadow-lg"
            >
              Back to Site
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="py-8 text-center text-xl">Loading entries...</div>
        ) : error ? (
          <div className="py-8 text-center text-red-400 bg-red-400/10 rounded-2xl">{error}</div>
        ) : entries.length === 0 ? (
          <div className="py-8 text-center text-xl">No entries yet</div>
        ) : (
          <div className="overflow-auto rounded-2xl bg-white/5 backdrop-blur-lg">
            <table className="min-w-full text-left">
              <thead className="bg-white/10">
                <tr>
                  <th className="px-4 py-3 font-semibold">Full Name</th>
                  <th className="px-4 py-3 font-semibold">Email</th>
                  <th className="px-4 py-3 font-semibold">Role</th>
                  <th className="px-4 py-3 font-semibold">Submitted At</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, i) => (
                  <tr key={i} className="border-t border-white/10 hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3">{entry.fullName}</td>
                    <td className="px-4 py-3">{entry.email}</td>
                    <td className="px-4 py-3">{entry.role}</td>
                    <td className="px-4 py-3">{new Date(entry.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-4 py-3 bg-white/5 text-sm">Total Entries: {entries.length}</div>
          </div>
        )}
      </div>
    </div>
  )
}
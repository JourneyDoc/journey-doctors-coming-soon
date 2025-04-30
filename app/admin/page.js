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
        const res = await fetch('/submit')
        const data = await res.json()

        if (Array.isArray(data)) {
          setEntries(data)
        } else {
          setError('Invalid data received')
        }
      } catch (error) {
        console.error('Failed to load entries:', error)
        setError('Failed to load entries')
      } finally {
        setLoading(false)
      }
    }

    fetchEntries()
  }, [])

  function exportCSV() {
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
    <div className="min-h-screen p-8 bg-gradient-to-b from-purple-400 to-purple-200 text-white">
      <div className="bg-white/20 rounded-xl p-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Waitlist Entries</h1>
          <div className="flex gap-3">
            <button
              onClick={exportCSV}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md font-medium"
            >
              Export CSV
            </button>
            <Link
              href="/"
              className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md font-medium"
            >
              Back to Site
            </Link>
          </div>
        </div>

        {loading ? (
          <p>Loading entries...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : entries.length === 0 ? (
          <p>No entries yet</p>
        ) : (
          <div className="overflow-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr>
                  <th className="p-2">Full Name</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Role</th>
                  <th className="p-2">Submitted At</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(entries) &&
                  entries.map((entry, i) => (
                    <tr key={i} className="border-t border-white/10">
                      <td className="p-2">{entry.fullName}</td>
                      <td className="p-2">{entry.email}</td>
                      <td className="p-2">{entry.role}</td>
                      <td className="p-2">
                        {new Date(entry.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <p className="text-sm mt-4 text-white/80">Total Entries: {entries.length}</p>
          </div>
        )}
      </div>
    </div>
  )
}

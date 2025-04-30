'use client'

import Link from 'next/link'
import Logo from '../components/Logo'

export default function Success() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-purple-200 to-purple-400">
      <div className="bg-white/20 p-8 rounded-lg max-w-2xl mx-auto text-center">
        <div className="mb-6">
          <Logo />
        </div>
        <div className="flex justify-center mb-4">
          <svg
            className="w-16 h-16 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Thank You!</h2>
        <p className="text-lg text-white opacity-90 mb-6">
          You've been added to our waitlist. We'll notify you when we launch.
        </p>
        <Link 
          href="/"
          className="bg-white text-purple-600 px-6 py-2 rounded-lg font-medium hover:bg-purple-100 transition-colors inline-block"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}
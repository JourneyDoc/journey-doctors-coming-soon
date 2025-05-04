'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, Bell } from 'lucide-react'

export default function ThankYouPage() {
  const [isAnimated, setIsAnimated] = useState(false)
  
  useEffect(() => {
    // Trigger animation after component mounts
    setIsAnimated(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-700 to-purple-900 flex items-center justify-center p-4">
      <div 
        className={`bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl max-w-2xl w-full p-12 transition-all duration-700 transform ${
          isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* JD Logo */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/10 p-4 rounded-2xl inline-block backdrop-blur-lg">
            <div className="text-white flex items-center gap-3 font-bold text-3xl">
              <div className="p-1 border-2 border-white rounded-md">+</div>
              JD
            </div>
          </div>
        </div>
        
        {/* Success Icon */}
        <div className="flex justify-center mb-8">
          <div className="bg-green-500/20 backdrop-blur-md p-5 rounded-full">
            <svg
              className="w-16 h-16 text-green-400"
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
        </div>
        
        {/* Content */}
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold mb-6 tracking-tight">Thank You!</h2>
          
          <p className="text-xl mb-10 font-light">
            You've been added to our waitlist. We'll notify you when we launch.
          </p>
          
          <div className="py-3 px-5 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center gap-3 mt-6 mx-auto max-w-md">
            <Bell className="w-5 h-5" />
            <span className="text-base font-light">You'll receive an email notification</span>
          </div>
        </div>
        
        {/* Return Button */}
        <div className="mt-12 flex justify-center">
          <Link href="/" className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-medium hover:bg-opacity-90 transition-colors flex items-center gap-2 text-lg shadow-lg">
            <ChevronLeft className="w-5 h-5" />
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
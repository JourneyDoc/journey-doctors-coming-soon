'use client'

import { useState, useEffect } from 'react'

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: '45',
    hours: '00',
    minutes: '00',
    seconds: '00'
  })

  useEffect(() => {
    // Set a fixed launch date 45 days from today
    const today = new Date()
    const launchDate = new Date(today)
    launchDate.setDate(today.getDate() + 45)
    
    // Store the launch date in localStorage so it persists across page refreshes
    if (!localStorage.getItem('launchDate')) {
      localStorage.setItem('launchDate', launchDate.getTime().toString())
    }
    
    // Get the stored launch date
    const storedLaunchDate = new Date(parseInt(localStorage.getItem('launchDate') || launchDate.getTime().toString()))

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = storedLaunchDate - now

      if (distance < 0) {
        clearInterval(timer)
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' })
        return
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0')
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0')
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0')
      const seconds = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0')

      setTimeLeft({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex justify-center flex-wrap mb-10">
      {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
        <div key={unit} className="m-4 text-center countdown-item">
          <div className="text-6xl font-bold bg-purple-600/50 p-6 rounded-lg min-w-[120px] shadow-md countdown-number">
            {timeLeft[unit]}
          </div>
          <div className="text-sm uppercase mt-2 opacity-80 countdown-label">{unit}</div>
        </div>
      ))}
    </div>
  )
}
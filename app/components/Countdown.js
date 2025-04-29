'use client'

import { useState, useEffect } from 'react'

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  })

  useEffect(() => {
    const launchDate = new Date()
    launchDate.setDate(launchDate.getDate() + 30)

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = launchDate - now

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
          <div className="text-4xl font-bold bg-white/20 p-4 rounded-lg min-w-[80px] shadow-md countdown-number">
            {timeLeft[unit]}
          </div>
          <div className="text-sm uppercase mt-2 opacity-80 countdown-label">{unit}</div>
        </div>
      ))}
    </div>
  )
}
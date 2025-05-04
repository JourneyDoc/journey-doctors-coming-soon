'use client'

import { useState, useEffect } from 'react'
import Logo from './components/Logo'
import Countdown from './components/Countdown'
import WaitlistForm from './components/WaitlistForm'
import FeatureSection from './components/FeatureSection'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-purple-800 flex items-center justify-center p-4">
      <div className="container max-w-4xl w-full p-10 bg-purple-700/50 rounded-3xl backdrop-blur-lg shadow-2xl overflow-auto">
        <Logo />
        <h2 className="text-4xl font-bold mb-5 text-center text-white">Coming Soon.</h2>
        <div className="text-lg text-white/90 mb-5 max-w-3xl mx-auto">
          <p>We're building a new way to connect with care. Doctors and nurses you can trust, ready to meet you where you are at home, in a clinic, or through a video call. No gatekeepers. No long waits. Just real help when you need it most.</p>
        </div>
        <Countdown />
        <div className="my-10 p-5 bg-purple-600/50 rounded-xl">
          <h3 className="text-xl font-semibold mb-3 text-white">Our Mission</h3>
          <p className="text-base text-white/90">To bring healthcare closer, making it simple, personal, and within reach for everyone.</p>
        </div>
        <div className="my-10 p-5 bg-purple-600/50 rounded-xl">
          <h3 className="text-xl font-semibold mb-3 text-white">Our Vision</h3>
          <p className="text-base text-white/90">A world where care moves with you, not the other way around.</p>
        </div>
        <p className="text-lg text-white/90 mb-5">Be the first to know when we launch. Join the waitlist below.</p>
        <WaitlistForm />
        <FeatureSection />
      </div>
    </div>
  )
}
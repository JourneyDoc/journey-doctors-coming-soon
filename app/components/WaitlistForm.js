'use client'

import { useState } from 'react'

export default function WaitlistForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: ''
  })

  const handleSubmit = () => {
    if (formData.fullName && formData.email && formData.role) {
      alert('Thank you for joining our waitlist! We\'ll notify you when we launch.')
      setFormData({ fullName: '', email: '', role: '' })
    } else {
      alert('Please fill in all fields.')
    }
  }

  return (
    <div className="bg-white/20 p-8 rounded-lg my-8 max-w-2xl mx-auto waitlist-form">
      <div className="mb-5">
        <label htmlFor="fullName" className="block mb-2 font-medium uppercase text-sm">Full Name</label>
        <input
          type="text"
          id="fullName"
          className="w-full p-4 rounded-lg bg-white/90 text-black placeholder-gray-500 form-input"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
        />
      </div>
      <div className="mb-5">
        <label htmlFor="email" className="block mb-2 font-medium uppercase text-sm">Email Address</label>
        <input
          type="email"
          id="email"
          className="w-full p-4 rounded-lg bg-white/90 text-black placeholder-gray-500 form-input"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      <div className="mb-5">
        <label htmlFor="role" className="block mb-2 font-medium uppercase text-sm">I am a...</label>
        <select
          id="role"
          className="w-full p-4 rounded-lg bg-white/90 text-black placeholder-gray-500 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23333\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e')] bg-no-repeat bg-[right_15px_center] bg-[length:15px] form-input"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        >
          <option value="" disabled>Select your role</option>
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
          <option value="nurse">Nurse</option>
          <option value="other_healthcare_professional">Other Healthcare Professional</option>
        </select>
      </div>
      <button
        onClick={handleSubmit}
        className="w-full p-4 rounded-lg bg-white text-[#6b68ff] font-semibold hover:-translate-y-1 hover:shadow-xl transition-all"
      >
        Join Waitlist
      </button>
    </div>
  )
}
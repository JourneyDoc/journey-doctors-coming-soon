import Link from 'next/link'
import Logo from '../components/Logo'

export default function ThankYou() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-purple-200 to-purple-400">
      <div className="container max-w-4xl w-full p-10 bg-white/15 rounded-2xl backdrop-blur-lg shadow-2xl overflow-auto text-center">
        <Logo />
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
        <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
        <p className="text-lg mb-8">
          You've been added to our waitlist. We'll notify you when we launch.
        </p>
        <Link 
          href="/"
          className="bg-white text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-purple-100 transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  )
}
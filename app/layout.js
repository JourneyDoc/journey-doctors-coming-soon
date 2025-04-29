import './globals.css'

export const metadata = {
  title: 'JourneyDoctors.com - Coming Soon',
  description: 'Connecting you with trusted healthcare providers',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center p-5">
        {children}
      </body>
    </html>
  )
}
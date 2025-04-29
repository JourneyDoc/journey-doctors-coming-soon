export default function FeatureSection() {
  const features = [
    { icon: '🏥', text: 'Trusted Providers' },
    { icon: '🔒', text: 'Secure & Private' },
    { icon: '📱', text: 'Always Accessible' },
  ]

  return (
    <div className="flex justify-center flex-wrap gap-5 mt-8">
      {features.map((feature, index) => (
        <div
          key={index}
          className="flex flex-col items-center p-5 bg-white/20 rounded-xl w-48 hover:-translate-y-1 hover:bg-white/30 hover:shadow-xl transition-all feature"
        >
          <div className="text-4xl mb-2 feature-icon">{feature.icon}</div>
          <div className="font-semibold text-sm uppercase feature-text">{feature.text}</div>
        </div>
      ))}
    </div>
  )
}
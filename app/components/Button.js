export default function Button({ children, disabled, className, type = 'submit', ...props }) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`w-full p-4 rounded-lg ${
        disabled ? 'opacity-70 cursor-not-allowed' : 'bg-white text-purple-600'
      } font-semibold hover:-translate-y-1 hover:shadow-xl transition-all ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  )
}

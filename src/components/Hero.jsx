import React, { useRef } from 'react'
import Spline from '@splinetool/react-spline'
import { ChevronDown } from 'lucide-react'

export default function Hero({ onScrollNext }) {
  const containerRef = useRef(null)

  return (
    <section ref={containerRef} className="relative h-[90vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/atN3lqky4IzF-KEP/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/30 to-white/80 pointer-events-none" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900 drop-shadow-sm">
          Step into my little anime world
        </h1>
        <p className="mt-4 max-w-xl text-gray-700 text-lg sm:text-xl">
          A playful, storybook portfolio guided by a tiny narrator.
        </p>
        <button
          onClick={onScrollNext}
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-pink-500 text-white px-6 py-3 shadow-lg hover:bg-pink-600 transition"
        >
          Start the story
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </button>
      </div>
    </section>
  )
}

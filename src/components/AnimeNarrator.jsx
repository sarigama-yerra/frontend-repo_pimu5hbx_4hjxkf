import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Simple anime-style chibi narrator with chat bubble
export default function AnimeNarrator({ line, visible = true }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-6 left-6 z-50 flex items-end gap-3"
        >
          {/* Character */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2.2, repeat: Infinity }}
            className="relative"
          >
            <div className="w-16 h-16 rounded-full bg-pink-200 border-4 border-pink-300 shadow-inner" />
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-10 bg-pink-300 rounded-t-full blur-sm opacity-40" />
            <div className="absolute -top-2 -right-2 w-4 h-8 bg-pink-300 rounded-b-full rotate-12" />
            <div className="absolute -top-1 -left-2 w-4 h-8 bg-pink-300 rounded-b-full -rotate-12" />
            <div className="absolute inset-0 flex items-center justify-center text-pink-700 font-bold">^_^</div>
          </motion.div>

          {/* Chat bubble */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-xs bg-white/90 backdrop-blur border border-pink-200 shadow-xl rounded-2xl px-4 py-3"
          >
            <p className="text-sm text-gray-800">{line}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

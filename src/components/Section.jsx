import React from 'react'
import { motion } from 'framer-motion'

export default function Section({ title, subtitle, children, pastel = 'from-pink-50 to-blue-50' }) {
  return (
    <section className={`relative min-h-screen w-full bg-gradient-to-br ${pastel} flex items-center justify-center px-6 py-24`}>\
      <div className="max-w-5xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-5xl font-extrabold text-gray-900"
        >
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-3 text-gray-700 text-lg"
          >
            {subtitle}
          </motion.p>
        )}
        <div className="mt-10">
          {children}
        </div>
      </div>
    </section>
  )
}

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Sparkles, Wand2, Mail, Music, VolumeX } from 'lucide-react'
import Hero from './components/Hero'
import AnimeNarrator from './components/AnimeNarrator'
import Section from './components/Section'

function App() {
  const [section, setSection] = useState('intro')
  const [soundOn, setSoundOn] = useState(false)
  const audioRef = useRef(null)

  const sections = [
    { id: 'intro', title: 'Introduction', subtitle: "Welcome in! Let's start our little adventure." },
    { id: 'projects', title: 'Projects', subtitle: 'Stories where ideas turned into living things.' },
    { id: 'skills', title: 'Skills', subtitle: 'Sparkly tools and powers gathered along the way.' },
    { id: 'about', title: 'About Me', subtitle: 'A peek inside the diary pages.' },
    { id: 'contact', title: 'Contact', subtitle: 'Wanna leave me a message? The cafe is open!' }
  ]

  const lines = {
    intro: "Hi! I’m your tiny guide. Ready to explore my world?",
    projects: "These are my quests—each with a touch of magic!",
    skills: "Here are my shiny skills—stars I picked up on my journey.",
    about: "This diary page holds little secrets about me~",
    contact: "Tea? Cookies? Or maybe a message for me?"
  }

  const refs = useRef({})
  sections.forEach(s => { if (!refs.current[s.id]) refs.current[s.id] = React.createRef() })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) {
          const id = visible.target.getAttribute('data-section')
          if (id) setSection(id)
        }
      },
      { threshold: [0.2, 0.5, 0.8] }
    )

    const targets = sections.map(s => refs.current[s.id]?.current).filter(Boolean)
    targets.forEach(t => observer.observe(t))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!audioRef.current) return
    if (soundOn) {
      audioRef.current.volume = 0.2
      audioRef.current.play().catch(() => {})
    } else {
      audioRef.current.pause()
    }
  }, [soundOn])

  const scrollTo = (id) => {
    refs.current[id]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen w-full text-gray-900 bg-gradient-to-b from-pink-50 via-violet-50 to-blue-50">
      {/* Optional ambience (royalty-free gentle tone hosted by Vite public if needed) */}
      <audio ref={audioRef} loop src="https://cdn.pixabay.com/download/audio/2022/03/15/audio_0d0e8b3f3f.mp3?filename=gentle-ambience-110997.mp3" />

      {/* Floating controls */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <button
          onClick={() => setSoundOn(v => !v)}
          className="rounded-full bg-white/90 backdrop-blur border border-pink-200 shadow px-3 py-2 flex items-center gap-2 hover:bg-white"
        >
          {soundOn ? <Music className="h-4 w-4 text-pink-600" /> : <VolumeX className="h-4 w-4 text-gray-500" />}<span className="text-sm">{soundOn ? 'Sound on' : 'Sound off'}</span>
        </button>
      </div>

      {/* Hero with Spline cover */}
      <Hero onScrollNext={() => scrollTo('intro')} />

      {/* Story sections */}
      <div className="space-y-0">
        <div ref={refs.current.intro} data-section="intro">
          <Section
            title="Introduction"
            subtitle="Welcome to my pastel storybook."
            pastel="from-rose-50 to-amber-50"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-lg text-gray-700 max-w-3xl"
            >
              I design and build interactive experiences that feel warm, whimsical, and thoughtful. Scroll with me and I’ll show you around!
            </motion.p>
          </Section>
        </div>

        <div ref={refs.current.projects} data-section="projects">
          <Section
            title="Projects"
            subtitle="A few enchanted chapters from my journey."
            pastel="from-violet-50 to-sky-50"
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1,2,3].map(i => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  whileHover={{ y: -6 }}
                  className="rounded-2xl bg-white/80 backdrop-blur border border-violet-200 p-5 shadow hover:shadow-lg transition"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold">Project {i}</h3>
                    <Sparkles className="h-5 w-5 text-violet-500" />
                  </div>
                  <p className="mt-2 text-sm text-gray-600">A magical little build with cute animations and thoughtful UX.</p>
                  <motion.div
                    className="mt-4 h-2 rounded bg-violet-100 overflow-hidden"
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${60 + i * 10}%` }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-pink-400 to-violet-500"
                    />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </Section>
        </div>

        <div ref={refs.current.skills} data-section="skills">
          <Section
            title="Skills"
            subtitle="Shiny stars collected along the way."
            pastel="from-sky-50 to-emerald-50"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {["React","Framer Motion","Tailwind","FastAPI","MongoDB","Spline","Figma","Three.js","TypeScript","Node.js"].map((s, idx) => (
                <motion.div
                  key={s}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="flex items-center gap-2 rounded-xl bg-white/80 backdrop-blur border border-emerald-200 px-3 py-2 shadow"
                >
                  <Star className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm">{s}</span>
                </motion.div>
              ))}
            </div>
          </Section>
        </div>

        <div ref={refs.current.about} data-section="about">
          <Section
            title="About Me"
            subtitle="A diary page with notes and doodles."
            pastel="from-amber-50 to-pink-50"
          >
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <motion.div
                initial={{ rotate: -2, opacity: 0, y: 20 }}
                whileInView={{ rotate: 0, opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                className="rounded-2xl bg-white/90 backdrop-blur border border-amber-200 p-6 shadow relative"
              >
                <div className="absolute -top-3 -left-3 rotate-[-6deg] px-3 py-1 bg-pink-200 text-pink-800 rounded">Diary</div>
                <p className="text-gray-700 leading-relaxed">
                  Hi! I blend code and design to craft friendly, motion-rich interfaces. When I’m not building, I’m sketching little characters, sipping tea, and learning new tricks to make the web feel alive.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                className="rounded-2xl bg-white/90 backdrop-blur border border-amber-200 p-6 shadow"
              >
                <h4 className="font-semibold">Highlights</h4>
                <ul className="mt-3 space-y-2 text-gray-700">
                  <li className="flex items-center gap-2"><Wand2 className="h-4 w-4 text-amber-600" /> 3+ years crafting React apps</li>
                  <li className="flex items-center gap-2"><Wand2 className="h-4 w-4 text-amber-600" /> Motion-first design approach</li>
                  <li className="flex items-center gap-2"><Wand2 className="h-4 w-4 text-amber-600" /> Loves playful, interactive storytelling</li>
                </ul>
              </motion.div>
            </div>
          </Section>
        </div>

        <div ref={refs.current.contact} data-section="contact">
          <Section
            title="Contact"
            subtitle="Cafe corner chat—drop a note!"
            pastel="from-pink-50 to-indigo-50"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                className="rounded-2xl bg-white/90 backdrop-blur border border-indigo-200 p-6 shadow"
              >
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Message sent with sparkles! ✨'); }}>
                  <div>
                    <label className="block text-sm text-gray-700">Name</label>
                    <input className="mt-1 w-full rounded-xl border border-indigo-200 bg-white/80 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Email</label>
                    <input type="email" className="mt-1 w-full rounded-xl border border-indigo-200 bg-white/80 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300" placeholder="you@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">Message</label>
                    <textarea className="mt-1 w-full rounded-xl border border-indigo-200 bg-white/80 px-3 py-2 h-28 focus:outline-none focus:ring-2 focus:ring-indigo-300" placeholder="Tell me about your idea" />
                  </div>
                  <button className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 text-white px-4 py-2 shadow hover:bg-indigo-600 transition">
                    <Mail className="h-4 w-4" /> Send Message
                  </button>
                </form>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                className="text-center"
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mx-auto w-44 h-44 rounded-full bg-pink-200 border-4 border-pink-300 shadow-inner flex items-center justify-center text-pink-700 font-bold"
                >
                  ^_^
                </motion.div>
                <p className="mt-4 text-gray-700">I’ll be waiting here with warm cocoa!</p>
              </motion.div>
            </div>
          </Section>
        </div>
      </div>

      {/* Narrator */}
      <AnimeNarrator line={lines[section]} visible={true} />

      {/* Simple footer */}
      <footer className="py-10 text-center text-sm text-gray-500">Made with love and sparkles ✨</footer>
    </div>
  )
}

export default App

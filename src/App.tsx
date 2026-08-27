import { useState, useRef } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

type Screen = 'intro' | 'question' | 'feedback' | 'result'

interface Question {
  id: number
  type: 'multiple' | 'truefalse' | 'scenario' | 'numguess' | 'mockfeed' | 'mockpost' | 'didyouknow'
  question: string
  options: string[]
  correct: number
  explanation: string
  source: string
}

// ─── Questions ────────────────────────────────────────────────────────────────

const QUESTIONS: Question[] = [
  {
    id: 1,
    type: 'numguess',
    question: 'How many teens say social media sometimes makes them feel pressure to look their best or come across a certain way?',
    options: ['About 1 in 5', 'About 2 in 5', 'About 4 in 5', 'Pretty much everyone'],
    correct: 2,
    explanation: 'About 4 in 5 teens say they feel this pressure — so if you feel it too, you\'re definitely not alone.',
    source: 'Common Sense Media, Center for Digital Thriving & Indiana University (2024), Unpacking Grind Culture in American Teens',
  },
  {
    id: 2,
    type: 'multiple',
    question: 'Besides looks, what else can people feel pressure about online?',
    options: ['Having a fun social life', 'Doing well or achieving things', 'Always being there for friends', 'All of these'],
    correct: 3,
    explanation: 'Online pressure covers way more than appearances — your social life, achievements, and how available you seem can all feel on display.',
    source: 'Common Sense Media, Center for Digital Thriving & Indiana University (2024), Unpacking Grind Culture in American Teens',
  },
  {
    id: 4,
    type: 'truefalse',
    question: 'Once you know social media is filtered and curated, it shouldn\'t really affect how you compare yourself anymore.',
    options: ['True', 'False'],
    correct: 1,
    explanation: 'Knowing something intellectually doesn\'t stop it from affecting you emotionally. Comparison can still sting even when you\'re aware of how feeds work.',
    source: 'Fardouly & Holland (2018), New Media & Society',
  },
  {
    id: 5,
    type: 'multiple',
    question: 'Who do people compare themselves to online?',
    options: ['Mostly celebrities', 'Mostly influencers', 'Mostly people they know', 'It can be friends, classmates, influencers, celebrities, or basically anyone'],
    correct: 3,
    explanation: 'Comparison doesn\'t have one target. Your brain can size you up against your best friend, a random influencer, or a celebrity in the same scroll.',
    source: 'Burnell et al. (2024), Journal of Youth and Adolescence',
  },
  {
    id: 6,
    type: 'mockfeed',
    question: 'Your feed suddenly feels like everyone is going to the gym. What does that actually tell you?',
    options: [
      'Most people your age are working out all the time',
      'Fitness must be getting way more popular',
      'Your friends are more active than you',
      'Not much. Your feed is partly shaped by what you click on',
    ],
    correct: 3,
    explanation: 'Algorithms amplify what you engage with. A gym-heavy feed says more about your clicks than about what everyone is actually doing.',
    source: 'TikTok (2020), "How TikTok recommends videos #ForYou"',
  },
  {
    id: 7,
    type: 'scenario',
    question: 'Someone posts a selfie and gets a ton of likes. What does that tell you about how they feel about themselves?',
    options: ['They\'re probably really confident', 'They probably love how they look', 'They probably have high self-esteem', 'You really can\'t tell'],
    correct: 3,
    explanation: 'Posting confidently and actually feeling confident are different things. Lots of people post seeking reassurance, not because they already have it.',
    source: 'Chua & Chang (2016), Computers in Human Behavior',
  },
  {
    id: 8,
    type: 'didyouknow',
    question: 'In one study, teens and young adults cut their social media use by about half for a few weeks. What happened?',
    options: ['Nothing really changed', 'They felt more left out', 'They felt better about their appearance and weight', 'They got more anxious'],
    correct: 2,
    explanation: 'Less scrolling, fewer comparisons — and people actually felt better about their bodies. The link between feed time and body image is real.',
    source: 'Thai et al. (2023), Psychology of Popular Media',
  },
  {
    id: 3,
    type: 'multiple',
    question: 'Which of these do teens say social media can make them feel pressure about?',
    options: [
      'How they look',
      'How much they\'re achieving',
      'Their social life',
      'All of these',
    ],
    correct: 3,
    explanation: 'Teens report feeling pressure about all of it — looks, achievements, and social life. Online pressure shows up in a lot of different ways.',
    source: 'Chua & Chang (2016), Computers in Human Behavior',
  },
  {
    id: 9,
    type: 'scenario',
    question: 'When teens compare themselves to others on social media, what kind of comparison do they make most often in everyday use?',
    options: [
      'Comparing themselves to people doing much better than them',
      'Comparing themselves to people doing much worse than them',
      'Comparing themselves to people who seem pretty similar to them',
      'Teens almost never compare themselves online',
    ],
    correct: 0,
    explanation: 'Most social comparison online is upward — looking at people who seem to be doing better. That\'s part of why scrolling can leave you feeling like you\'re falling behind.',
    source: 'Chua & Chang (2016), Computers in Human Behavior',
  },
  {
    id: 10,
    type: 'multiple',
    question: 'Which of these is closest to the truth about social media and mental health?',
    options: [
      'Social media is bad for everyone',
      'Social media doesn\'t really affect mental health',
      'More time online always means worse mental health',
      'It can help or hurt depending on what you see, what you do, and how it affects you',
    ],
    correct: 3,
    explanation: 'It\'s not black and white. How social media affects you depends on how you use it, what you see, and what headspace you\'re already in.',
    source: 'American Psychological Association (2023), Health Advisory on Social Media Use in Adolescence',
  },
]

// ─── Mock Post ────────────────────────────────────────────────────────────────

function MockPost() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow border border-purple-100 mb-3">
      <div className="flex items-center gap-2 px-3 py-2">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">J</div>
        <div>
          <div className="text-xs font-bold text-gray-800">jess_adventures</div>
          <div className="text-[10px] text-gray-400">Saturday • 📍 Downtown</div>
        </div>
        <div className="ml-auto text-gray-300 text-xs">•••</div>
      </div>
      <div className="grid grid-cols-2 gap-px bg-gray-100">
        <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=200&h=160&fit=crop&auto=format" alt="friends at cafe" className="w-full h-24 object-cover" />
        <img src="https://images.unsplash.com/photo-1519671282429-b44b532eecc2?w=200&h=160&fit=crop&auto=format" alt="night out" className="w-full h-24 object-cover" />
        <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=160&fit=crop&auto=format" alt="group selfie" className="w-full h-24 object-cover" />
        <img src="https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=200&h=160&fit=crop&auto=format" alt="food" className="w-full h-24 object-cover" />
      </div>
      <div className="px-3 py-2">
        <div className="flex gap-3 text-gray-400 text-xs mb-1">❤️ 847 &nbsp;💬 93</div>
        <p className="text-xs text-gray-700"><span className="font-bold">jess_adventures</span> best weekend ever honestly 🥹✨ so grateful for these people</p>
      </div>
    </div>
  )
}

// ─── Mock Feed ────────────────────────────────────────────────────────────────

const GYM_POSTS = [
  { user: 'fit_tyler', img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300&h=200&fit=crop&auto=format', caption: 'Morning grind never misses 💪', likes: '2.1k' },
  { user: 'strong.sara', img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300&h=200&fit=crop&auto=format', caption: 'PR day!! so proud 🏋️', likes: '934' },
  { user: 'gymrat_kai', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=200&fit=crop&auto=format', caption: 'Consistency > motivation', likes: '1.4k' },
]

function MockFeed() {
  return (
    <div className="space-y-2 mb-3">
      {GYM_POSTS.map((p) => (
        <div key={p.user} className="bg-white rounded-xl overflow-hidden shadow border border-purple-100 flex gap-2 p-2">
          <img src={p.img} alt={p.caption} className="w-16 h-14 object-cover rounded-lg flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex-shrink-0" />
              <span className="text-xs font-bold text-gray-800 truncate">{p.user}</span>
            </div>
            <p className="text-xs text-gray-600 leading-tight">{p.caption}</p>
            <div className="text-[10px] text-gray-400 mt-1">❤️ {p.likes}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Person Icon Groups ───────────────────────────────────────────────────────

function PersonGroup({ count, filled, color }: { count: number; filled: number; color: string }) {
  return (
    <div className="flex flex-wrap gap-0.5 justify-center">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" className="w-5 h-5" fill={i < filled ? color : '#e2e8f0'}>
          <circle cx="12" cy="7" r="4" />
          <path d="M12 14c-6 0-9 2.5-9 4v1h18v-1c0-1.5-3-4-9-4z" />
        </svg>
      ))}
    </div>
  )
}

// ─── Option Card ──────────────────────────────────────────────────────────────

const OPTION_COLORS = [
  { bg: 'bg-violet-500', hover: 'hover:bg-violet-600', border: 'border-violet-600', text: 'text-white' },
  { bg: 'bg-pink-500', hover: 'hover:bg-pink-600', border: 'border-pink-600', text: 'text-white' },
  { bg: 'bg-amber-400', hover: 'hover:bg-amber-500', border: 'border-amber-500', text: 'text-gray-900' },
  { bg: 'bg-teal-500', hover: 'hover:bg-teal-600', border: 'border-teal-600', text: 'text-white' },
]

function OptionCard({ label, index, disabled, isCorrect, isChosen, onClick }: {
  label: string; index: number; disabled: boolean
  isCorrect: boolean; isChosen: boolean; onClick: () => void
}) {
  const base = OPTION_COLORS[index % 4]
  let cls = 'w-full text-left px-3 py-3 rounded-xl border-b-4 font-bold text-xs leading-snug transition-all duration-150 cursor-pointer '
  if (disabled) {
    if (isChosen && isCorrect) cls += 'bg-green-500 border-green-700 text-white scale-95 '
    else if (isChosen) cls += 'bg-red-400 border-red-600 text-white scale-95 '
    else if (isCorrect) cls += 'bg-green-100 border-green-400 text-green-800 '
    else cls += `${base.bg} ${base.border} ${base.text} opacity-40 `
  } else {
    cls += `${base.bg} ${base.hover} ${base.border} ${base.text} active:scale-95 `
  }
  return <button onClick={onClick} disabled={disabled} className={cls}>{label}</button>
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────

function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className="flex-1 h-2.5 bg-white/50 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-violet-500 to-pink-500 rounded-full transition-all duration-500"
          style={{ width: `${(current / total) * 100}%` }}
        />
      </div>
      <span className="font-display text-purple-700 text-xs whitespace-nowrap">{current}/{total}</span>
    </div>
  )
}

// ─── Status Bar ───────────────────────────────────────────────────────────────

function StatusBar() {
  const now = new Date()
  const h = now.getHours()
  const m = now.getMinutes().toString().padStart(2, '0')
  const time = `${h > 12 ? h - 12 : h || 12}:${m}`
  return (
    <div className="flex items-center justify-between px-5 pt-3 pb-1 flex-shrink-0">
      <span className="text-[11px] font-bold text-gray-700">{time}</span>
      <div className="flex items-center gap-1">
        {/* Signal bars */}
        <svg viewBox="0 0 18 12" className="w-4 h-3 fill-gray-700">
          <rect x="0" y="8" width="3" height="4" rx="0.5" />
          <rect x="4.5" y="5.5" width="3" height="6.5" rx="0.5" />
          <rect x="9" y="3" width="3" height="9" rx="0.5" />
          <rect x="13.5" y="0" width="3" height="12" rx="0.5" />
        </svg>
        {/* Wifi */}
        <svg viewBox="0 0 16 12" className="w-3.5 h-3 fill-gray-700">
          <path d="M8 9a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"/>
          <path d="M3.5 6A6.5 6.5 0 0112.5 6" stroke="#374151" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          <path d="M1 3.5A10 10 0 0115 3.5" stroke="#374151" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        </svg>
        {/* Battery */}
        <div className="flex items-center gap-0.5">
          <div className="w-5 h-2.5 rounded-sm border border-gray-700 relative flex items-center px-px">
            <div className="w-3.5 h-1.5 bg-gray-700 rounded-sm" />
          </div>
          <div className="w-0.5 h-1.5 bg-gray-700 rounded-r-sm" />
        </div>
      </div>
    </div>
  )
}

// ─── Phone Frame ──────────────────────────────────────────────────────────────

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 flex items-center justify-center p-6">
      {/* Outer phone shell */}
      <div
        className="relative flex-shrink-0"
        style={{
          width: 375,
          height: 812,
          background: 'linear-gradient(145deg, #2d2d2d 0%, #1a1a1a 40%, #111 100%)',
          borderRadius: 54,
          padding: 12,
          boxShadow: `
            0 0 0 1px #444,
            inset 0 0 0 1px #555,
            0 40px 80px rgba(0,0,0,0.7),
            0 15px 30px rgba(0,0,0,0.5)
          `,
        }}
      >
        {/* Side buttons */}
        <div className="absolute -left-[3px] top-28 w-[3px] h-8 bg-[#3a3a3a] rounded-l-sm" />
        <div className="absolute -left-[3px] top-44 w-[3px] h-10 bg-[#3a3a3a] rounded-l-sm" />
        <div className="absolute -left-[3px] top-56 w-[3px] h-10 bg-[#3a3a3a] rounded-l-sm" />
        <div className="absolute -right-[3px] top-36 w-[3px] h-16 bg-[#3a3a3a] rounded-r-sm" />

        {/* Screen bezel */}
        <div
          className="relative overflow-hidden flex flex-col"
          style={{
            borderRadius: 44,
            background: '#f0e9ff',
            height: '100%',
            width: '100%',
          }}
        >
          {/* Dynamic Island */}
          <div
            className="absolute top-3 left-1/2 -translate-x-1/2 z-20"
            style={{
              width: 120,
              height: 34,
              background: '#0a0a0a',
              borderRadius: 20,
            }}
          />

          {/* Status bar sits below the island */}
          <div className="pt-10 flex-shrink-0">
            <StatusBar />
          </div>

          {/* Scrollable quiz content */}
          <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
            {children}
          </div>

          {/* Bottom safe area / home indicator */}
          <div className="flex-shrink-0 flex justify-center pb-2 pt-1 bg-transparent">
            <div className="w-28 h-1 bg-gray-700/30 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Quiz Content ─────────────────────────────────────────────────────────────

function QuizContent() {
  const [screen, setScreen] = useState<Screen>('intro')
  const [questionIndex, setQuestionIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const q = QUESTIONS[questionIndex]
  const isCorrect = selected === q?.correct
  const showFeedback = screen === 'feedback'

  function handleStart() {
    setScreen('question')
    setQuestionIndex(0)
    setSelected(null)
  }

  function handleSelect(i: number) {
    if (selected !== null) return
    setSelected(i)
    setScreen('feedback')
    setTimeout(() => scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' }), 50)
  }

  function handleNext() {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
    if (questionIndex + 1 >= QUESTIONS.length) {
      setScreen('result')
    } else {
      setQuestionIndex((n) => n + 1)
      setSelected(null)
      setScreen('question')
    }
  }

  function handleRestart() {
    setScreen('intro')
    setQuestionIndex(0)
    setSelected(null)
    scrollRef.current?.scrollTo({ top: 0 })
  }

  // ── Intro ────────────────────────────────────────────────────────────────

  if (screen === 'intro') {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-violet-100 via-purple-50 to-pink-100">
        <div className="text-center w-full">
          <div className="text-6xl mb-4">👀</div>
          <h1 className="font-display text-4xl text-violet-700 mb-2 leading-tight">My Reality</h1>
          <p className="text-xl font-extrabold text-gray-800 mb-3 leading-snug">How well do you know your feed?</p>
          <p className="text-gray-500 font-semibold mb-10 text-sm">10 quick reality checks. See how much your feed might be leaving out.</p>
          <button
            onClick={handleStart}
            className="w-full bg-violet-600 hover:bg-violet-700 active:scale-95 text-white font-display text-xl py-4 rounded-2xl border-b-4 border-violet-800 transition-all duration-150 shadow-lg"
          >
            Start 🚀
          </button>
          <p className="text-xs text-gray-400 mt-4 font-semibold">No score. No judgment. Just the reality check.</p>
        </div>
      </div>
    )
  }

  // ── Result ───────────────────────────────────────────────────────────────

  if (screen === 'result') {
    const TAKEAWAYS = [
      { icon: '📖', text: 'What gets posted is only part of the story.' },
      { icon: '🌍', text: 'Your feed isn\'t everyone\'s reality.' },
      { icon: '🔁', text: 'Knowing something is curated doesn\'t always stop comparison.' },
    ]
    return (
      <div ref={scrollRef as React.RefObject<HTMLDivElement>} className="p-5 bg-gradient-to-br from-violet-100 via-purple-50 to-pink-100 min-h-full flex flex-col justify-center">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">✨</div>
          <h2 className="font-display text-3xl text-violet-700 mb-0.5">Reality Check</h2>
          <h2 className="font-display text-3xl text-pink-500 mb-3">Complete</h2>
          <p className="text-gray-600 font-semibold text-sm">Here's what to carry with you:</p>
        </div>
        <div className="space-y-3 mb-6">
          {TAKEAWAYS.map((t) => (
            <div key={t.text} className="bg-white rounded-2xl p-4 flex items-start gap-3 shadow border border-purple-100">
              <span className="text-xl flex-shrink-0">{t.icon}</span>
              <p className="font-bold text-gray-800 text-sm leading-snug">{t.text}</p>
            </div>
          ))}
        </div>
        <button
          onClick={handleRestart}
          className="w-full bg-violet-600 hover:bg-violet-700 active:scale-95 text-white font-display text-xl py-4 rounded-2xl border-b-4 border-violet-800 transition-all duration-150 shadow-lg"
        >
          Done 👋
        </button>
      </div>
    )
  }

  // ── Question + Feedback ──────────────────────────────────────────────────

  const TYPE_BADGE: Record<string, { label: string; cls: string }> = {
    truefalse: { label: 'True or False', cls: 'bg-pink-100 text-pink-600' },
    didyouknow: { label: '💡 Did You Know?', cls: 'bg-amber-100 text-amber-700' },
    mockpost: { label: '📸 Real Scenario', cls: 'bg-pink-100 text-pink-600' },
    mockfeed: { label: '📱 Your Feed', cls: 'bg-teal-100 text-teal-600' },
    scenario: { label: '🤔 What do you think?', cls: 'bg-violet-100 text-violet-600' },
  }
  const badge = TYPE_BADGE[q.type]

  return (
    <div ref={scrollRef as React.RefObject<HTMLDivElement>} className="overflow-y-auto p-4 bg-gradient-to-br from-violet-100 via-purple-50 to-pink-100 min-h-full" style={{ scrollbarWidth: 'none' }}>
      <ProgressBar current={questionIndex + (showFeedback ? 1 : 0)} total={QUESTIONS.length} />

      {badge && (
        <div className="mb-2">
          <span className={`${badge.cls} text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide`}>
            {badge.label}
          </span>
        </div>
      )}

      <div className="bg-white rounded-2xl p-4 shadow border border-purple-100 mb-3">
        <p className="font-extrabold text-gray-800 text-sm leading-snug">{q.question}</p>
      </div>

      {q.type === 'mockpost' && <MockPost />}
      {q.type === 'mockfeed' && <MockFeed />}

      {/* Q1: person icon visual */}
      {q.id === 1 && (
        <div className="bg-white rounded-2xl p-3 mb-3 shadow border border-purple-100">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide text-center mb-2">Out of every 5 teens:</p>
          <div className="grid grid-cols-2 gap-2">
            {[1, 2, 4, 5].map((filled, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <PersonGroup count={5} filled={filled} color={['#8b5cf6', '#ec4899', '#f59e0b', '#14b8a6'][i]} />
                <span className="text-[10px] font-bold text-gray-500 text-center leading-tight">{q.options[i]}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Feedback banner */}
      {showFeedback && (
        <div className={`rounded-2xl p-3 mb-3 flex items-start gap-2.5 ${isCorrect ? 'bg-green-100 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <span className="text-xl flex-shrink-0">{isCorrect ? '✅' : '❌'}</span>
          <div>
            <p className={`font-display text-lg mb-0.5 ${isCorrect ? 'text-green-700' : 'text-red-600'}`}>
              {isCorrect ? 'Yep 👀' : 'Not quite 👀'}
            </p>
            <p className="text-xs text-gray-700 font-semibold leading-snug mb-2">{q.explanation}</p>
            <p className="text-[10px] text-gray-400 leading-snug"><span className="font-semibold">Source:</span> {q.source}</p>
          </div>
        </div>
      )}

      {/* Options — pre-answer */}
      {!showFeedback && (
        <div className={q.type === 'truefalse' ? 'grid grid-cols-2 gap-2' : 'space-y-2'}>
          {q.options.map((opt, i) => (
            <OptionCard
              key={i}
              label={opt}
              index={i}
              disabled={selected !== null}
              isCorrect={i === q.correct}
              isChosen={selected === i}
              onClick={() => handleSelect(i)}
            />
          ))}
        </div>
      )}

      {/* Options + Next — post-answer */}
      {showFeedback && (
        <div className="space-y-2">
          <div className={q.type === 'truefalse' ? 'grid grid-cols-2 gap-2' : 'space-y-2'}>
            {q.options.map((opt, i) => {
              const isCorrectOpt = i === q.correct
              const isChosen = i === selected
              let cls = 'w-full text-left px-3 py-3 rounded-xl border-2 font-bold text-xs leading-snug '
              if (isCorrectOpt) cls += 'bg-green-500 border-green-600 text-white '
              else if (isChosen) cls += 'bg-red-400 border-red-500 text-white '
              else cls += `${OPTION_COLORS[i % 4].bg} ${OPTION_COLORS[i % 4].border} ${OPTION_COLORS[i % 4].text} opacity-30 `
              return <div key={i} className={cls}>{opt}</div>
            })}
          </div>
          <button
            onClick={handleNext}
            className="w-full bg-violet-600 hover:bg-violet-700 active:scale-95 text-white font-display text-lg py-3.5 rounded-2xl border-b-4 border-violet-800 transition-all duration-150 shadow-lg"
          >
            {questionIndex + 1 >= QUESTIONS.length ? 'See Results ✨' : 'Next →'}
          </button>
        </div>
      )}
    </div>
  )
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <PhoneFrame>
      <QuizContent />
    </PhoneFrame>
  )
}

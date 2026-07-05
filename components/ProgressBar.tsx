'use client'

interface ProgressBarProps {
  steps: string[]
  currentStep: number
}

export default function ProgressBar({ steps, currentStep }: ProgressBarProps) {
  const stepMap = { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 }
  const currentMapped = stepMap[currentStep as keyof typeof stepMap]

  return (
    <div className="mb-10">
      <div className="flex justify-between">
        {steps.map((s, i) => {
          const num = i + 1
          const done = num < currentMapped
          const current = num === currentMapped
          return (
            <div key={i} className="flex flex-col items-center">
              <div className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-300 ${
                done || current
                  ? 'bg-space-indigo dark:bg-parchment text-parchment dark:text-space-indigo'
                  : 'bg-dusty-grape/20 dark:bg-almond-silk/20 text-dusty-grape/50 dark:text-almond-silk/50'
              } ${current ? 'ring-[3px] ring-space-indigo/20 dark:ring-parchment/20 scale-110' : ''}`}>
                {done ? (
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                ) : num}
              </div>
              <span className={`text-[10px] mt-1.5 leading-tight transition-colors duration-300 ${
                current
                  ? 'text-space-indigo dark:text-parchment font-semibold'
                  : done
                    ? 'text-dusty-grape/50 dark:text-almond-silk/50'
                    : 'text-dusty-grape/30 dark:text-almond-silk/30'
              }`}>{s}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

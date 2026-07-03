'use client'
export default function Checkbox({ checked, onChange, id }) {
  return (
    <button
      role="checkbox"
      aria-checked={checked}
      id={id}
      onClick={onChange}
      className={`w-5 h-5 shrink-0 rounded-md border-2 flex items-center justify-center transition-all duration-200 cursor-pointer ${
        checked
          ? 'bg-dusty-grape dark:bg-almond-silk border-dusty-grape dark:border-almond-silk'
          : 'border-dusty-grape/40 dark:border-almond-silk/40 bg-transparent hover:border-dusty-grape dark:hover:border-almond-silk'
      }`}
    >
      <svg
        className={`w-3 h-3 text-parchment dark:text-space-indigo transition-all duration-200 ${
          checked ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
        viewBox="0 0 12 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 6l3 3 5-5" />
      </svg>
    </button>
  )
}

import { Check } from 'lucide-react'

export default function Checkbox({ checked, id, green }) {
  return (
    <span
      aria-hidden="true"
      id={id}
      className={`inline-flex w-5 h-5 shrink-0 rounded-md border-2 items-center justify-center transition-all duration-200 ${
        green
          ? checked
            ? 'bg-green-500 border-green-500'
            : 'border-green-300 dark:border-green-700 bg-transparent'
          : checked
            ? 'bg-dusty-grape dark:bg-almond-silk border-dusty-grape dark:border-almond-silk'
            : 'border-dusty-grape/40 dark:border-almond-silk/40 bg-transparent'
      }`}
    >
      <Check
        className={`w-3 h-3 transition-all duration-200 ${
          green ? 'text-space-indigo' : 'text-parchment dark:text-space-indigo'
        } ${checked ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
      />
    </span>
  )
}

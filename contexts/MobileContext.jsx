'use client'
import { createContext, useContext, useState, useEffect } from 'react'

const MobileContext = createContext(false)

export function MobileProvider({ children }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <MobileContext.Provider value={isMobile}>
      {children}
    </MobileContext.Provider>
  )
}

export function useIsMobile() {
  return useContext(MobileContext)
}

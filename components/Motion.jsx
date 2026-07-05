'use client'
import { useInView } from '@/hooks/useInView'
import { useIsMobile } from '@/hooks/useIsMobile'

export function MotionSection({ children, className = '', delay = 0, ...props }) {
  const isMobile = useIsMobile()
  const [ref, isInView] = useInView()

  return (
    <div
      ref={ref}
      className={`${isMobile ? 'animate-on-scroll-mobile' : 'animate-on-scroll'}${isInView ? ' visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
      {...props}
    >
      {children}
    </div>
  )
}

export function StaggerGroup({ children, className = '', ...props }) {
  const [ref, isInView] = useInView()

  return (
    <div
      ref={ref}
      className={`stagger-parent${isInView ? ' visible' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export function StaggerItem({ children, className = '', ...props }) {
  return (
    <div className={`stagger-child ${className}`} {...props}>
      {children}
    </div>
  )
}

export function FadeIn({ children, className = '', delay = 0, ...props }) {
  const [ref, isInView] = useInView()

  return (
    <div
      ref={ref}
      className={`animate-fade-only${isInView ? ' visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
      {...props}
    >
      {children}
    </div>
  )
}

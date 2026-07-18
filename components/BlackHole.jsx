'use client'
import { useRef, useEffect, useState, useMemo } from 'react'

// ─── Constants ───────────────────────────────────────────────

const PERSPECTIVE = 1300
const VOID_COLOR = '#0a0908' // space-indigo — eclipse disk

// Theme-aware particle palettes (Oven warm identity)
const LIGHT_COLORS = ['#5e503f', '#a87f42', '#8a6f4d', '#c6ac8f'] // visible on parchment
const DARK_COLORS = ['#eae0d5', '#c6ac8f', '#e2b26e', '#8a7150'] // glowing embers

// ─── Defaults ────────────────────────────────────────────────

const DEFAULTS = {
    particleCount: 1000, // desktop (mobile gets 45%)
    particleSize: 4,     // 1–50 (mapped to 0.5–4.5px)
    outerRadius: 85,     // % of half-width
    tilt: 20,
    tiltSideway: 160,
    trail: 42,           // 0–50 (0 = no trail, 50 = max trail)
    orbitSpeed: 4,
    pullSpeed: 5,        // 0–20 (inward gravity pull)
}

// ─── Helpers ─────────────────────────────────────────────────

function hexToRgb(colorStr) {
    let r = 0, g = 0, b = 0
    if (!colorStr) return { r, g, b }
    if (colorStr.startsWith('#')) {
        const hex = colorStr.replace('#', '')
        if (hex.length === 3) {
            r = parseInt(hex[0] + hex[0], 16)
            g = parseInt(hex[1] + hex[1], 16)
            b = parseInt(hex[2] + hex[2], 16)
        } else if (hex.length >= 6) {
            r = parseInt(hex.substring(0, 2), 16)
            g = parseInt(hex.substring(2, 4), 16)
            b = parseInt(hex.substring(4, 6), 16)
        }
    } else if (colorStr.startsWith('rgb')) {
        const match = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
        if (match) {
            r = parseInt(match[1])
            g = parseInt(match[2])
            b = parseInt(match[3])
        }
    }
    return { r, g, b }
}

const VOID_RGB = hexToRgb(VOID_COLOR)

// ─── Component ───────────────────────────────────────────────

export default function BlackHole({
    particleCount = DEFAULTS.particleCount,
    particleSize: particleSizeRaw = DEFAULTS.particleSize,
    outerRadius = DEFAULTS.outerRadius,
    tilt = DEFAULTS.tilt,
    tiltSideway = DEFAULTS.tiltSideway,
    trail: trailRaw = DEFAULTS.trail,
    orbitSpeed = DEFAULTS.orbitSpeed,
    pullSpeed: pullSpeedRaw = DEFAULTS.pullSpeed,
    className = '',
}) {
    // Map whole-number slider values to effective render values
    const particleSize = 0.5 + (Math.max(1, Math.min(50, particleSizeRaw)) - 1) * (4 / 49)
    const pullSpeed = Math.max(0, pullSpeedRaw) / 2
    const trailAlpha = Math.max(0.02, 1 - (Math.max(0, Math.min(50, trailRaw)) / 50) * 0.98)

    const canvasRef = useRef(null)
    const fgCanvasRef = useRef(null)
    const containerRef = useRef(null)
    const particlesRef = useRef([])
    const animRef = useRef(0)
    const sizeRef = useRef({ w: 600, h: 600 })
    // Pointer interaction state: hover stoke (desktop) + drag wind-up (touch)
    const interactRef = useRef({ hovered: false, touching: false, lastX: 0, lastY: 0, moved: 0, target: 0, value: 0 })

    const [sizeVersion, setSizeVersion] = useState(0)
    const [inView, setInView] = useState(false)
    const [reducedMotion, setReducedMotion] = useState(false)
    const [isDark, setIsDark] = useState(true)

    const colors = useMemo(() => (isDark ? DARK_COLORS : LIGHT_COLORS), [isDark])

    // ─── Theme tracking (site toggles .dark on <html>) ───────
    useEffect(() => {
        const update = () => setIsDark(document.documentElement.classList.contains('dark'))
        update()
        const mo = new MutationObserver(update)
        mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
        return () => mo.disconnect()
    }, [])

    // ─── Reduced motion ──────────────────────────────────────
    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
        const update = () => setReducedMotion(mq.matches)
        update()
        if (mq.addEventListener) mq.addEventListener('change', update)
        return () => { if (mq.removeEventListener) mq.removeEventListener('change', update) }
    }, [])

    // ─── Pointer interaction (stoke the fire) ────────────────
    useEffect(() => {
        const el = containerRef.current
        if (!el) return
        const st = interactRef.current

        const onEnter = (e) => {
            // Only real mouse hover — touch uses drag instead
            if (e.pointerType === 'mouse') {
                st.hovered = true
                st.target = Math.max(st.target, 1)
            }
        }
        const onLeave = () => { st.hovered = false }
        const onDown = (e) => {
            st.touching = true
            st.moved = 0
            st.lastX = e.clientX
            st.lastY = e.clientY
        }
        const onMove = (e) => {
            if (!st.touching) return
            const dx = e.clientX - st.lastX
            const dy = e.clientY - st.lastY
            st.lastX = e.clientX
            st.lastY = e.clientY
            st.moved += Math.abs(dx) + Math.abs(dy)
            // Vertical drag winds the disk up (page scroll is disabled on this area)
            st.target = Math.min(1, st.target + (Math.abs(dy) + Math.abs(dx) * 0.4) / 160)
        }
        const onUp = () => {
            if (st.touching && st.moved < 10) st.target = Math.max(st.target, 0.6) // tap → short pulse
            st.touching = false
        }

        el.addEventListener('pointerenter', onEnter)
        el.addEventListener('pointerleave', onLeave)
        el.addEventListener('pointerdown', onDown)
        el.addEventListener('pointermove', onMove)
        window.addEventListener('pointerup', onUp)
        window.addEventListener('pointercancel', onUp)
        return () => {
            el.removeEventListener('pointerenter', onEnter)
            el.removeEventListener('pointerleave', onLeave)
            el.removeEventListener('pointerdown', onDown)
            el.removeEventListener('pointermove', onMove)
            window.removeEventListener('pointerup', onUp)
            window.removeEventListener('pointercancel', onUp)
        }
    }, [])

    // ─── Pause when offscreen (saves battery/CPU) ────────────
    useEffect(() => {
        const el = containerRef.current
        if (!el) return
        const obs = new IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting),
            { threshold: 0.05 }
        )
        obs.observe(el)
        return () => obs.disconnect()
    }, [])

    // ─── Resize Observer ─────────────────────────────────────
    useEffect(() => {
        const container = containerRef.current
        const canvas = canvasRef.current
        const fgCanvas = fgCanvasRef.current
        if (!container || !canvas || !fgCanvas) return

        const ro = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect
                const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
                canvas.width = width * dpr
                canvas.height = height * dpr
                canvas.style.width = `${width}px`
                canvas.style.height = `${height}px`
                fgCanvas.width = width * dpr
                fgCanvas.height = height * dpr
                fgCanvas.style.width = `${width}px`
                fgCanvas.style.height = `${height}px`
                const prev = sizeRef.current
                sizeRef.current = { w: width, h: height }
                if (prev.w !== width || prev.h !== height) {
                    setSizeVersion((v) => v + 1)
                }
            }
        })
        ro.observe(container)
        return () => ro.disconnect()
    }, [])

    // ─── Radius helpers (scale with container) ───────────────
    const voidRadiusFor = (w, h) => Math.max(22, Math.min(w, h) * 0.14)
    const outerRadiusFor = (w, h) => {
        const vr = voidRadiusFor(w, h)
        const pct = Math.max(0, Math.min(100, outerRadius)) / 100
        return vr + pct * (w / 2 - vr)
    }

    // ─── Initialize Particles ────────────────────────────────
    useEffect(() => {
        const { w, h } = sizeRef.current
        const vr = voidRadiusFor(w, h)
        const outer = outerRadiusFor(w, h)
        // Fewer particles on small screens
        const count = w < 640 ? Math.round(particleCount * 0.45) : particleCount

        const pts = []
        for (let i = 0; i < count; i++) {
            // Power distribution so density is higher near the event horizon
            const radius = vr + Math.pow(Math.random(), 2) * (outer - vr)
            pts.push({
                angle: Math.random() * Math.PI * 2,
                radius,
                height: (Math.random() - 0.5) * 16,
                speedOffset: 0.75 + Math.random() * 0.5,
                colorIdx: Math.floor(Math.random() * colors.length),
            })
        }
        particlesRef.current = pts
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [particleCount, colors, sizeVersion, outerRadius])

    // ─── Animation Loop ──────────────────────────────────────
    useEffect(() => {
        const canvas = canvasRef.current
        const fgCanvas = fgCanvasRef.current
        if (!canvas || !fgCanvas) return
        const ctx = canvas.getContext('2d')
        const fgCtx = fgCanvas.getContext('2d')
        if (!ctx || !fgCtx) return

        let lastTime = performance.now()

        const frame = (now, staticMode = false) => {
            const dt = staticMode ? 0 : Math.min((now - lastTime) / 16.667, 3)
            lastTime = now

            const { w, h } = sizeRef.current
            const dpr = Math.min(window.devicePixelRatio || 1, 1.5)

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
            fgCtx.setTransform(dpr, 0, 0, dpr, 0, 0)
            ctx.globalAlpha = 1.0
            fgCtx.globalAlpha = 1.0

            // Interaction intensity (hover stoke / drag wind-up), eased per frame
            const st = interactRef.current
            if (!st.hovered && !st.touching) st.target *= 0.93
            st.value += (st.target - st.value) * 0.07
            const boost = st.value
            const trailFade = Math.max(0.02, trailAlpha * (1 - 0.55 * boost)) // longer streaks when stoked

            if (staticMode) {
                ctx.clearRect(0, 0, w, h)
                fgCtx.clearRect(0, 0, w, h)
            } else {
                // Fade trails via destination-out (keeps canvas transparent)
                ctx.globalCompositeOperation = 'destination-out'
                ctx.fillStyle = `rgba(0, 0, 0, ${trailFade})`
                ctx.fillRect(0, 0, w, h)
                ctx.globalCompositeOperation = 'source-over'

                fgCtx.globalCompositeOperation = 'destination-out'
                fgCtx.fillStyle = `rgba(0, 0, 0, ${trailFade})`
                fgCtx.fillRect(0, 0, w, h)
                fgCtx.globalCompositeOperation = 'source-over'
            }

            const vr = voidRadiusFor(w, h)
            const outerRad = outerRadiusFor(w, h)
            const voidCx = w / 2
            const voidCy = h / 2
            const sizeBoost = w < 640 ? 0.8 : 1 // finer particle grain on mobile

            const pts = particlesRef.current
            const tiltRad = (tilt * Math.PI) / 180
            const tiltSidewayRad = (tiltSideway * Math.PI) / 180

            const backgroundParticles = []
            const foregroundParticles = []

            for (let i = 0; i < pts.length; i++) {
                const pt = pts[i]

                // Orbital speed increases closer to core (v ~ 1/sqrt(r))
                const speedFactor = Math.sqrt(vr / Math.max(pt.radius, 10))
                const localOrbitSpeed = orbitSpeed * (1 + 0.9 * boost) * speedFactor * pt.speedOffset
                const localPullSpeed = pullSpeed * speedFactor * pt.speedOffset

                pt.angle += localOrbitSpeed * 0.012 * dt
                pt.radius -= localPullSpeed * dt

                // Core consumption re-spawn
                if (pt.radius < vr) {
                    pt.radius = vr + 0.7 * (outerRad - vr) + Math.random() * 0.3 * (outerRad - vr)
                    pt.angle = Math.random() * Math.PI * 2
                    pt.height = (Math.random() - 0.5) * 16
                    continue
                }

                const cosA = Math.cos(pt.angle)
                const sinA = Math.sin(pt.angle)

                const x_base = pt.radius * cosA
                const y_base = pt.height
                const z_base = pt.radius * sinA

                // 1. Main inclination tilt (X-axis)
                const x1 = x_base
                const y1 = y_base * Math.cos(tiltRad) + z_base * Math.sin(tiltRad)
                const z1 = -y_base * Math.sin(tiltRad) + z_base * Math.cos(tiltRad)

                // 2. Sideway tilt (roll around Z-axis)
                const x3d = x1 * Math.cos(tiltSidewayRad) - y1 * Math.sin(tiltSidewayRad)
                const y3d = x1 * Math.sin(tiltSidewayRad) + y1 * Math.cos(tiltSidewayRad)
                const z3d = z1

                // 3D perspective projection
                const scale = PERSPECTIVE / (PERSPECTIVE + z3d)
                const px = voidCx + x3d * scale
                const py = voidCy + y3d * scale

                if (px < -30 || px > w + 30 || py < -30 || py > h + 30) continue

                const size = Math.max(0.3, particleSize * sizeBoost * scale)
                const alpha = Math.min(1, Math.max(0.35, 1 - ((z3d + outerRad) / (2 * outerRad)) * 0.45) + 0.2 * boost)
                const color = colors[pt.colorIdx % colors.length]

                const projected = { x: px, y: py, size, alpha, z: z3d, color }

                if (z3d >= 0) {
                    backgroundParticles.push(projected)
                } else {
                    foregroundParticles.push(projected)
                }
            }

            backgroundParticles.sort((a, b) => b.z - a.z)
            foregroundParticles.sort((a, b) => b.z - a.z)

            // Step A: background particles (behind the void)
            for (let i = 0; i < backgroundParticles.length; i++) {
                const pt = backgroundParticles[i]
                ctx.globalAlpha = pt.alpha
                ctx.fillStyle = pt.color
                ctx.beginPath()
                ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2)
                ctx.fill()
            }
            ctx.globalAlpha = 1.0

            // Step B: gravity void (eclipse disk)
            {
                const sphereGrad = ctx.createRadialGradient(
                    voidCx - vr * 0.25,
                    voidCy - vr * 0.3,
                    vr * 0.05,
                    voidCx,
                    voidCy,
                    vr
                )
                const edgeR = Math.min(255, VOID_RGB.r + 18)
                const edgeG = Math.min(255, VOID_RGB.g + 18)
                const edgeB = Math.min(255, VOID_RGB.b + 18)
                sphereGrad.addColorStop(
                    0,
                    `rgba(${Math.min(255, VOID_RGB.r + 8)}, ${Math.min(255, VOID_RGB.g + 8)}, ${Math.min(255, VOID_RGB.b + 8)}, 1)`
                )
                sphereGrad.addColorStop(0.65, `rgba(${VOID_RGB.r}, ${VOID_RGB.g}, ${VOID_RGB.b}, 1)`)
                sphereGrad.addColorStop(0.92, `rgba(${edgeR}, ${edgeG}, ${edgeB}, 1)`)
                sphereGrad.addColorStop(1, `rgba(${edgeR}, ${edgeG}, ${edgeB}, 0.9)`)

                ctx.globalAlpha = isDark ? 0.6 : 1.0
                ctx.fillStyle = sphereGrad
                ctx.beginPath()
                ctx.arc(voidCx, voidCy, vr, 0, Math.PI * 2)
                ctx.fill()
                ctx.globalAlpha = 1.0

                // Rim light
                const rimColor = isDark ? '234, 224, 213' : '198, 172, 143' // almond glow
                const rimGrad = ctx.createRadialGradient(voidCx, voidCy, vr * 0.88, voidCx, voidCy, vr * 1.02)
                rimGrad.addColorStop(0, `rgba(${rimColor}, 0)`)
                rimGrad.addColorStop(0.6, `rgba(${rimColor}, ${(0.08 + 0.06 * boost).toFixed(3)})`)
                rimGrad.addColorStop(0.85, `rgba(${rimColor}, ${(0.18 + 0.14 * boost).toFixed(3)})`)
                rimGrad.addColorStop(1, `rgba(${rimColor}, 0)`)
                ctx.fillStyle = rimGrad
                ctx.beginPath()
                ctx.arc(voidCx, voidCy, vr * 1.02, 0, Math.PI * 2)
                ctx.fill()
            }

            // Step C: foreground particles (in front of the void)
            for (let i = 0; i < foregroundParticles.length; i++) {
                const pt = foregroundParticles[i]
                fgCtx.globalAlpha = pt.alpha
                fgCtx.fillStyle = pt.color
                fgCtx.beginPath()
                fgCtx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2)
                fgCtx.fill()
            }
            fgCtx.globalAlpha = 1.0

            if (!staticMode) {
                animRef.current = requestAnimationFrame((t) => frame(t))
            }
        }

        if (reducedMotion) {
            // Single static frame — no loop
            animRef.current = requestAnimationFrame((t) => frame(t, true))
            return () => cancelAnimationFrame(animRef.current)
        }

        if (!inView) {
            // Paused offscreen — keep last frame, no loop
            return () => cancelAnimationFrame(animRef.current)
        }

        lastTime = performance.now()
        animRef.current = requestAnimationFrame((t) => frame(t))
        return () => cancelAnimationFrame(animRef.current)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView, reducedMotion, colors, particleSize, trailAlpha, orbitSpeed, pullSpeed, tilt, tiltSideway, sizeVersion, outerRadius])

    return (
        <div
            ref={containerRef}
            className={className}
            aria-hidden="true"
            style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
                touchAction: 'none', // drags on the eclipse drive the interaction instead of scrolling
            }}
        >
            <canvas
                ref={canvasRef}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            />
            <canvas
                ref={fgCanvasRef}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            />
        </div>
    )
}

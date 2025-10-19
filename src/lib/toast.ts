"use client"

export type ToastVariant = "success" | "error" | "info"

let container: HTMLDivElement | null = null

function ensureContainer() {
  if (typeof document === "undefined") return null
  if (container && document.body.contains(container)) return container
  container = document.createElement("div")
  container.id = "app-toast-container"
  container.style.position = "fixed"
  container.style.top = "16px"
  container.style.right = "16px"
  container.style.zIndex = "9999"
  container.style.display = "flex"
  container.style.flexDirection = "column"
  container.style.gap = "8px"
  document.body.appendChild(container)
  return container
}

export function showToast(message: string, variant: ToastVariant = "info", duration = 3000) {
  const root = ensureContainer()
  if (!root) return
  const el = document.createElement("div")
  el.textContent = message
  el.style.padding = "10px 12px"
  el.style.borderRadius = "8px"
  el.style.color = "white"
  el.style.fontSize = "14px"
  el.style.boxShadow = "0 4px 14px rgba(0,0,0,0.18)"
  el.style.maxWidth = "320px"
  el.style.wordBreak = "break-word"
  el.style.background = variant === "success" ? "#16a34a" : variant === "error" ? "#dc2626" : "#2563eb"
  el.style.opacity = "0"
  el.style.transform = "translateY(-8px)"
  el.style.transition = "opacity 150ms ease, transform 150ms ease"

  root.appendChild(el)
  requestAnimationFrame(() => {
    el.style.opacity = "1"
    el.style.transform = "translateY(0)"
  })

  const timeout = window.setTimeout(() => dismiss(), duration)

  function dismiss() {
    window.clearTimeout(timeout)
    el.style.opacity = "0"
    el.style.transform = "translateY(-8px)"
    window.setTimeout(() => {
      if (el.parentElement) el.parentElement.removeChild(el)
    }, 180)
  }

  el.addEventListener("click", dismiss)
  return dismiss
}

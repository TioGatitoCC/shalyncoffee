export const IconHome = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
    <path d="M3 11l9-8 9 8" /><path d="M5 10v10a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V10" />
  </svg>
)
export const IconMessage = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
)
export const IconClose = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
)
export const IconBack = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
    <path d="M15 18l-6-6 6-6" />
  </svg>
)
export const IconLogout = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="M16 17l5-5-5-5" /><path d="M21 12H9" />
  </svg>
)
export const IconTrash = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
    <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6" />
  </svg>
)
export const IconCamera = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2Z" /><circle cx="12" cy="13" r="4" />
  </svg>
)
export const IconGift = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
    <path d="M20 12v9H4v-9M2 7h20v5H2zM12 22V7M12 7c-1.5 0-3-1-3-2.5S10 2 12 2s3 1 3 2.5S13.5 7 12 7z" />
  </svg>
)
export const IconPhone = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
    <rect x="5" y="2" width="14" height="20" rx="2" /><path d="M12 18h.01" />
  </svg>
)
export const IconMail = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" />
  </svg>
)
export const IconAlert = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
    <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />
  </svg>
)
export const IconCup = ({ color = '#D8CBB4', stroke = '#B7A98E' }) => (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M5 8 L7 20 Q7.3 21 8.5 21 H15.5 Q16.7 21 17 20 L19 8 Z" fill={color} stroke={stroke} strokeWidth="1" />
    <path d="M4 8 H20" stroke={stroke} strokeWidth="1.4" />
    <path d="M9 8 Q9 4 12 4 Q15 4 15 8" stroke={stroke} strokeWidth="1.2" fill="none" />
  </svg>
)

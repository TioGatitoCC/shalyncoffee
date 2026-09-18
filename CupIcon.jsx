export default function CupIcon({ color, empty }) {
  const cupColor = empty ? '#E3D7C2' : color
  const stroke = empty ? '#C9BA9E' : '#3E2716'
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M5 8 L7 20 Q7.3 21 8.5 21 H15.5 Q16.7 21 17 20 L19 8 Z" fill={cupColor} stroke={stroke} strokeWidth="1" />
      <path d="M4 8 H20" stroke={stroke} strokeWidth="1.4" />
      <path d="M9 8 Q9 4 12 4 Q15 4 15 8" stroke={stroke} strokeWidth="1.2" fill="none" />
    </svg>
  )
}

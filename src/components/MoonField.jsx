const STARS = [
    [90, 80, 1.1, 0.5], [210, 150, 0.8, 0.35], [340, 60, 1, 0.45], [460, 190, 0.7, 0.3],
    [560, 40, 1.2, 0.5], [980, 90, 0.9, 0.4], [1080, 200, 1, 0.35], [1150, 60, 0.7, 0.3],
    [130, 300, 0.7, 0.25], [1010, 330, 0.8, 0.3], [300, 250, 0.6, 0.25], [880, 420, 0.6, 0.2],
  ]
  const PINES = [[120, 572, 40], [148, 567, 28], [300, 570, 22], [930, 556, 46], [962, 560, 30], [998, 566, 38]]
  
  export default function MoonField({ className = '' }) {
    return (
      <svg className={`moonfield ${className}`.trim()} viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="mf-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#08090D" />
            <stop offset=".55" stopColor="#080F20" />
            <stop offset="1" stopColor="#101D38" />
          </linearGradient>
          <radialGradient id="mf-halo">
            <stop offset="0" stopColor="#B8C1CD" stopOpacity=".32" />
            <stop offset=".35" stopColor="#71849F" stopOpacity=".12" />
            <stop offset="1" stopColor="#080F20" stopOpacity="0" />
          </radialGradient>
          <filter id="mf-soft"><feGaussianBlur stdDeviation="1.5" /></filter>
          <filter id="mf-grain" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="7" />
            <feColorMatrix values="0 0 0 0 .89  0 0 0 0 .9  0 0 0 0 .91  0 0 0 .08 0" />
          </filter>
        </defs>
  
        <rect width="1200" height="800" fill="url(#mf-sky)" />
        {STARS.map(([x, y, r, o], i) => <circle key={i} cx={x} cy={y} r={r} fill="#E2E5E9" opacity={o} />)}
  
        <circle cx="700" cy="250" r="300" fill="url(#mf-halo)" />
        <g filter="url(#mf-soft)">
          <circle cx="700" cy="250" r="64" fill="#E2E5E9" opacity=".9" />
          <circle cx="682" cy="236" r="15" fill="#B8C1CD" opacity=".55" />
          <circle cx="722" cy="268" r="10" fill="#B8C1CD" opacity=".45" />
          <circle cx="712" cy="226" r="6" fill="#B8C1CD" opacity=".4" />
        </g>
  
        <path d="M0 585 C160 545 300 575 440 560 S720 505 880 545 S1110 590 1200 560 L1200 800 L0 800 Z" fill="#101D38" />
        <path d="M0 585 C160 545 300 575 440 560 S720 505 880 545 S1110 590 1200 560" fill="none" stroke="#B8C1CD" strokeOpacity=".22" strokeWidth="1.2" />
        <g fill="#08090D" opacity=".9">
          {PINES.map(([x, y, h], i) => (
            <path key={i} d={`M${x} ${y} L${x - h * 0.18} ${y} L${x} ${y - h} L${x + h * 0.18} ${y} Z`} />
          ))}
        </g>
        <path d="M0 665 C240 630 420 660 620 640 S960 615 1200 650 L1200 800 L0 800 Z" fill="#0B1428" />
        <rect width="1200" height="800" filter="url(#mf-grain)" />
      </svg>
    )
  }
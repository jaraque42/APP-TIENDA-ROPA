export default function AerdnaLogo({ className = "", style = {} }) {
  return (
    <svg
      className={className}
      style={{ width: '160px', height: 'auto', display: 'block', ...style }}
      viewBox="0 0 680 272"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="AERDNA Sportswear"
      role="img"
    >
      {/* Left leg of A mark */}
      <rect
        x="292" y="18" width="18" height="125" rx="3"
        fill="white"
        transform="rotate(40, 301, 80.5)"
      />

      {/* Right leg of A mark */}
      <rect
        x="370" y="18" width="18" height="125" rx="3"
        fill="white"
        transform="rotate(-40, 379, 80.5)"
      />

      {/* Green crossbar accent */}
      <rect x="308" y="80" width="64" height="11" rx="2.5" fill="#cffc00" />

      {/* Green diamond tip at peak */}
      <rect
        x="333" y="26" width="14" height="14" rx="2"
        fill="#cffc00"
        transform="rotate(45, 340, 33)"
      />

      {/* Wordmark */}
      <text
        x="340" y="192"
        textAnchor="middle"
        fontSize="64"
        fontWeight="800"
        letterSpacing="14"
        fill="white"
        style={{ fontFamily: "var(--font-display)" }}
      >
        AERDNA
      </text>

      {/* Green underline */}
      <rect x="195" y="207" width="290" height="3" rx="1.5" fill="#cffc00" />

      {/* Tagline */}
      <text
        x="340" y="240"
        textAnchor="middle"
        fontSize="12"
        fontWeight="500"
        letterSpacing="8"
        fill="#cffc00"
        style={{ fontFamily: "var(--font-label)" }}
      >
        SPORTSWEAR
      </text>
    </svg>
  );
}

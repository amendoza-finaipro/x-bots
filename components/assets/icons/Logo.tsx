export const Logo = (props: React.SVGAttributes<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      {...props}
    >
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="50%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
      </defs>

      <circle cx="16" cy="16" r="16" fill="url(#grad)" />

      <text
        x="50.5%"
        y="53%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="#fff"
        fontSize="16"
        fontFamily="sans-serif"
      >
        X
      </text>
    </svg>
  );
};

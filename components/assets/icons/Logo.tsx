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
          <stop offset="0%" stop-color="#6366f1" />
          <stop offset="50%" stop-color="#0ea5e9" />
          <stop offset="100%" stop-color="#10b981" />
        </linearGradient>
      </defs>

      <circle cx="16" cy="16" r="16" fill="url(#grad)" />

      <text
        x="50%"
        y="50%"
        dominant-baseline="middle"
        text-anchor="middle"
        fill="#fff"
        font-size="16"
        font-family="sans-serif"
      >
        X
      </text>
    </svg>
  );
};

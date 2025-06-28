export const TextureBG = () => {
  return (
    <svg
      className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="roughpaper" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.04"
            result="noise"
            numOctaves="5"
          />
          <feDiffuseLighting
            in="noise"
            lightingColor="#f5f5f5"
            surfaceScale="2"
          >
            <feDistantLight azimuth="45" elevation="60" />
          </feDiffuseLighting>
        </filter>
      </defs>
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        filter="url(#roughpaper)"
        fill="none"
      />
    </svg>
  );
};

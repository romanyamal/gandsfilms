import { useState } from "react";

export const Checkbox = ({
  label,
  value,
  name,
  register,
  textColor,
  boxColor,
  checkColor,
  fontWeight,
  size,
}) => {
  const [active, setActive] = useState(false);

  return (
    <label className="flex items-center mb-3 cursor-pointer select-none group">
      <div className={`relative ${size ? size : "w-8 h-8"} flex-shrink-0`}>
        <input
          type="checkbox"
          value={value}
          {...register(name)}
          className="sr-only peer"
          onChange={(e) => {
            register(name).onChange(e);
            setActive(e.target.checked);
          }}
          onBlur={register(name).onBlur}
        />

        <div className="absolute inset-[-4px] rounded-lg border-2 border-transparent peer-focus-visible:border-black transition-all" />
        <svg viewBox="0 0 100 100" className="w-full h-full relative z-10">
          <path
            d="M82,89H18c-3.87,0-7-3.13-7-7V18c0-3.87,3.13-7,7-7h64c3.87,0,7,3.13,7,7v64C89,85.87,85.87,89,82,89z"
            fill="none"
            stroke={`${boxColor || "#000000"}`}
            strokeWidth="5"
            style={{
              strokeDasharray: 320,
              strokeDashoffset: active ? 320 : 0,
              transition: "stroke-dashoffset 0.3s linear",
            }}
          />
          <polyline
            points="25.5,53.5 39.5,67.5 72.5,34.5"
            fill="none"
            stroke={`${checkColor || "#000000"}`}
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: 70,
              strokeDashoffset: active ? 0 : 70,
              transition: "stroke-dashoffset 0.3s linear",
            }}
          />
        </svg>
      </div>
      <span
        className={`ml-3 ${textColor || "text-black"} ${fontWeight || "font-medium"}`}
      >
        {label}
      </span>
    </label>
  );
};

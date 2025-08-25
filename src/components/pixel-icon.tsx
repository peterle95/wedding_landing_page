import { cn } from "@/lib/utils";
import * as React from "react";

const icons = {
  heart: (
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 3h3v3H6V3zm3 3h3v3H9V6zm3 0h3v3h-3V6zm3-3h3v3h-3V3zM6 9h3v3H6V9zm9 0h3v3h-3V9zM3 12h3v3H3v-3zm3 0h3v3H6v-3zm3 3h3v3H9v-3zm3-3h3v3h-3v-3zm3 0h3v3h-3v-3zm3-3h3v3h-3V9zM9 18h3v3H9v-3zm3 0h3v3h-3v-3z" /></svg>
  ),
  calendar: (
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 3h14v18H5V3zm3 3H5v3h3V6zm3 0h3v3h-3V6zm5 0h3v3h-3V6zM5 12h3v3H5v-3zm5 0h3v3h-3v-3zm5 0h3v3h-3v-3zm-5 5h3v3h-3v-3zM5 17h3v3H5v-3z" /></svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 3h6v3H9V3zm3 3h3v3h-3V6zM9 9h3v3H9V9zm0 3h6v3H9v-3zM6 15h12v3H6v-3zM9 18h6v3H9v-3z" /></svg>
  ),
  dress: (
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 3h6v3H9V3zm-3 3h3v3H6V6zm9 0h3v3h-3V6zM6 9h12v3H6V9zm-3 3h3v3H3v-3zm15 0h3v3h-3v-3zM6 15h12v3H6v-3zm3 3h6v3H9v-3z" /></svg>
  ),
  gallery: (
     <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h18v18H3V3zm3 3v12h12V6H6zm3 3h6v6H9V9z"/></svg>
  ),
   rsvp: (
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3,3H21V21H3V3M6,6V18H18V6H6M9,9H15V11H9V9M9,13H15V15H9V13Z"/></svg>
  ),
};

export type PixelIconName = keyof typeof icons;

interface PixelIconProps extends React.SVGAttributes<SVGElement> {
  icon: PixelIconName;
}

export const PixelIcon = ({ icon, className, ...props }: PixelIconProps) => {
  const Svg = icons[icon];
  if (!Svg) {
    return null;
  }

  return React.cloneElement(Svg, {
    className: cn("antialiased", className),
    style: { imageRendering: "pixelated" },
    ...props,
  });
};

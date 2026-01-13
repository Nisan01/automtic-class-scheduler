import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "../../lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 cursor-pointer",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive-dark cursor-pointer",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground cursor-pointer",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 cursor-pointer",
        ghost:
          "hover:bg-accent hover:text-accent-foreground cursor-pointer",
        link: "text-primary underline-offset-4 hover:underline cursor-pointer",

        yellow:
          "bg-[color:var(--color-yellow)] text-black hover:bg-yellow-600 cursor-pointer",
        red:
          "bg-[color:var(--color-red)] text-white hover:bg-red-700 cursor-pointer",
        green:
          "bg-[color:var(--color-green)] text-white hover:bg-green-700 cursor-pointer",
        blue:
          "bg-[color:var(--color-blue)] text-white hover:bg-blue-700 cursor-pointer",
        cyan:
          "bg-[color:var(--color-cyan)] text-black hover:bg-cyan-700 cursor-pointer",
        purple:
          "bg-[color:var(--color-purple)] text-white hover:bg-purple-700 cursor-pointer",
        crimson:
          "bg-[color:var(--color-crimson)] text-white hover:bg-crimson-700 cursor-pointer",
        pink:
          "bg-[color:var(--color-pink)] text-white hover:bg-pink-700 cursor-pointer",
        orange:
          "bg-[color:var(--color-orange)] text-black hover:bg-orange-700 cursor-pointer",
        lime:
          "bg-[color:var(--color-lime)] text-black hover:bg-lime-700 cursor-pointer",
        amber:
          "bg-[color:var(--color-amber)] text-black hover:bg-amber-700 cursor-pointer",
        teal:
          "bg-[color:var(--color-teal)] text-white hover:bg-teal-700 cursor-pointer",
        indigo:
          "bg-[color:var(--color-indigo)] text-white hover:bg-indigo-700 cursor-pointer",
        violet:
          "bg-[color:var(--color-violet)] text-white hover:bg-violet-700 cursor-pointer",
        slate:
          "bg-[color:var(--color-slate)] text-white hover:bg-slate-700 cursor-pointer",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        exlg: "h-10 px-10 rounded-md has-[>svg]:px-6 text-sm",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

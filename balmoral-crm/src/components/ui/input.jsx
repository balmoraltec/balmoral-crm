import React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    (<input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        "dark:bg-brand-black/30 dark:border-brand-medium-gray/50 dark:focus:border-brand-gold dark:focus:ring-brand-gold dark:placeholder:text-brand-light-gray/70",
        "bg-brand-light-gray/50 border-brand-medium-gray/50 focus:border-brand-gold focus:ring-brand-gold placeholder:text-brand-medium-gray/70",
        className
      )}
      ref={ref}
      {...props} />)
  );
})
Input.displayName = "Input"

export { Input }
import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface PixelatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
}

const PixelatedCard = React.forwardRef<HTMLDivElement, PixelatedCardProps>(
  ({ className, title, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "border-2 border-foreground bg-card text-card-foreground rounded-lg shadow-[6px_6px_0px_theme(colors.foreground)] transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_theme(colors.foreground)]",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2 border-b-2 border-foreground p-3">
        <div className="flex gap-1.5">
          <span className="h-3.5 w-3.5 rounded-full bg-accent"></span>
          <span className="h-3.5 w-3.5 rounded-full bg-muted"></span>
          <span className="h-3.5 w-3.5 rounded-full bg-muted"></span>
        </div>
        <h2 className="font-semibold text-foreground flex-1 text-center">{title}</h2>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  )
)
PixelatedCard.displayName = "PixelatedCard"

export { PixelatedCard }

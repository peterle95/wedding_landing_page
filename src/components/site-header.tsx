"use client"

import Link from "next/link"
import * as React from "react"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { PixelIcon } from "./pixel-icon"
import { useLanguage } from "@/lib/i18n"
import { LanguageSwitcher } from "./language-switcher"

const navItems = [
  { href: "/", key: "home" },
  { href: "/gallery", key: "gallery" },
  { href: "/location", key: "location" },
  { href: "/rsvp", key: "rsvp" },
  { href: "/?scroll=faqs", key: "faqsButton" },
]

export function SiteHeader() {
  const [open, setOpen] = React.useState(false)
  const { t } = useLanguage()
  const pathname = usePathname()

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, callback?: () => void) => {
    if (callback) callback()

    if (href === "/?scroll=faqs" && pathname === "/") {
      e.preventDefault()
      const element = document.getElementById("faqs")
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold sm:inline-block">
            L&P
          </span>
        </Link>
        <nav className="hidden gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center text-lg font-medium transition-colors sm:text-sm",
                item.key === "rsvp"
                  ? "rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                  : "text-foreground/60 hover:text-foreground/80"
              )}
              onClick={(e) => handleNavClick(e, item.href)}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end gap-2">
          <LanguageSwitcher />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              {/* Visually hidden title for accessibility (required by Radix Dialog) */}
              <SheetTitle className="sr-only">Site navigation</SheetTitle>
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center justify-between w-full">
                    <Link href="/" className="flex items-center space-x-2" onClick={() => setOpen(false)}>
                      <span className="font-bold">L&P</span>
                    </Link>
                    <div className="flex items-center gap-2">
                      <LanguageSwitcher />
                      <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                        <X className="h-6 w-6" />
                        <span className="sr-only">Close Menu</span>
                      </Button>
                    </div>
                  </div>
                </div>
                <nav className="flex flex-col gap-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "text-lg font-medium",
                        item.key === "rsvp"
                          ? "inline-flex w-fit rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                          : "hover:text-primary"
                      )}
                      onClick={(e) => handleNavClick(e, item.href, () => setOpen(false))}
                    >
                      {t(item.key)}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { mainNav, primaryCta } from "@/data/navigation";
import { cn } from "@/lib/utils";

function subscribeToScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}
const getScrolled = () => window.scrollY > 12;
const getServerScrolled = () => false;

function isActive(pathname: string, href: string) {
  return href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    getScrolled,
    getServerScrolled
  );

  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenPath(null);
        buttonRef.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onBreakpoint = () => desktop.matches && setOpenPath(null);

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      document.documentElement.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-[background-color,border-color,backdrop-filter] duration-300",
        solid
          ? "border-b border-border bg-[var(--header-bg)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <Container
        className={cn(
          "flex items-center justify-between gap-6 transition-[height] duration-300",
          scrolled ? "h-16" : "h-16 lg:h-[4.5rem]"
        )}
      >
        <Logo />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative inline-flex h-9 items-center rounded-sm px-3.5 text-sm transition-colors duration-200",
                      active
                        ? "font-medium text-primary"
                        : "font-normal text-muted hover:text-primary"
                    )}
                  >
                    {item.label}
                    {active ? (
                      /* Teal underline for the active page */
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-3.5 -bottom-px h-[2px] bg-accent"
                      />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <ButtonLink
            href={primaryCta.href}
            size="sm"
            className="max-lg:hidden"
          >
            {primaryCta.label}
          </ButtonLink>
          <button
            ref={buttonRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpenPath(open ? null : pathname)}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-border-strong text-foreground transition-colors hover:border-primary hover:text-primary lg:hidden"
          >
            {open ? (
              <X className="h-4.5 w-4.5" aria-hidden="true" />
            ) : (
              <Menu className="h-4.5 w-4.5" aria-hidden="true" />
            )}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open ? (
          <m.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute inset-x-0 top-full h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border bg-background lg:hidden"
          >
            <Container className="flex min-h-full flex-col pb-10 pt-6">
              <nav aria-label="Mobile">
                <ul className="space-y-1">
                  {mainNav.map((item) => {
                    const active = isActive(pathname, item.href);
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "flex min-h-12 items-center justify-between border-b border-border py-3 text-lg font-medium tracking-tight",
                            active ? "text-primary" : "text-foreground"
                          )}
                        >
                          {item.label}
                          {active ? (
                            <span
                              aria-hidden="true"
                              className="h-2 w-2 rounded-full bg-accent"
                            />
                          ) : null}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="mt-8 flex flex-col gap-4">
                <ButtonLink
                  href={primaryCta.href}
                  size="lg"
                  className="w-full justify-center"
                >
                  {primaryCta.label}
                </ButtonLink>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">Theme</span>
                  <ThemeToggle size="lg" />
                </div>
              </div>
            </Container>
          </m.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

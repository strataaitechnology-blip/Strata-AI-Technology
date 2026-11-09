"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { mainNav, primaryCta } from "@/data/navigation";
import { cn } from "@/lib/utils";

function subscribeToScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}
const getScrolled = () => window.scrollY > 12;
const getServerScrolled = () => false;

const sectionIds = [
  "hero",
  "about",
  "services",
  "solutions",
  "portfolio",
  "team",
  "faq",
  "contact",
];

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
  const [activeSection, setActiveSection] = useState<string>("hero");

  // Track active section via IntersectionObserver when on the homepage
  useEffect(() => {
    if (pathname !== "/") return;

    const handleScroll = () => {
      // If at the very top, hero is active
      if (window.scrollY < 120) {
        setActiveSection("hero");
        return;
      }

      // If scrolled to bottom, contact is active
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100
      ) {
        setActiveSection("contact");
        return;
      }

      const scrollPosition = window.scrollY + 160;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Handle mobile menu body scroll lock & escape key
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

  // Smooth scroll handler for single-page navigation
  function handleNavClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) {
    if (pathname === "/" && href.startsWith("/#")) {
      e.preventDefault();
      const id = href.replace("/#", "");
      const target = document.getElementById(id);

      if (id === "hero") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.history.replaceState(null, "", "/");
        setActiveSection("hero");
      } else if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        window.history.replaceState(null, "", `#${id}`);
        setActiveSection(id);
      }

      setOpenPath(null);
    } else {
      setOpenPath(null);
    }
  }

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
        <Logo
          onClick={(e) => {
            if (pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              window.history.replaceState(null, "", "/");
              setActiveSection("hero");
              setOpenPath(null);
            }
          }}
        />

        {/* Desktop Navigation Links */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const targetId = item.href.replace("/#", "");
              const isSectionActive =
                pathname === "/"
                  ? activeSection === targetId
                  : pathname === item.href;

              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    aria-current={isSectionActive ? "page" : undefined}
                    className={cn(
                      "relative inline-flex h-9 items-center rounded-lg px-3 text-sm transition-all duration-200 cursor-pointer",
                      isSectionActive
                        ? "font-semibold text-accent-text bg-accent-soft"
                        : "font-medium text-muted hover:text-foreground hover:bg-surface"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ButtonLink
            href={primaryCta.href}
            onClick={(e) => handleNavClick(e, primaryCta.href)}
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

      {/* Mobile Drawer Navigation */}
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
                    const targetId = item.href.replace("/#", "");
                    const isSectionActive =
                      pathname === "/"
                        ? activeSection === targetId
                        : pathname === item.href;

                    return (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          onClick={(e) => handleNavClick(e, item.href)}
                          aria-current={isSectionActive ? "page" : undefined}
                          className={cn(
                            "flex min-h-12 items-center justify-between border-b border-border py-3 text-lg font-medium tracking-tight cursor-pointer",
                            isSectionActive ? "text-accent-text font-bold" : "text-foreground"
                          )}
                        >
                          {item.label}
                          {isSectionActive ? (
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
                  onClick={(e) => handleNavClick(e, primaryCta.href)}
                  size="lg"
                  className="w-full justify-center"
                >
                  {primaryCta.label}
                </ButtonLink>
              </div>
            </Container>
          </m.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

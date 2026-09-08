"use client";
import { containDialogFocus, dismissOnBackdrop } from "@/lib/dialog";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { Menu, X } from "lucide-react";

const nav = [
  ["/projects/", "Work"],
  ["/about/", "About"],
  ["/writing/", "Notes"],
  ["/contact/", "Contact"],
] as const;
export function Navbar() {
  const path = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const active = (href: string) => path.startsWith(href.replace(/\/$/, ""));
  const close = () => dialog.current?.close();
  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-bg">
      <div className="shell flex min-h-16 items-center justify-between gap-6">
        <Link href="/" className="text-lg font-medium tracking-tight">
          Ethan Trent
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
          {nav.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              aria-current={active(href) ? "page" : undefined}
              className={`inline-flex min-h-11 items-center text-sm ${active(href) ? "text-accent underline underline-offset-8" : "text-fg hover:text-accent"}`}
            >
              {label}
            </Link>
          ))}
        </nav>
        <button
          ref={trigger}
          onClick={() => dialog.current?.showModal()}
          aria-label="Open menu"
          aria-haspopup="dialog"
          aria-controls="mobile-nav"
          className="flex h-11 w-11 shrink-0 items-center justify-center md:hidden"
        >
          <Menu size={22} />
        </button>
      </div>
      <dialog
        id="mobile-nav"
        ref={dialog}
        onClose={(event) => {
          // Native close restores focus before this event. Do not steal it back
          // if the visitor has already moved to another control.
          const active = document.activeElement;
          if (active === document.body || event.currentTarget.contains(active)) {
            trigger.current?.focus();
          }
        }}
        onKeyDown={containDialogFocus}
        onClick={dismissOnBackdrop}
        className="editorial-dialog fixed inset-0 m-auto w-[calc(100%-2rem)] max-w-md p-7"
        aria-label="Navigation"
      >
        <div className="flex items-center justify-between">
          <span className="eyebrow">Explore</span>
          <button
            onClick={close}
            aria-label="Close menu"
            className="flex h-11 w-11 shrink-0 items-center justify-center"
          >
            <X size={22} />
          </button>
        </div>
        <nav className="mt-5 flex flex-col" aria-label="Mobile">
          {nav.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              onClick={close}
              aria-current={active(href) ? "page" : undefined}
              className="font-display border-t border-hairline py-4 text-2xl"
            >
              {label}
            </Link>
          ))}
        </nav>
      </dialog>
    </header>
  );
}

"use client";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { links } from "@/lib/content";

const ITEMS = [
  { id: "interests", label: "Interests" },
  { id: "signspeak", label: "SignSpeak" },
  { id: "experience", label: "Experience" },
  { id: "highlights", label: "Highlights" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const els = ITEMS.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    const hero = document.getElementById("top");
    const ioTop = new IntersectionObserver(([e]) => e.isIntersecting && setActive(null), { rootMargin: "-45% 0px -50% 0px" });
    if (hero) ioTop.observe(hero);
    return () => {
      io.disconnect();
      ioTop.disconnect();
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-3 z-40 px-3 sm:top-4">
      <nav className="mx-auto flex h-14 max-w-[1240px] items-center justify-between gap-4 rounded-full border border-line bg-surface/80 pl-5 pr-2 backdrop-blur-xl">
        <a href="#top" className="font-display text-[17px] font-semibold tracking-tight text-ink">
          Samia Soleimani
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {ITEMS.map((i) => (
            <li key={i.id} className="relative">
              <a
                href={`#${i.id}`}
                className={`relative z-10 block rounded-full px-3.5 py-2 text-sm transition-colors ${active === i.id ? "text-accent-ink" : "text-ink-2 hover:text-ink"}`}
              >
                {i.label}
              </a>
              {active === i.id && (
                <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-accent" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
              )}
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <a href={links.cv} className="hidden rounded-full border border-line px-4 py-2 text-sm font-medium text-ink transition hover:border-ink active:scale-[0.97] sm:block">
            Download CV
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-10 place-items-center rounded-full text-ink md:hidden"
          >
            {open ? <X size={22} /> : <List size={22} />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-2 flex max-w-[1240px] origin-top flex-col rounded-[20px] border border-line bg-surface p-2 md:hidden"
          >
            {ITEMS.map((i) => (
              <li key={i.id}>
                <a href={`#${i.id}`} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 text-ink active:bg-tint">
                  {i.label}
                </a>
              </li>
            ))}
            <li>
              <a href={links.cv} className="block rounded-xl px-4 py-3 text-accent">
                Download CV
              </a>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}

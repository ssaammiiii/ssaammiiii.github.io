"use client";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ArrowUpRight, Check, Copy, EnvelopeSimple, GithubLogo, LinkedinLogo, FilePdf } from "@phosphor-icons/react";
import { Magnetic } from "../motion/Magnetic";
import { Reveal } from "../motion/Reveal";
import { links } from "@/lib/content";

export function Contact() {
  const [copied, setCopied] = useState<"idle" | "ok" | "fail">("idle");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(links.email);
      setCopied("ok");
    } catch {
      setCopied("fail");
    }
    window.setTimeout(() => setCopied("idle"), 2200);
  };

  return (
    <section id="contact" className="mx-auto max-w-[1240px] px-4 pb-16 pt-8 sm:px-6 lg:px-10">
      <div className="relative overflow-hidden rounded-[20px] border border-panel-line bg-panel px-6 py-16 sm:px-12 sm:py-24">
        <div className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(var(--panel-line)_1px,transparent_1px)] [background-size:18px_18px]" aria-hidden />
        <Reveal className="relative">
          <h2 className="max-w-[18ch] font-display text-[clamp(2.2rem,5.4vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-panel-ink">
            Working on sensing, on&#8209;device learning or assistive technology?
          </h2>
          <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-panel-ink/70">
            I would like to hear about your group. Email is the fastest way to reach me.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a
                href={`mailto:${links.email}`}
                className="inline-flex items-center gap-2.5 rounded-full bg-signal px-7 py-4 text-lg font-medium text-[#0d1f24] transition active:scale-[0.97]"
              >
                <EnvelopeSimple size={20} weight="bold" />
                Email me
              </a>
            </Magnetic>
            <button
              onClick={copy}
              className="relative inline-flex items-center gap-2.5 rounded-full border border-panel-line px-5 py-4 font-mono text-sm text-panel-ink transition hover:border-panel-ink/50 active:scale-[0.97] sm:text-base"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={copied}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.15 }}
                >
                  {copied === "ok" ? <Check size={18} weight="bold" className="text-signal" /> : <Copy size={18} weight="bold" />}
                </motion.span>
              </AnimatePresence>
              {links.email}
              <span className="sr-only" aria-live="polite">
                {copied === "ok" ? "Email address copied" : copied === "fail" ? "Copy failed, select the address instead" : ""}
              </span>
            </button>
          </div>
          {copied === "fail" && <p className="mt-3 text-sm text-signal">Copy did not work in this browser. Select the address to copy it.</p>}

          <ul className="mt-14 flex flex-wrap gap-x-8 gap-y-4 border-t border-panel-line pt-8">
            {[
              { href: links.linkedin, label: "LinkedIn", Icon: LinkedinLogo },
              { href: links.github, label: "GitHub", Icon: GithubLogo },
              { href: links.cv, label: "CV (PDF)", Icon: FilePdf },
            ].map(({ href, label, Icon }) => (
              <li key={label}>
                <a href={href} className="group inline-flex items-center gap-2 text-panel-ink/80 transition-colors hover:text-panel-ink">
                  <Icon size={20} />
                  {label}
                  <ArrowUpRight size={14} weight="bold" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
      <footer className="flex flex-col justify-between gap-2 px-1 pt-8 text-sm text-ink-3 sm:flex-row">
        <span>Samia Soleimani, Accra, Ghana</span>
        <a href="#top" className="hover:text-ink">
          Back to top
        </a>
      </footer>
    </section>
  );
}

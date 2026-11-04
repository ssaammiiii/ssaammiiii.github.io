"use client";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Play, SpeakerHigh, SpeakerSlash, ArrowCounterClockwise } from "@phosphor-icons/react";
import { Hand } from "./Hand";
import { channelsFor, REST, shapeFor } from "./shapes";

const STEP_MS = 720;
const STAGES = [
  { name: "Gloves", detail: "24 channels at 50 Hz" },
  { name: "ESP32", detail: "Filter, calibrate, sync clocks" },
  { name: "Classifier", detail: "Shrinkage LDA, 0.13 ms" },
  { name: "Speech", detail: "LLM + TTS, about 2 s" },
];

type Phase = "idle" | "signing" | "speaking" | "done";

export function Playground() {
  const [input, setInput] = useState("AKWAABA");
  const [word, setWord] = useState("AKWAABA");
  const [i, setI] = useState(-1);
  const [phase, setPhase] = useState<Phase>("idle");
  const [sound, setSound] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timers = useRef<number[]>([]);
  const root = useRef<HTMLDivElement>(null);
  const inView = useInView(root, { once: true, amount: 0.45 });

  const clear = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  const run = useCallback(
    (w: string, speak: boolean) => {
      clear();
      setWord(w);
      setPhase("signing");
      setI(0);
      for (let k = 1; k < w.length; k++) {
        timers.current.push(window.setTimeout(() => setI(k), k * STEP_MS));
      }
      timers.current.push(
        window.setTimeout(() => {
          setPhase("speaking");
          if (speak && "speechSynthesis" in window) {
            window.speechSynthesis.cancel();
            const u = new SpeechSynthesisUtterance(w.toLowerCase());
            u.rate = 0.9;
            window.speechSynthesis.speak(u);
          }
        }, w.length * STEP_MS),
      );
      timers.current.push(window.setTimeout(() => setPhase("done"), w.length * STEP_MS + 1900));
    },
    [],
  );

  // One silent demo run the first time the playground scrolls into view.
  useEffect(() => {
    if (!inView || phase !== "idle") return;
    const id = window.setTimeout(() => run("AKWAABA", false), 250);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  useEffect(() => () => clear(), []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = input.toUpperCase().replace(/[^A-Z]/g, "");
    if (!clean) {
      setError("Type a word using the letters A to Z.");
      return;
    }
    setError(null);
    run(clean.slice(0, 12), sound);
  };

  const ch = phase === "signing" ? word[i] : undefined;
  const shape = phase === "signing" ? shapeFor(ch) : REST;
  const channels = channelsFor(shape, ch ?? "", phase === "signing");
  const spoken = phase === "speaking" || phase === "done";

  return (
    <div ref={root} className="overflow-hidden rounded-[20px] border border-line bg-surface">
      <div className="grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[1.05fr_1fr]">
        {/* glove stage */}
        <div className="graph-paper relative flex min-h-[380px] items-center justify-center border-b border-line p-6 lg:border-b-0 lg:border-r">
          <svg viewBox="-112 -96 224 236" className="h-[340px] w-full max-w-[380px]" role="img" aria-label={ch ? `Glove showing the letter ${ch}` : "Glove at rest"}>
            <Hand shape={shape} />
          </svg>
          <div className="absolute left-5 top-5 font-mono text-xs text-ink-3">left glove</div>
          <AnimatePresence mode="popLayout">
            {ch && (
              <motion.div
                key={`${i}-${ch}`}
                initial={{ opacity: 0, y: 16, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="absolute right-6 top-4 font-display text-7xl font-semibold text-accent"
                aria-hidden
              >
                {ch}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* readout + controls */}
        <div className="flex flex-col gap-6 p-6 sm:p-8">
          <div>
            <div className="mb-3 flex items-baseline justify-between font-mono text-xs text-ink-3">
              <span>24 channels</span>
              <span>simulated readout</span>
            </div>
            <div className="flex h-28 items-end gap-[3px]" aria-hidden>
              {channels.map((v, k) => (
                <motion.div
                  key={k}
                  className="flex-1 origin-bottom rounded-t-[3px]"
                  style={{ height: "100%", background: k < 12 ? (k < 5 ? "var(--signal)" : "var(--accent)") : "var(--ink-3)" }}
                  animate={{ scaleY: v, opacity: k < 12 ? 1 : 0.45 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                />
              ))}
            </div>
            <div className="mt-2 grid grid-cols-2 font-mono text-[11px] text-ink-3">
              <span>left: flex, IMU, contact</span>
              <span className="text-right">right: idle</span>
            </div>
          </div>

          <div className="flex min-h-12 flex-wrap gap-1.5" aria-live="polite">
            {word.split("").map((c, k) => {
              const state = phase === "signing" ? (k < i ? "past" : k === i ? "now" : "next") : spoken ? "past" : "next";
              return (
                <motion.span
                  key={`${word}-${k}`}
                  layout
                  className="grid h-11 w-9 place-items-center rounded-lg border font-mono text-lg"
                  animate={{
                    backgroundColor: state === "now" ? "var(--accent)" : "rgba(0,0,0,0)",
                    color: state === "now" ? "var(--accent-ink)" : state === "past" ? "var(--ink)" : "var(--ink-3)",
                    borderColor: state === "now" ? "var(--accent)" : "var(--line)",
                    y: state === "now" ? -4 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                >
                  {c}
                </motion.span>
              );
            })}
          </div>

          <form onSubmit={submit} className="mt-auto flex flex-col gap-2">
            <label htmlFor="ss-word" className="text-sm font-medium text-ink-2">
              Fingerspell a word
            </label>
            <div className="flex gap-2">
              <input
                id="ss-word"
                value={input}
                maxLength={12}
                onChange={(e) => setInput(e.target.value)}
                aria-describedby="ss-help"
                aria-invalid={!!error}
                className="min-w-0 flex-1 rounded-full border border-line bg-raised px-5 py-3 font-mono text-base uppercase tracking-wider text-ink outline-none transition-colors focus:border-accent"
              />
              <button
                type="button"
                onClick={() => setSound((v) => !v)}
                aria-pressed={sound}
                aria-label={sound ? "Turn sound off" : "Turn sound on"}
                className="grid size-12 shrink-0 place-items-center rounded-full border border-line bg-raised text-ink transition active:scale-95"
              >
                {sound ? <SpeakerHigh size={20} weight="bold" /> : <SpeakerSlash size={20} weight="bold" />}
              </button>
              <button
                type="submit"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-5 py-3 font-medium text-accent-ink transition active:scale-[0.97]"
              >
                {phase === "done" ? <ArrowCounterClockwise size={18} weight="bold" /> : <Play size={18} weight="fill" />}
                Sign it
              </button>
            </div>
            <p id="ss-help" className={`text-xs ${error ? "text-signal" : "text-ink-3"}`}>
              {error ?? "Up to 12 letters. Handshapes are simplified drawings, not the real model."}
            </p>
          </form>
        </div>
      </div>

      {/* pipeline */}
      <div className="relative border-t border-line">
        <div className="pointer-events-none absolute inset-x-[12.5%] top-[34px] hidden h-px bg-line md:block" />
        {phase === "signing" && (
          <motion.div
            key={`pulse-${i}`}
            className="pointer-events-none absolute inset-x-[12.5%] top-[33px] hidden h-[3px] origin-left rounded-full bg-signal md:block"
            initial={{ scaleX: 0, opacity: 1 }}
            animate={{ scaleX: 1, opacity: [1, 1, 0] }}
            transition={{ duration: STEP_MS / 1000 - 0.05, ease: "easeInOut" }}
          />
        )}
        <ol className="grid grid-cols-2 md:grid-cols-4">
          {STAGES.map((s, k) => (
            <li key={s.name} className="relative flex flex-col items-start gap-1 p-5 md:items-center md:text-center">
              <motion.span
                key={phase === "signing" ? `${k}-${i}` : `${k}-${phase}`}
                className="relative z-10 grid size-[30px] place-items-center rounded-full border-2 border-line bg-surface font-mono text-xs"
                initial={false}
                animate={
                  phase === "signing" || (k === 3 && phase === "speaking")
                    ? { borderColor: ["var(--line)", "var(--signal)", "var(--line)"], scale: [1, 1.18, 1] }
                    : { borderColor: "var(--line)", scale: 1 }
                }
                transition={{ duration: 0.5, delay: phase === "signing" ? (k * STEP_MS) / 4000 : 0 }}
              >
                {k + 1}
              </motion.span>
              <span className="mt-1 font-medium text-ink">{s.name}</span>
              <span className="text-sm text-ink-2">{s.detail}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* spoken output */}
      <div className="flex min-h-[84px] items-center gap-5 border-t border-line bg-tint px-6 py-5 sm:px-8">
        <div className="flex h-8 items-center gap-[3px]" aria-hidden>
          {Array.from({ length: 14 }).map((_, k) => (
            <motion.span
              key={k}
              className="h-full w-[3px] origin-center rounded-full bg-accent"
              animate={phase === "speaking" ? { scaleY: [0.2, 0.4 + ((k * 37) % 60) / 100, 0.2] } : { scaleY: 0.15 }}
              transition={phase === "speaking" ? { duration: 0.5 + (k % 4) * 0.1, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 }}
            />
          ))}
        </div>
        <AnimatePresence mode="wait">
          {spoken ? (
            <motion.p
              key={`out-${word}`}
              initial={{ opacity: 0, filter: "blur(6px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0 }}
              className="font-display text-2xl text-ink sm:text-3xl"
            >
              &ldquo;{word.charAt(0) + word.slice(1).toLowerCase()}.&rdquo;
            </motion.p>
          ) : (
            <motion.p key="wait" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-ink-2">
              {phase === "signing" ? "Reading the gloves..." : "Spoken output appears here."}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

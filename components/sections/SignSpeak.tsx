import { ArrowUpRight, GithubLogo } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "../motion/Reveal";
import { CountUp } from "../motion/CountUp";
import { Playground } from "../signspeak/Playground";
import { links } from "@/lib/content";

const facts = [
  { value: <CountUp to={99.2} decimals={1} suffix="%" />, label: "letter accuracy on a held-out split" },
  { value: <CountUp to={1864} />, label: "training repetitions from two signers" },
  { value: <CountUp to={135} prefix="US$" />, label: "parts for a pair of gloves" },
  { value: <CountUp to={1500} prefix="~" suffix="x" />, label: "faster than a BiLSTM, same accuracy" },
];

export function SignSpeak() {
  return (
    <section id="signspeak" className="relative border-y border-line bg-surface/60 py-24 lg:py-32">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Reveal>
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.16em] text-accent">Undergraduate thesis</p>
            <h2 className="font-display text-[clamp(3rem,8vw,6.5rem)] font-semibold leading-[0.9] tracking-[-0.04em] text-ink">SignSpeak</h2>
            <p className="mt-7 max-w-[48ch] text-xl leading-relaxed text-ink">
              Deaf patients in Ghana often arrive at a clinic with no interpreter. SignSpeak is a pair of sensor gloves that recognise Ghanaian
              Sign Language and speak the result aloud.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col justify-end gap-5 text-ink-2 lg:pb-2">
            <p className="max-w-[52ch] leading-relaxed">
              A patient and a clinician can hold a basic conversation on their own. The gloves read hand movement directly, so nothing is filmed in
              the consulting room and the system works without raising any privacy concerns.
            </p>
            <p className="max-w-[52ch] leading-relaxed">
              I co-developed it with one teammate as my undergraduate thesis, supervised by Dr. Nii Longdon Sowah.
            </p>
            <a href={links.signspeakRepo} className="group inline-flex w-fit items-center gap-2 font-medium text-accent">
              <GithubLogo size={20} weight="bold" />
              Code and documentation
              <ArrowUpRight size={16} weight="bold" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-16">
          <Playground />
        </Reveal>

        <div className="mt-20 grid gap-12 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <h3 className="font-display text-3xl font-semibold tracking-tight text-ink">Tested on signers it had never seen</h3>
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div>
                <div className="font-display text-[clamp(4rem,10vw,7.5rem)] font-semibold leading-none tracking-[-0.04em] text-accent">
                  <CountUp to={83} suffix="%" />
                </div>
                <p className="mt-3 text-ink-2">Fingerspelled letters</p>
              </div>
              <div>
                <div className="font-display text-[clamp(4rem,10vw,7.5rem)] font-semibold leading-none tracking-[-0.04em] text-accent">
                  <CountUp to={92} suffix="%" />
                </div>
                <p className="mt-3 text-ink-2">Clinical word signs</p>
              </div>
            </div>
            <p className="mt-8 max-w-[50ch] text-sm leading-relaxed text-ink-2">
              Average accuracy across three new signers who were not in the training data. The system covers 26 letters and 11 word signs.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[20px] border border-line bg-line">
              {facts.map((f, i) => (
                <div key={i} className="bg-surface p-6">
                  <dt className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{f.value}</dt>
                  <dd className="mt-2 text-sm leading-snug text-ink-2">{f.label}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 rounded-[20px] border border-dashed border-line p-6">
              <h4 className="font-medium text-ink">Camera-only prototype</h4>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">
                A webcam baseline using MediaPipe hand tracking and OpenCV recognises the same signs with nothing on the hand, for a paired comparison
                with the gloves.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <p className="mt-16 max-w-[90ch] border-l-2 border-signal pl-5 text-sm leading-relaxed text-ink-2">
            S. Soleimani, I. Bhardwaj, N. L. Sowah. &ldquo;SignSpeak: A Low-Cost Sensor Glove for Fingerspelling and Clinical Sign Recognition, with
            a Paired Camera Baseline.&rdquo; Manuscript in preparation, 2026.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

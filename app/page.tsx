import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Intro, Interests } from "@/components/sections/Interests";
import { SignSpeak } from "@/components/sections/SignSpeak";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Highlights } from "@/components/sections/Highlights";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="overflow-x-clip">
        <Hero />
        <Intro />
        <Interests />
        <SignSpeak />
        <Experience />
        <Projects />
        <Highlights />
        <Contact />
      </main>
    </>
  );
}

"use client";
import About from "@/components/About";
import HowItWorks from "@/components/HowItWorks";
import KeyFeatures from "@/components/KeyFeatures";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";

export default function Home() {
  return (
    <main className="w-screen bg-[#0c0c0c] text-white font-Poppins">
      <section>
        <HeroHighlight>
          <motion.h1
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: [20, -5, 0],
            }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
          >
            Where Lancers and Mentors team up, Clients find talent, and everyone
            has a blast growing and creating together! <br />
            <Highlight className="text-black dark:text-white">
              Dive In and Diddle!
            </Highlight>
          </motion.h1>
        </HeroHighlight>
      </section>
      <About />
      <KeyFeatures />
      <HowItWorks />

      <footer className="bg-[#1b1b1b] p-4 text-center">
        <p className="text-sm text-white">
          © 2024 Diddle. All rights reserved. Let&apos;s get diddling!
        </p>
      </footer>
    </main>
  );
}

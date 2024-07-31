"use client";
import React from "react";

const HowItWorks = () => {
  return (
    <main className="w-screen bg-[#1b1b1b] text-white font-Poppins">
      <section className="flex flex-col items-center justify-center h-full text-center p-8 bg-[#0c0c0c] text-white">
        <h2 className="text-5xl font-bold mb-4 text-[#ff69b4]">How It Works</h2>
        <div className="text-2xl mb-4 text-slate-400 italic">
          <p className="mb-4">
            <span className="text-[#00ff00]">Sign Up:</span> Create your snazzy
            profile and gear up for the Diddle adventure.
          </p>
          <p className="mb-4">
            <span className="text-[#00ffff]">Diddle:</span> Discover courses,
            projects, and daily challenges tailored to your unique skills.
          </p>
          <p className="mb-4">
            <span className="text-[#ff00ff]">Learn & Earn:</span> Boost your
            skills with mentorship, complete projects, and participate in fun
            events.
          </p>
          <p className="mb-4">
            <span className="text-[#ffff00]">Grow:</span> Build your reputation,
            unlock new opportunities, and dominate the Diddleverse.
          </p>
        </div>
      </section>
    </main>
  );
};

export default HowItWorks;

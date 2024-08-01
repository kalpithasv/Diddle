"use client";
import React from "react";

const HowItWorks = () => {
  return (
    <main className="w-screen h-full mb-8  text-white font-Poppins">
      <section className="flex flex-col items-center justify-center h-full p-8">
        <h2 className="text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#6865f1] to-[#a456f7]">
          How It Works
        </h2>
        <div className="space-y-8 text-lg ml-20  text-gray-300">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-[#a656fa] rounded-full flex items-center justify-center text-white font-bold">
              1
            </div>
            <div>
              <h3 className="font-semibold text-white">Sign Up</h3>
              <p>Create your profile and get ready for the Diddle adventure.</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-[#915af4] rounded-full flex items-center justify-center text-white font-bold">
              2
            </div>
            <div>
              <h3 className="font-semibold text-white">Discover</h3>
              <p>Explore courses, projects, and daily challenges tailored to your skills.</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-[#7861f7] rounded-full flex items-center justify-center text-white font-bold">
              3
            </div>
            <div>
              <h3 className="font-semibold text-white">Learn & Earn</h3>
              <p>Enhance your skills with mentorship, complete projects, and participate in events.</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-[#6666f7] rounded-full flex items-center justify-center text-white font-bold">
              4
            </div>
            <div>
              <h3 className="font-semibold text-white">Grow</h3>
              <p>Build your reputation, unlock new opportunities, and excel in the Diddleverse.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HowItWorks;
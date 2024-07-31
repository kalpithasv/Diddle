"use client";
import React from "react";
import { HoverEffect } from "./ui/card-hover-effect";
import { KeyFeaturesData } from "@/lib/constants";

const KeyFeatures = () => {
  return (
    <main className="w-screen h-screen bg-[#0c0c0c] text-white font-Poppins">
      <section className="bg-[#0c0c0c] p-8">
        <h2 className="text-4xl font-bold text-center mb-4">Key Features</h2>
        <HoverEffect items={KeyFeaturesData} />
      </section>
    </main>
  );
};

export default KeyFeatures;

"use client";
import React from "react";
import { PinContainer } from "./ui/3d-pin";
import Image from "next/image";
import { freelancePic, mentorPic, clientPic } from "@/../public";

const About = () => {
  return (
    <main className="w-screen h-screen bg-[#1b1b1b] text-white font-Poppins">
      <section className="flex flex-col items-center justify-center h-full text-center p-8 bg-[#0c0c0c] text-white">
        <h1 className="text-5xl font-bold mb-4 text-[#eeeeee]">About DiddL</h1>
        <p className="text-2xl mb-4 text-slate-400 italic animate-bounce">
          Diddle is not just a platform! it&apos;s a revolution in how we
          perceive learning and earning.
        </p>
        <div className="flex gap-16 justify-center px-[18vh]">
          <div className="bg-gray/10 backdrop-blur-md border-2 border-white p-6 pb-14 rounded-lg shadow-lg w-2/3 relative">
            <h3 className="text-3xl font-bold mb-4 text-white">Diddler</h3>
            <div className="flex gap-4">
              <PinContainer title="Freelancing Page" href="#">
                <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
                  <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
                    Freelancer
                  </h3>
                  <div className="text-base !m-0 !p-0 font-normal">
                    <span className="text-slate-500 ">
                      Individuals seeking projects to apply their skills and
                      earn income.
                    </span>
                  </div>
                  <Image
                    className="flex flex-1 w-full rounded-lg"
                    src={freelancePic}
                    alt="freelancing pic"
                  />
                </div>
              </PinContainer>
              <PinContainer title="Mentors Page" href="#">
                <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
                  <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
                    Mentor
                  </h3>
                  <div className="text-base !m-0 !p-0 font-normal">
                    <span className="text-slate-500 ">
                      Individuals who possess expertise in specific skills and
                      can teach others.
                    </span>
                  </div>
                  <Image
                    className="flex flex-1 w-full rounded-lg"
                    src={mentorPic}
                    alt="freelancing pic"
                  />
                </div>
              </PinContainer>
            </div>
          </div>
          <div className="bg-gray/10 backdrop-blur-md border-2 border-white p-6 rounded-lg shadow-lg w-1/3 relative">
            <h3 className="text-3xl font-bold mb-4 text-white">Clients</h3>
            <PinContainer title="Client Page" href="#" className="left-0 top-0">
              <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
                <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
                  Client
                </h3>
                <div className="text-base !m-0 !p-0 font-normal">
                  <span className="text-slate-500 ">
                    Individuals or organizations looking for freelancers to
                    complete projects.
                  </span>
                </div>
                <Image
                  className="flex flex-1 w-full rounded-lg"
                  src={clientPic}
                  alt="freelancing pic"
                />
              </div>
            </PinContainer>
          </div>
        </div>
        <p className="text-2xl mt-8 text-slate-400 italic animate-bounce">
          Let&apos;s Diddle our way to a future where skills are the ultimate
          currency.
        </p>
      </section>
    </main>
  );
};

export default About;

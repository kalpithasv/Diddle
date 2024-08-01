"use client";
import React from "react";
import { PinContainer } from "./ui/3d-pin";
import Image from "next/image";
import { freelancePic, mentorPic, clientPic } from "@/../public";

const About = () => {
  return (
    <main className="w-screen min-h-screen h-full bg-[#0c0c0c] text-white font-Poppins">
      <section className="flex flex-col items-center justify-center h-full text-center py-8 px-12 bg-[#0c0c0c] text-white">
        <h1 className="text-5xl font-bold mb-4 text-[#eeeeee] pt-20">
          About DiddL
        </h1>
        <p className="text-2xl mb-4 text-slate-400 italic animate-bounce">
          Diddle is not just a platform! it&apos;s a revolution in how we
          perceive learning and earning.
        </p>
        <div className="flex gap-16 justify-center px-[18vh]">
          <div className="bg-gray/10 backdrop-blur-md border-2 border-white p-6 pb-14 rounded-lg shadow-lg w-2/3 relative">
            <h3 className="text-3xl font-bold mb-4 text-white">Diddler</h3>
            <div className="flex gap-4">
              <PinContainer title="Welcome to the Lancers&apos; Lounge, where freelancers flex their skills, tackle epic projects, and level up with every challenge!" href="#">
                <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
                  <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
                    The Lancers&apos; Lounge
                  </h3>
                  <div className="text-base !m-0 !p-0 font-normal">
                    <span className="text-slate-500 ">
                      
                    </span>
                  </div>
                  <Image
                    className="flex flex-1 w-full rounded-lg"
                    src={freelancePic}
                    alt="freelancing pic"
                  />
                </div>
              </PinContainer>
              <PinContainer title="Step into the Mentors&apos; Hub, where gurus of greatness share their wisdom, guide the next wave of talent, and host awesome workshops!" href="#">
                <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
                  <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
                    The Mentors&apos; Hub
                  </h3>
                  <div className="text-base !m-0 !p-0 font-normal">
                    <span className="text-slate-500 ">
                    
                    </span>
                  </div>
                  <Image
                    className="flex flex-1 w-full rounded-lg"
                    src={mentorPic}
                    alt="mentoring pic"
                  />
                </div>
              </PinContainer>
            </div>
          </div>
          <div className="bg-gray/10 backdrop-blur-md border-2 border-white p-6 rounded-lg shadow-lg w-1/3 relative">
            <h3 className="text-3xl font-bold mb-4 text-white">Clients</h3>
            <div className="flex">
              <PinContainer
                title="The Place is where innovation meets execution. Clients
                      post their project needs and connect with top-notch
                      Lancers to get the job done."
                href="#"
                className="left-0 top-0"
              >
                <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
                  <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
                    The Client Corner
                  </h3>
                  <div className="text-base !m-0 !p-0 font-normal">
                    <span className="text-slate-500 ">
                    </span>
                  </div>
                  <Image
                    className="flex flex-1 w-full rounded-lg absolute  right-0 z-[-1]"
                    src={clientPic}
                    alt="client pic"
                  />
                </div>
              </PinContainer>
            </div>
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

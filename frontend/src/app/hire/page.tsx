"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useId } from "react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { useRouter } from "next/navigation";

export default function ExpandableCardDemo() {
  const router = useRouter();
  const [active, setActive] = useState<any | boolean | null>(null);
  const [cards, setCards] = useState<any[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    async function fetchHireApplications() {
      const accessToken = localStorage.getItem('access');
      if (!accessToken) {
        router.push('/login');
        return;
      }

      try {
        const response = await fetch('/backend/hire-applications/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCards(data);
        console.log(data); // Debugging line
      } catch (error) {
        console.error("Error fetching hire applications:", error);
      }
    }

    fetchHireApplications();
  }, [router]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <div className="flex flex-col h-screen justify-center items-center">
        <AnimatePresence>
          {active && typeof active === "object" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 h-full w-full z-10"
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {active && typeof active === "object" ? (
            <div className="fixed inset-0  grid place-items-center z-[100]">
              <motion.button
                key={`button-${active.lancer.user.username}-${id}`}
                layout
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                  transition: {
                    duration: 0.05,
                  },
                }}
                className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
                onClick={() => setActive(null)}
              >
                {/* <CloseIcon /> */}
              </motion.button>
              <motion.div
                layoutId={`card-${active.lancer.user.username}-${id}`}
                ref={ref}
                className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
              >
                <motion.div layoutId={`image-${active.lancer.user.username}-${id}`}>
                  {/* <Image
                    priority
                    width={200}
                    height={200}
                    src={active.lancer.user.profile_picture} // Assuming you have a profile picture field
                    alt={active.lancer.user.username}
                    className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                  /> */}
                </motion.div>

                <div>
                  <div className="flex justify-between items-start p-4">
                    <h2>{active.lancer.user.username}</h2>
                  </div>
                  <div className="pt-4 relative px-4">
                    <p>{active.pitch}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          ) : null}
        </AnimatePresence>
        <ul className="max-w-2xl mx-auto w-full gap-4">
          {cards.map((card, index) => (
            <motion.div
              layoutId={`card-${card.lancer.user.username}-${id}`}
              key={`card-${card.lancer.user.username}-${id}`}
              onClick={() => setActive(card)}
              className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
            >
              <div className="flex gap-4 flex-col md:flex-row ">
                <motion.div layoutId={`image-${card.lancer.user.username}-${id}`}>
                  {/* <Image
                    width={100}
                    height={100}
                    src={card.lancer.user.profile_picture} // Assuming you have a profile picture field
                    alt={card.lancer.user.username}
                    className="h-40 w-40 md:h-14 md:w-14 rounded-lg object-cover object-top"
                  /> */}
                </motion.div>
                <div className="">
                  <h3>{card.lancer.user.username}</h3>
                  <p>{card.pitch}</p>
                </div>
              </div>
              <motion.button
                layoutId={`button-${card.lancer.user.username}-${id}`}
                className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black mt-4 md:mt-0"
              >
                View Details
              </motion.button>
            </motion.div>
          ))}
        </ul>
      </div>
    </>
  );
}
"use client";
import { navLink } from "@/lib/constants";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <div className="top-0 w-full h-full z-[10]">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="bg-white/10 backdrop-blur-md fixed z-[10] w-full flex justify-between items-center md:p-[1.5rem] p-2">
          <div className="text-2xl font-semibold text-white">
            <Link href="/">DidL</Link>
          </div>
          <div className="md:flex font-Poppins hidden gap-3">
            {navLink.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                className="relative group text-white text-lg px-3 font-semibold cursor-pointer transition ease-in-out hover:scale-110 duration-300 text-center flex flex-col items-center justify-end"
              >
                {item.name}
                <div className="absolute w-[90%] h-0.5 bg-white/80 scale-x-0 group-hover:scale-x-100 transition-transform"></div>
              </Link>
            ))}
          </div>
          <div className="md:flex hidden gap-3">
            <Link href="login">
              <Button
                variant="default"
                className=" text-md px-4 py-2 rounded-md font-semibold cursor-pointer transition ease-in-out duration-300"
              >
                Login
              </Button>
            </Link>
            <Link href="signup">
              <Button
                variant="secondary"
                className=" text-md px-4 py-2 rounded-md font-semibold cursor-pointer transition ease-in-out duration-300"
              >
                Signup
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Header;

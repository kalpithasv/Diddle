"use client";
import { Pivot as Hamburger } from "hamburger-react";
import { navLink } from "@/lib/constants";
import { motion } from "framer-motion";
import Link from "next/link";

const Header = () => {
  return (
    <div className="top-0 w-full h-full z-[10]">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="bg-white/10 backdrop-blur-md fixed z-[10] w-full flex justify-between items-center md:p-[1.5rem] p-2">
          <div className="text-2xl font-semibold text-white">
            <Link href="/">
              DidL
            </Link>
          </div>
          <div className="md:flex font-Poppins hidden gap-3">
            {navLink.map((item, index) => (
              <Link
                href={item.path}
                className="relative group text-white text-lg px-3 font-semibold cursor-pointer transition ease-in-out hover:scale-110 duration-300 text-center flex flex-col items-center justify-end"
              >
                {item.name}
                <div className="absolute w-[90%] h-0.5 bg-white/80 scale-x-0 group-hover:scale-x-100 transition-transform"></div>
              </Link>
            ))}
          </div>
          <div className="md:flex hidden gap-3">
            <Link
              href="login"
              className="text-black bg-[#f6e320] hover:bg-blue-700 text-lg px-4 py-2 rounded-md font-semibold cursor-pointer transition ease-in-out duration-300"
            >
              Login
            </Link>
            <Link
              href="signup"
              className="text-white bg-[#ed1b24] hover:bg-green-700 text-lg px-4 py-2 rounded-md font-semibold cursor-pointer transition ease-in-out duration-300"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Header;
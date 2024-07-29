"use client";
import { Pivot as Hamburger } from "hamburger-react";
import { navLink } from "@/lib/constants";
import { motion } from "framer-motion";
import { Link } from "react-scroll";

const Header = () => {
  return (
    <div className="top-0 w-full h-full z-[10]">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="bg-white/10 backdrop-blur-md fixed z-[10] w-full flex justify-between items-center md:p-[1.5rem] p-2">
          <div className="text-2xl font-semibold text-white">
            <Link
              to="hero"
              spy={true}
              smooth={true}
              offset={-50}
              duration={500}
              className="cursor-pointer"
            >
              DiddL
            </Link>
          </div>
          <div className="md:flex font-Poppins hidden gap-3 ">
            {navLink.map((item, index) => (
              <Link
                to={item.path}
                key={index}
                spy={true}
                smooth={true}
                offset={-50}
                duration={500}
                className="relative group text-white text-lg px-3 font-semibold cursor-pointer transition ease-in-out hover:scale-110 duration-300 text-center flex flex-col items-center justify-end"
              >
                {item.name}
                <div className="absolute w-[90%] h-0.5 bg-white/80 scale-x-0 group-hover:scale-x-100 transition-transform"></div>
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Header;

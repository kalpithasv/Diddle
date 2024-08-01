"use client";
import { navLink } from "@/lib/constants";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem('access');
    setIsAuthenticated(!!accessToken);

    if (accessToken) {
      const fetchUserProfile = async () => {
        try {
          const response = await fetch('/backend/auth/profile/', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            }
          });

          if (!response.ok) {
            if (response.status === 401) {
              // Token is invalid or expired
              localStorage.removeItem('access');
              localStorage.removeItem('refresh');
              router.push('/login');
            } else {
              throw new Error('Failed to fetch user profile');
            }
          }

          const data = await response.json();
          setRole(data.role);
        } catch (error) {
          setError((error as Error).message);
        }
      };

      fetchUserProfile();
    }
  }, [router]);

  return (
    <div className="top-0 w-full h-full z-[10]">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="bg-white/10 backdrop-blur-md fixed z-[100] w-full flex justify-between items-center md:p-[1.5rem] p-2">
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
            {isAuthenticated ? (
              <>
                <Link href="/profile">
                  <Button
                    variant="default"
                    className=" text-md px-4 py-2 rounded-md font-semibold cursor-pointer transition ease-in-out duration-300"
                  >
                    Profile
                  </Button>
                </Link>
                {role === 'diddler' ? (
                  <Link href="/get-hired">
                    <Button
                      variant="default"
                      className=" text-md px-4 py-2 rounded-md font-semibold cursor-pointer transition ease-in-out duration-300"
                    >
                      Get Hired
                    </Button>
                  </Link>
                ) : role === 'client' ? (
                  <Link href="/new-project">
                    <Button
                      variant="default"
                      className=" text-md px-4 py-2 rounded-md font-semibold cursor-pointer transition ease-in-out duration-300"
                    >
                      New Project
                    </Button>
                  </Link>
                ) : null}
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="default"
                    className=" text-md px-4 py-2 rounded-md font-semibold cursor-pointer transition ease-in-out duration-300"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button
                    variant="secondary"
                    className=" text-md px-4 py-2 rounded-md font-semibold cursor-pointer transition ease-in-out duration-300"
                  >
                    Signup
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Header;
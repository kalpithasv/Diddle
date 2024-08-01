"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  email: string;
  password: string;
  username: string;
  role: string;
  bio: string;
  phone_number: string;
}

export default function Signup() {
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
    username: "",
    role: "client",
    bio: "",
    phone_number: "",
  });

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/backend/auth/signup/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      router.push("/login");
    } else {
      // Handle error
      console.error("Signup failed");
    }
  };

  return (
    <div className="h-screen w-full bg-neutral-950 flex items-center justify-center antialiased">
      <div className="z-20">
        <Card className="w-[600px]  text-uno-cyan border-uno-pink border-2">
          <CardHeader>
            <CardTitle className="text-uno-yellow">Sign-Up</CardTitle>
            <CardDescription className="text-uno-green">Register yourself in to Diddle</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="username" className="text-uno-pink">Username</Label>
                  <Input
                    id="username"
                    value={user.username}
                    onChange={(e) =>
                      setUser({ ...user, username: e.target.value })
                    }
                    placeholder="Username"
                    className="text-uno-cyan border-uno-pink"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email" className="text-uno-pink">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                    placeholder="Email"
                    className="text-uno-cyan border-uno-pink"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password" className="text-uno-pink">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                    placeholder="Password"
                    className="text-uno-cyan border-uno-pink"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label className="text-uno-pink">Role</Label>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center text-uno-cyan">
                      <input
                        type="radio"
                        name="role"
                        value="client"
                        checked={user.role === "client"}
                        onChange={(e) =>
                          setUser({ ...user, role: e.target.value })
                        }
                        className="mr-2"
                      />
                      Client
                    </label>
                    <label className="flex items-center text-uno-cyan">
                      <input
                        type="radio"
                        name="role"
                        value="diddler"
                        checked={user.role === "diddler"}
                        onChange={(e) =>
                          setUser({ ...user, role: e.target.value })
                        }
                        className="mr-2"
                      />
                      Diddler
                    </label>
                  </div>
                </div>
                <div className="flex flex-col space-y-1.5 col-span-2">
                  <Label htmlFor="bio" className="text-uno-pink">Bio</Label>
                  <Input
                    id="bio"
                    value={user.bio}
                    onChange={(e) =>
                      setUser({ ...user, bio: e.target.value })
                    }
                    placeholder="Bio"
                    className="text-uno-cyan border-uno-pink"
                  />
                </div>
                <div className="flex flex-col space-y-1.5 col-span-2">
                  <Label htmlFor="phone_number" className="text-uno-pink">Phone Number</Label>
                  <Input
                    id="phone_number"
                    value={user.phone_number}
                    onChange={(e) =>
                      setUser({ ...user, phone_number: e.target.value })
                    }
                    placeholder="Phone Number"
                    className="text-uno-cyan border-uno-pink"
                  />
                </div>
              </div>
              <div className="flex justify-center mt-4">
                <Button type="submit" className="bg-uno-pink text-uno-cyan border-uno-yellow border-2">Signup</Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/login" className="text-uno-yellow">
              Already have an Account?
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
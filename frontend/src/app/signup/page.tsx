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
}

export default function Signup() {
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
    username: "",
  });

  return (
    <div className="h-screen w-full bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="z-20">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Sign-Up</CardTitle>
            <CardDescription>Register yourself in the Banao</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Username</Label>
                  <Input
                    id="name"
                    value={user.username}
                    onChange={(e) =>
                      setUser({ ...user, username: e.target.value })
                    }
                    placeholder="Username"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Email</Label>
                  <Input
                    id="name"
                    type="email"
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                    placeholder="Email"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Password</Label>
                  <Input
                    id="name"
                    type="password"
                    value={user.password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                    placeholder="Password"
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <div className="flex justify-center">
            <Button>Signup</Button>
          </div>
          <CardFooter className="flex justify-center mt-2">
            <Link href="/login" className="text-blue-800">
              Already have an Account?
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

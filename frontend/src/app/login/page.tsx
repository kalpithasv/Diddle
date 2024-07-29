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

interface User {
  username: string;
  password: string;
}

export default function Login() {
  const [user, setUser] = useState<User>({
    username: "",
    password: "",
  });

  return (
    <div className="h-screen w-full bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="z-20">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Log-In</CardTitle>
            <CardDescription>Get Back to Banao Application</CardDescription>
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
                  <Label htmlFor="framework">Password</Label>
                  <Input
                    id="name"
                    value={user.password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                    type="password"
                    placeholder="Password"
                  />
                  <Link href="/forget-password">
                    <p className="text-right">Forget Password?</p>
                  </Link>
                </div>
              </div>
            </form>
          </CardContent>
          <div className="flex justify-center">
            <Button>login</Button>
          </div>
          <CardFooter className="flex justify-center mt-2">
            <Link href="/signup" className="text-blue-800">
              Don&apos;t have an Account?
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

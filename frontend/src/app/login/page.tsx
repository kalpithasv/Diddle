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
import axios from 'axios';

interface User {
  username: string;
  password: string;
}

export default function Login() {
  const [user, setUser] = useState<User>({
    username: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("/backend/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Login failed");
        return;
      }

      const data = await response.json();
      console.log("Login successful", data);
      localStorage.setItem('access', data.access);
      localStorage.setItem('refresh', data.refresh);
      // Redirect to root route
      window.location.href = '/';
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="h-screen w-full bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="z-20">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Log-In</CardTitle>
            <CardDescription>Get Back to Banao Application</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={user.username}
                    onChange={(e) =>
                      setUser({ ...user, username: e.target.value })
                    }
                    placeholder="Username"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
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
              {error && <p className="text-red-500">{error}</p>}
              <div className="flex justify-center mt-4">
                <Button type="submit">Login</Button>
              </div>
            </form>
          </CardContent>
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
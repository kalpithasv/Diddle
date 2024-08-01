"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
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

interface HireApplication {
  pitch: string;
  created_at: string;
}

export default function GetHired() {
  const [application, setApplication] = useState<HireApplication>({
    pitch: "",
    created_at: new Date().toISOString().split('T')[0], // Only date part
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const accessToken = localStorage.getItem('access');
    if (!accessToken) {
      console.error('No access token found');
      router.push('/login');
      return;
    }
    console.log('Hire Application Payload:', application);
    const response = await fetch("/backend/hire-applications/", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(application),
    });
    if (response.ok) {
      router.push("/hire-applications");
    } else {
      console.error("Hire application submission failed", response.status, response.statusText);
    }
  };

  return (
    <div className="h-screen w-full bg-neutral-950 flex items-center justify-center antialiased">
      <div className="z-20">
        <Card className="w-[600px] text-uno-cyan border-uno-pink border-2">
          <CardHeader>
            <CardTitle className="text-uno-yellow">Get Hired</CardTitle>
            <CardDescription className="text-uno-green">Submit your hire application</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex flex-col space-y-1.5 col-span-1">
                  <Label htmlFor="pitch" className="text-uno-pink">Application Text</Label>
                  <Input
                    id="pitch"
                    value={application.pitch}
                    onChange={(e) => setApplication({ ...application, pitch: e.target.value })}
                    placeholder="Write your application"
                    className="text-uno-cyan border-uno-pink"
                  />
                </div>
              </div>
              <div className="flex justify-center mt-4">
                <Button type="submit" className="bg-uno-pink text-uno-cyan border-uno-yellow border-2">Submit Application</Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/hire-applications" className="text-uno-yellow">
              Back to Hire Applications
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
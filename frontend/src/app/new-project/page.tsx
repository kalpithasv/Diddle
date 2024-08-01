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

interface Project {
  title: string;
  description: string;
  budget: number;
  deadline: string;
}

export default function NewProject() {
  const [project, setProject] = useState<Project>({
    title: "",
    description: "",
    budget: 0,
    deadline: "",
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
    console.log('Project Payload:', project);
    const response = await fetch("/backend/projects/", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    });
    if (response.ok) {
      router.push("/projects");
    } else {
      console.error("Project creation failed", response.status, response.statusText);
    }
  };

  return (
    <div className="h-screen w-full bg-neutral-950 flex items-center justify-center antialiased">
      <div className="z-20">
        <Card className="w-[600px] text-uno-cyan border-uno-pink border-2">
          <CardHeader>
            <CardTitle className="text-uno-yellow">New Project</CardTitle>
            <CardDescription className="text-uno-green">Create a new project</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1.5 col-span-2">
                  <Label htmlFor="title" className="text-uno-pink">Title</Label>
                  <Input
                    id="title"
                    value={project.title}
                    onChange={(e) => setProject({ ...project, title: e.target.value })}
                    placeholder="Project Title"
                    className="text-uno-cyan border-uno-pink"
                  />
                </div>
                <div className="flex flex-col space-y-1.5 col-span-2">
                  <Label htmlFor="description" className="text-uno-pink">Description</Label>
                  <Input
                    id="description"
                    value={project.description}
                    onChange={(e) => setProject({ ...project, description: e.target.value })}
                    placeholder="Project Description"
                    className="text-uno-cyan border-uno-pink"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="budget" className="text-uno-pink">Budget</Label>
                  <Input
                    id="budget"
                    type="number"
                    value={project.budget}
                    onChange={(e) => setProject({ ...project, budget: parseFloat(e.target.value) })}
                    placeholder="Project Budget"
                    className="text-uno-cyan border-uno-pink"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="deadline" className="text-uno-pink">Deadline</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={project.deadline}
                    onChange={(e) => setProject({ ...project, deadline: e.target.value })}
                    placeholder="Project Deadline"
                    className="text-uno-cyan border-uno-pink"
                  />
                </div>
              </div>
              <div className="flex justify-center mt-4">
                <Button type="submit" className="bg-uno-pink text-uno-cyan border-uno-yellow border-2">Create Project</Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/projects" className="text-uno-yellow">
              Back to Projects
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
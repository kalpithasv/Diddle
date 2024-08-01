"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

interface Project {
  id: number;
  title: string;
  description: string;
  budget: number;
  deadline: string;
  client: {
    email: string;
    phone_number: string;
  };
}

interface Contact {
    id: number;
    name: string;
    email: string;
}

export default function ProjectPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedClient, setSelectedClient] = useState<{ email: string; phone_number: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProjects = async () => {
      const accessToken = localStorage.getItem('access');
      if (!accessToken) {
        console.error('No access token found');
        router.push('/login');
        return;
      }
      const response = await fetch("/backend/projects/", {
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      } else {
        console.error("Failed to fetch projects", response.status, response.statusText);
      }
    };

    fetchProjects();
  }, [router]);

  const handleContactClick = async (cl) => {
    setSelectedClient(cl);
  };

  const handleClosePopup = () => {
    setSelectedClient(null);
  };

  return (
    <div className="h-screen w-full bg-neutral-950 flex flex-wrap items-center justify-center antialiased">
      {projects.length > 0 ? (
        projects.map((project) => (
          <Card key={project.id} className="m-4 w-[300px] text-uno-cyan border-uno-pink border-2">
            <CardHeader>
              <CardTitle className="text-uno-yellow">{project.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-uno-green">{project.description}</div>
              <div className="text-uno-cyan">Budget: ${project.budget}</div>
              <div className="text-uno-yellow">Deadline: {project.deadline}</div>
              <button
                className="mt-2 px-4 py-2 bg-uno-blue text-white rounded"
                onClick={() => handleContactClick(project.client)}
              >
                Contact
              </button>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="text-uno-pink">No projects found</div>
      )}

      {selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded text-black shadow-lg">
            <h2 className="text-xl font-bold  mb-2">Client Details</h2>
            <p>Email: {selectedClient.email}</p>
            <p>Phone: {selectedClient.phone_number}</p>
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
              onClick={handleClosePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
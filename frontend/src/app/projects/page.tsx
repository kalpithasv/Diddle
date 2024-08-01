"use client";
import { useEffect, useState } from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { freelancePic } from "../../../public";

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
    <div className="w-screen h-screen flex flex-wrap gap-x-4 justify-center items-center">
      {projects.length > 0 ? (
        projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onContactClick={handleContactClick}
            onContactClose={handleClosePopup} />
        ))
      ) : (
        <div className="text-uno-pink">No projects found</div>
      )}

      {selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded text-black shadow-lg">
            <h2 className="text-xl font-bold  mb-2">Client Details</h2>
            <p>Call me at</p>
            <p>{selectedClient.phone_number}</p>
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

function ProjectCard({key, project, onContactClick, onContactClose}) {
    return (
      <CardContainer className="inter-var">
        <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
          <CardItem
            translateZ="50"
            className="text-xl font-bold text-neutral-600 dark:text-white"
          >
            {project.title}
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
          >
            {project.description}
          </CardItem>
          <div className="flex justify-between items-center mt-20">
            <CardItem
              translateZ={20}
              as={Link}
              href="https://twitter.com/jeyasuryaur"
              target="__blank"
              className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
            >
              Try now →
            </CardItem>
            <CardItem
              translateZ={20}
              as="button"
              onClick={() => onContactClick(project.client)}
              className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
            >
              Contact
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    );
  }
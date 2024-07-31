"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Define types for the user profile and error state
interface UserProfile {
  user: {
    username: string;
  };
  role: string;
  bio: string;
  phone_number: string;
}

export default function Profile() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const accessToken = localStorage.getItem('access');
      if (!accessToken) {
        setError('No access token found');
        router.push('/login');
        return;
      }

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

        const data: UserProfile = await response.json();
        setProfile(data);
      } catch (error) {
        setError((error as Error).message);
      }
    };

    fetchUserProfile();
  }, [router]);

  const handleLogout = async () => {
    const accessToken = localStorage.getItem('access');
    const refreshToken = localStorage.getItem('refresh');
    if (!refreshToken || !accessToken) {
      router.push('/login');
      return;
    }

    try {
      const response = await fetch('/backend/auth/logout/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refresh: refreshToken })
      });

      if (response.ok) {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        router.push('/login');
      } else {
        throw new Error('Failed to logout');
      }
    } catch (error) {
      setError((error as Error).message);
    }
  };

  if (error) {
    return <div className="flex justify-center items-center h-screen">Error: {error}</div>;
  }

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen w-full bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="z-20">
        <div className="flex items-center h-full justify-center">
          <div>
            <h1>User Profile</h1>
            <p>Username: {profile.user.username}</p>
            <p>Role: {profile.role}</p>
            <p>Bio: {profile.bio}</p>
            <p>Phone Number: {profile.phone_number}</p>
            <button onClick={handleLogout} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
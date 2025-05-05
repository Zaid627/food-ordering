"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserTabs from "../../components/layout/UserTabs";
import UserFrom from "../../components/layout/UserFrom";

export default function ProfilePage() {
  const session = useSession();
  const { status } = session;

  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);
  const [saved, setSave] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/profile")
        .then(async (res) => {
          if (!res.ok) {
            const text = await res.text();
            throw new Error(`Fetch failed: ${res.status} - ${text}`);
          }
          return res.json();
        })
        .then((data) => {
          setUser(data);

          setIsAdmin(data.admin || false);

          setProfileFetched(true);
        })
        .catch((err) => {
          console.error("Error loading profile:", err);
        });
    }
  }, [status, session]);

  async function handleProfileInfoUpdate(e, data) {
    e.preventDefault();

    const response = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      toast.success("Profile saved!");
      setSave(true);
    } else {
      toast.error("Error saving profile");
    }
  }

  if (status === "loading" || !profileFetched) return "loading...";
  if (status === "unauthenticated") return redirect("/login");

  return (
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin} />
      <div className="max-w-2xl mx-auto mt-8">
        {saved && (
          <h2 className="text-center bg-green-100 p-4 rounded-lg border border-green-300">
            Profile Saved!
          </h2>
        )}
        <UserFrom user={user} onSave={handleProfileInfoUpdate} />
      </div>
    </section>
  );
}


"use client";
import UserFrom from "@/components/layout/UserFrom";
import UserTabs from "@/components/layout/UserTabs";
import useProfile from "@/components/UseProfile";
import { useParams } from "next/navigation";
// import { resolve } from "path";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditUserPage() {
  const { loading, data } = useProfile();
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch("/api/profile?_id" + id).then((res) => {
      res.json().then((user) => {
        setUser(user);
      });
    });
  }, []);

  async function handleSaveButtonClick(e, data) {
    e.preventDefault();
    const promise = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, _id: id }),
      });

      if (res.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(promise, {
      loading: "Saving user...",
      success: "User saved",
      error: "An error is occurred while saving the user ",
    });
  }

  if (loading) {
    return "Loading user profile...";
  }

  if (!data.admin) {
    return "Not an admin";
  }
  return (
    <section>
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        <UserFrom user={user} onSave={handleSaveButtonClick} />
      </div>
    </section>
  );
}

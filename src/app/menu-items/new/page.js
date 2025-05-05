"use client";
import Left from "@/components/icons/Left";
import UserTabs from "@/components/layout/UserTabs";
import useProfile from "@/components/UseProfile";
import toast from "react-hot-toast";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MenuItemForm from "@/components/layout/MenuItemForm";

export default function NewMunuItemPage() {
  const router = useRouter();
  const { loading, data } = useProfile();

  const [redirectToItems, setRedirectToItems] = useState(false);

  async function handleFormSubmit(e, data) {
    e.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(savingPromise, {
      loading: "Saving this tasty item...",
      success: "Item saved!",
      error: "Could not save item",
    });
    setRedirectToItems(true);
  }

  useEffect(() => {
    if (redirectToItems) {
      router.push("/menu-items");
    }
  }, [redirectToItems, router]);

  if (loading) {
    return "loading user info...";
  }

  if (!data.admin) {
    return "Not an admin.";
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <div className="max-w-2lg mx-auto mt-8">
        <Link href={"/menu-items"} className="button">
          <Left />
          <span>Show all menu items</span>
        </Link>
      </div>

      <MenuItemForm menuItem={null} onSubmit={handleFormSubmit} />
    </section>
  );
}

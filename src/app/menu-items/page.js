"use client";
import Right from "@/components/icons/Rights";
import UserTabs from "@/components/layout/UserTabs";
import useProfile from "@/components/UseProfile";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MenuItemsPage() {
  const { loading, data } = useProfile();
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItems) => {
        setMenuItems(menuItems);
      });
    });
  }, []);

  if (loading) return "Loading user info...";
  if (!data?.admin) return "Not an admin.";

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />

      <div className="mt-8">
        <Link className="button" href={"/menu-items/new"}>
          Create new menu items
          <Right />
        </Link>
      </div>
      <div>
        <h2 className="text-sm test-gray-500 mt-8">Edit menu items:</h2>
        <div className="grid grid-cols-3 gap-2">
          {menuItems?.length > 0 &&
            menuItems.map((item) => (
              <Link
                href={"/menu-items/edit/" + item._id}
                className="bg-gray-200 rounded-lg p-4"
                key={item._id}
              >
                <div className="relative">
                  <Image
                    className="rounded-md"
                    src={item.image || "/placeholder.jpg"}
                    alt={item.name}
                    width={200}
                    height={200}
                  />
                </div>
                <div className="text-center">{item.name}</div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}

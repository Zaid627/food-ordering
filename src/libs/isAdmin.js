// lib/isAdmin.js
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import UserInfo from "@/models/UserInfo";

export async function isAdmin() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  if (!userEmail) {
    return false;
  }

  const userInfo = await UserInfo.findOne({ email: userEmail });
  return userInfo?.admin || false;
}

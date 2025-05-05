import { getServerSession } from "next-auth";
// import { authOptions } from "../../auth/[...nextauth]/route";
import mongoose from "mongoose";
import User from "../../models/User";
import { authOptions } from "../auth/[...nextauth]/route";

export async function DELETE(req) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  await mongoose.connect(process.env.MONGO_URL);
  await User.deleteOne({ email: session.user.email });

  return new Response(JSON.stringify({ success: true }));
}

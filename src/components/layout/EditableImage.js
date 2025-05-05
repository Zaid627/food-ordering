"use client";
import Image from "next/image";
import toast from "react-hot-toast";

export default function EditableImage({ link, setLink }) {
  async function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = new FormData();
    data.set("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      const result = await res.json();
      if (result?.url) {
        setLink(result.url);
        toast.success("Image uploaded. Don't forget to save!");
      } else {
        toast.error("Upload failed");
      }
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Upload error");
    }
  }

  return (
    <>
      {link ? (
        <Image
          className="rounded-lg"
          src={link}
          width={250}
          height={250}
          alt="avatar"
        />
      ) : (
        <div className="bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
          No image
        </div>
      )}
      <label>
        <input type="file" className="hidden" onChange={handleFileChange} />
        <span className="block border rounded-lg p-2 cursor-pointer text-center">
          Change image
        </span>
      </label>
    </>
  );
}

"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaTrash, FaUpload } from "react-icons/fa";
import Image from "next/image";

type Brand = {
  _id: string;
  name: string;
  image: string;
};

export default function BrandSetting() {
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(false);

  // ================= FETCH BRANDS =================
  const fetchBrands = async () => {
    const res = await axios.get("/api/brand");
    setBrands(res.data.data);
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  // ================= SUBMIT =================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !image) return alert("Name & Image required");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    try {
      setLoading(true);
      await axios.post("/api/brand", formData);
      setName("");
      setImage(null);
      fetchBrands();
    } catch (err) {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  // ================= DELETE =================
  const deleteBrand = async (id: string) => {
    if (!confirm("Are you sure you want to delete this brand?")) return;

    try {
      await axios.delete(`/api/brand/${id}`);
      fetchBrands(); // refresh list
    } catch (err) {
      alert("Failed to delete brand");
    }
  };
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold">Brand Settings</h2>

      {/* Upload Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl border space-y-4"
      >
        <div>
          <label className="block font-medium mb-1">Brand Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Brand Logo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="w-full"
          />
        </div>

        <button
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded flex items-center gap-2"
        >
          <FaUpload /> {loading ? "Uploading..." : "Add Brand"}
        </button>
      </form>

      {/* Brand List */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {brands.map((brand) => (
          <div
            key={brand._id}
            className="border rounded-lg p-4 flex flex-col items-center gap-3"
          >
            <Image
              src={brand.image}
              alt={brand.name}
              width={120}
              height={80}
              className="object-contain"
            />
            <p className="font-semibold">{brand.name}</p>
            <button
              onClick={() => deleteBrand(brand._id)}
              className="text-red-600 hover:text-red-800"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import NextImage from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Save,
  Upload,
  Tag,
  Link as LinkIcon,
  Github,
  Globe,
  Star,
  X,
  Plus,
  Trash2,
  Loader2,
} from "lucide-react";
import Link from "next/link";

interface Result {
  value: string;
  label: string;
}

interface ProjectForm {
  title: string;
  slug: string;
  description: string;
  image: string;
  category: string;
  client: string;
  featured: boolean;
  tags: string;
  liveUrl: string;
  githubUrl: string;
  results: Result[];
}

interface Project extends ProjectForm {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export default function EditProjectForm() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const [form, setForm] = useState<ProjectForm>({
    title: "",
    slug: "",
    description: "",
    image: "",
    category: "",
    client: "",
    featured: false,
    tags: "",
    liveUrl: "",
    githubUrl: "",
    results: [{ value: "", label: "" }],
  });

  const categories = [
    { value: "web-development", label: "Web Development" },
    { value: "seo", label: "SEO" },
    { value: "social-media", label: "Social Media" },
    { value: "ppc", label: "PPC" },
    { value: "design", label: "Design" },
  ];

  // Fetch project data
  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/projects/${id}`);
        const data = await res.json();

        if (data.success && data.data) {
          const project = data.data;
          setForm({
            title: project.title || "",
            slug: project.slug || "",
            description: project.description || "",
            image: project.image || "",
            category: project.category || "",
            client: project.client || "",
            featured: project.featured || false,
            tags: project.tags?.join(", ") || "",
            liveUrl: project.liveUrl || "",
            githubUrl: project.githubUrl || "",
            results: project.results?.length
              ? project.results
              : [{ value: "", label: "" }],
          });
          setImagePreview(project.image || "");
        } else {
          setError("Project not found");
        }
      } catch (err) {
        setError("Failed to load project");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    setForm({
      ...form,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleImageUpload = async (file: File) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB");
      return;
    }

    setUploading(true);
    setError("");

    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: reader.result }),
        });

        if (!res.ok) throw new Error("Failed to upload image");

        const data = await res.json();
        setForm({ ...form, image: data.url });
        setImagePreview(data.url);
      } catch (err: any) {
        setError(err.message || "Failed to upload image");
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleResultChange = (
    i: number,
    field: "value" | "label",
    value: string,
  ) => {
    const newResults = [...form.results];
    newResults[i][field] = value;
    setForm({ ...form, results: newResults });
  };

  const addResultRow = () =>
    setForm({ ...form, results: [...form.results, { value: "", label: "" }] });

  const removeResultRow = (i: number) => {
    const newResults = form.results.filter((_, idx) => idx !== i);
    setForm({ ...form, results: newResults });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      ...form,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t !== ""),
    };

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/admin/dashboard/projects");
          router.refresh();
        }, 1500);
      } else {
        throw new Error(data.message || "Failed to update project");
      }
    } catch (err: any) {
      setError(err.message || "Failed to update project");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading project...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/admin/dashboard/projects"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Projects
          </Link>

          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            Edit Project
          </h1>
          <p className="text-gray-600 mt-1">
            Update project details for {form.title || "this project"}
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3"
          >
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <Save className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-green-800 font-medium">
                Project updated successfully!
              </p>
              <p className="text-green-600 text-sm">
                Redirecting to projects list...
              </p>
            </div>
          </motion.div>
        )}

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3"
          >
            <X className="w-5 h-5 text-red-600" />
            <p className="text-red-800 font-medium">{error}</p>
          </motion.div>
        )}

        {/* Edit Form */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6">
            <h2 className="text-2xl font-bold text-white">Edit Project</h2>
            <p className="text-blue-100">Update the details below</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Title *
                  </label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="e.g., E-commerce Website Redesign"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Slug *
                  </label>
                  <input
                    name="slug"
                    value={form.slug}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="e-commerce-redesign"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client Name *
                  </label>
                  <input
                    name="client"
                    value={form.client}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Acme Inc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags (comma separated)
                  </label>
                  <input
                    name="tags"
                    value={form.tags}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="react, nextjs, tailwind"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Image
                  </label>
                  <div className="flex items-center gap-4">
                    <label
                      htmlFor="image-upload"
                      className={`px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer ${
                        uploading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        disabled={uploading}
                        className="hidden"
                      />
                      <div className="flex items-center gap-2">
                        {uploading ? (
                          <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                        ) : (
                          <Upload className="w-5 h-5 text-gray-600" />
                        )}
                        <span>
                          {uploading ? "Uploading..." : "Choose Image"}
                        </span>
                      </div>
                    </label>
                    <p className="text-sm text-gray-500">Max 5MB</p>
                  </div>

                  {imagePreview && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Preview:
                      </p>
                      <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-gray-300">
                        <NextImage
                          src={imagePreview}
                          alt="Preview"
                          fill
                          className="object-cover"
                          unoptimized={imagePreview.startsWith("data:")}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Globe className="w-4 h-4 inline mr-2" />
                    Live URL
                  </label>
                  <input
                    name="liveUrl"
                    value={form.liveUrl}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="https://example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Github className="w-4 h-4 inline mr-2" />
                    GitHub URL
                  </label>
                  <input
                    name="githubUrl"
                    value={form.githubUrl}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="https://github.com/username/repo"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={form.featured}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <div>
                      <p className="font-medium text-gray-800">
                        Featured Project
                      </p>
                      <p className="text-sm text-gray-600">
                        Show this project prominently
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Describe the project..."
              />
            </div>

            {/* Results Section */}
            <div className="mt-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-blue-600" />
                  Key Results
                </h3>
                <button
                  type="button"
                  onClick={addResultRow}
                  className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1 text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add Result
                </button>
              </div>

              <div className="space-y-3">
                {form.results.map((result, index) => (
                  <div key={index} className="flex gap-3">
                    <input
                      placeholder="Value (e.g., 150+)"
                      value={result.value}
                      onChange={(e) =>
                        handleResultChange(index, "value", e.target.value)
                      }
                      className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                    <input
                      placeholder="Label (e.g., Projects)"
                      value={result.label}
                      onChange={(e) =>
                        handleResultChange(index, "label", e.target.value)
                      }
                      className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                    {form.results.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeResultRow(index)}
                        className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-4 justify-between">
              <div className="flex gap-4">
                <Link
                  href="/admin/dashboard/projects"
                  className="px-6 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm("Reset all changes?")) {
                      window.location.reload();
                    }
                  }}
                  className="px-6 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Reset
                </button>
              </div>

              <button
                type="submit"
                disabled={saving || uploading}
                className={`px-8 py-3 rounded-xl font-medium text-white flex items-center justify-center gap-3 transition-all ${
                  saving || uploading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-lg hover:shadow-xl"
                }`}
              >
                {saving ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Update Project
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}

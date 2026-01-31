"use client";

import { useState, useEffect } from "react";
import NextImage from "next/image";

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

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  category: string;
  client: string;
  featured: boolean;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  results: Result[];
  createdAt: string;
}

export default function Project() {
  const [loading, setLoading] = useState(false);
  const [uploadedData, setUploadedData] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"upload" | "view">("upload");

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

  // Fetch projects
  const fetchProjects = async () => {
    setFetchLoading(true);
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      if (data.success && data.data) {
        setProjects(data.data);
      } else {
        setProjects([]);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "view") fetchProjects();
  }, [activeTab]);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () =>
        setForm({ ...form, image: reader.result as string });
      reader.readAsDataURL(file);
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

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()),
    };

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.success && data.data) {
        setUploadedData(data.data);

        // Reset form
        setForm({
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

        // Refresh projects list after a short delay
        setTimeout(() => fetchProjects(), 200);
      } else {
        console.error("Upload failed:", data);
      }
    } catch (error) {
      console.error("Error uploading project:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Project Management
          </h1>
          <p className="text-gray-600">
            Upload new projects and manage existing ones
          </p>
        </header>

        {/* Tabs */}
        <div className="flex mb-8 border-b border-gray-200">
          <button
            className={`px-6 py-3 font-medium text-lg transition-colors ${
              activeTab === "upload"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("upload")}
          >
            📤 Upload Project
          </button>
          <button
            className={`px-6 py-3 font-medium text-lg transition-colors ${
              activeTab === "view"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("view")}
          >
            👁️ View Projects ({projects.length})
          </button>
        </div>

        {/* Upload Form */}
        {activeTab === "upload" && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-10">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6">
              <h2 className="text-2xl font-bold text-white">Add New Project</h2>
              <p className="text-blue-100">
                Fill in the details to upload a new project
              </p>
            </div>
            <form onSubmit={handleSubmit} className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left */}
                <div className="space-y-6">
                  <input
                    name="title"
                    placeholder="Project Title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    className="input"
                  />
                  <input
                    name="slug"
                    placeholder="Slug"
                    value={form.slug}
                    onChange={handleChange}
                    required
                    className="input"
                  />
                  <input
                    name="client"
                    placeholder="Client Name"
                    value={form.client}
                    onChange={handleChange}
                    required
                    className="input"
                  />
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                    className="input"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                  <input
                    name="tags"
                    placeholder="Tags (comma separated)"
                    value={form.tags}
                    onChange={handleChange}
                    className="input"
                  />
                </div>

                {/* Right */}
                <div className="space-y-6">
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      key={form.image ? form.image : "file"}
                      className="input"
                    />
                    {form.image && (
                      <NextImage
                        src={form.image}
                        alt="Preview"
                        width={80}
                        height={80}
                        className="object-cover rounded mt-2"
                      />
                    )}
                  </div>
                  <input
                    name="liveUrl"
                    placeholder="Live URL"
                    value={form.liveUrl}
                    onChange={handleChange}
                    className="input"
                  />
                  <input
                    name="githubUrl"
                    placeholder="GitHub URL"
                    value={form.githubUrl}
                    onChange={handleChange}
                    className="input"
                  />
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={form.featured}
                      onChange={handleChange}
                    />
                    Featured Project
                  </label>
                </div>
              </div>

              <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                required
                rows={4}
                className="input mt-6"
              />

              {/* Results */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold mb-2">Results</h3>
                {form.results.map((r, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input
                      placeholder="Value"
                      value={r.value}
                      onChange={(e) =>
                        handleResultChange(i, "value", e.target.value)
                      }
                      className="input"
                    />
                    <input
                      placeholder="Label"
                      value={r.label}
                      onChange={(e) =>
                        handleResultChange(i, "label", e.target.value)
                      }
                      className="input"
                    />
                    {form.results.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeResultRow(i)}
                        className="text-red-600"
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addResultRow}
                  className="text-blue-600"
                >
                  + Add Result
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full mt-6"
              >
                {loading ? "Uploading..." : "Publish Project"}
              </button>
            </form>
          </div>
        )}

        {/* View Projects */}
        {activeTab === "view" && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-6 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white">All Projects</h2>
                <p className="text-emerald-100">
                  Browse your uploaded projects
                </p>
              </div>
              <button
                onClick={fetchProjects}
                className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition"
              >
                🔄 Refresh
              </button>
            </div>

            <div className="p-6">
              {fetchLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
                </div>
              ) : projects.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">📂</div>
                  <h3 className="text-xl font-medium text-gray-600 mb-2">
                    No Projects Found
                  </h3>
                  <button
                    onClick={() => setActiveTab("upload")}
                    className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
                  >
                    Upload Project
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="h-48 overflow-hidden relative">
                        <NextImage
                          src={project.image || "/placeholder-project.jpg"}
                          alt={project.title}
                          layout="fill"
                          objectFit="cover"
                        />
                        {project.featured && (
                          <div className="absolute top-3 left-3 px-3 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full">
                            ★ Featured
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-lg text-gray-800 truncate">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex gap-2">
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition"
                            >
                              Live
                            </a>
                          )}
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1 bg-gray-800 text-white rounded-lg hover:bg-black transition"
                            >
                              GitHub
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Upload Notification */}
        {uploadedData && (
          <div className="fixed bottom-6 right-6 max-w-md">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-5 rounded-xl shadow-2xl animate-slideUp">
              <div className="flex items-start">
                <div className="mr-4 text-2xl">🎉</div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">
                    Project Uploaded Successfully!
                  </h3>
                  <p className="text-green-100 mt-1">
                    &quot;{uploadedData.title}&quot; has been published.
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => {
                        setActiveTab("view");
                        setUploadedData(null);
                      }}
                      className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition"
                    >
                      View All Projects
                    </button>
                    <button
                      onClick={() => setUploadedData(null)}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .input {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid #d1d5db;
          border-radius: 0.75rem;
          outline: none;
          transition: all 0.2s;
        }
        .input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }
        .btn-primary {
          padding: 0.75rem 1rem;
          background: linear-gradient(to right, #3b82f6, #6366f1);
          color: white;
          font-weight: bold;
          border-radius: 1rem;
          transition: all 0.3s;
        }
        .btn-primary:hover {
          background: linear-gradient(to right, #2563eb, #4f46e5);
        }
        .btn-primary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}

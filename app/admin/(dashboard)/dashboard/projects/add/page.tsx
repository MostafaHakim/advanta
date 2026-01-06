"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? (e.target as any).checked : value,
    });
  };

  const handleResultChange = (i: number, field: string, value: string) => {
    const newResults = [...form.results];
    newResults[i][field as "value" | "label"] = value;
    setForm({ ...form, results: newResults });
  };

  const addResultRow = () => {
    setForm({
      ...form,
      results: [...form.results, { value: "", label: "" }],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()),
    };

    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (res.ok) {
      router.push("/portfolio");
    } else {
      alert("Failed to add project");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-16">
      <h1 className="text-3xl font-bold mb-8">Add New Project</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          required
          className="input"
        />
        <input
          name="slug"
          placeholder="Slug (seo-friendly)"
          onChange={handleChange}
          required
          className="input"
        />
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          required
          className="input"
        />
        <input
          name="image"
          placeholder="Image URL"
          onChange={handleChange}
          required
          className="input"
        />
        <input
          name="client"
          placeholder="Client Name"
          onChange={handleChange}
          required
          className="input"
        />

        <select
          name="category"
          onChange={handleChange}
          required
          className="input"
        >
          <option value="">Select Category</option>
          <option value="web-development">Web Development</option>
          <option value="seo">SEO</option>
          <option value="social-media">Social Media</option>
          <option value="ppc">PPC</option>
          <option value="design">Design</option>
        </select>

        <input
          name="tags"
          placeholder="Tags (comma separated)"
          onChange={handleChange}
          className="input"
        />
        <input
          name="liveUrl"
          placeholder="Live URL"
          onChange={handleChange}
          className="input"
        />
        <input
          name="githubUrl"
          placeholder="GitHub URL"
          onChange={handleChange}
          className="input"
        />

        <label className="flex items-center gap-2">
          <input type="checkbox" name="featured" onChange={handleChange} />
          Featured Project
        </label>

        {/* Results */}
        <div>
          <h3 className="font-semibold mb-2">Results</h3>
          {form.results.map((r, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                placeholder="Value (e.g. 300%)"
                value={r.value}
                onChange={(e) => handleResultChange(i, "value", e.target.value)}
                className="input"
              />
              <input
                placeholder="Label (e.g. Traffic Growth)"
                value={r.label}
                onChange={(e) => handleResultChange(i, "label", e.target.value)}
                className="input"
              />
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

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? "Saving..." : "Add Project"}
        </button>
      </form>
    </div>
  );
}

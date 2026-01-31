"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Save,
  Upload,
  User,
  Briefcase,
  FileText,
  Link,
  Mail,
  Award,
  BarChart3,
  Users,
  RefreshCw,
  CheckCircle,
  XCircle,
  Image as ImageIcon,
  Globe,
  Sparkles,
  Trash2,
  Plus,
  Eye,
} from "lucide-react";
import NextImage from "next/image";

export default function EditTeamMemberPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<any>({
    name: "",
    position: "",
    bio: "",
    image: "",
    expertise: "",
    featured: false,
    linkedin: "",
    twitter: "",
    email: "",
    stats: [
      { label: "", value: "" },
      { label: "", value: "" },
    ],
  });

  const fetchMemberData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/team/${id}`);
      if (!res.ok) throw new Error("Failed to fetch member data");

      const data = await res.json();

      setForm({
        ...data,
        expertise: data.expertise?.join(", ") || "",
        linkedin: data.social?.linkedin || "",
        twitter: data.social?.twitter || "",
        email: data.social?.email || "",
        stats: data.stats || [
          { label: "", value: "" },
          { label: "", value: "" },
        ],
      });
    } catch (err) {
      setError("Failed to load team member data");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchMemberData();
  }, [fetchMemberData]);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    // Clear any previous success/error states
    if (success || error) {
      setSuccess(false);
      setError("");
    }
  };

  const handleStatChange = (index: number, field: string, value: string) => {
    const updatedStats = [...form.stats];
    updatedStats[index][field] = value;
    setForm({ ...form, stats: updatedStats });
    if (success || error) {
      setSuccess(false);
      setError("");
    }
  };

  const addStat = () => {
    if (form.stats.length < 4) {
      setForm({
        ...form,
        stats: [...form.stats, { label: "", value: "" }],
      });
    }
  };

  const removeStat = (index: number) => {
    if (form.stats.length > 1) {
      const updatedStats = form.stats.filter(
        (_: any, i: number) => i !== index,
      );
      setForm({ ...form, stats: updatedStats });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      name: form.name,
      position: form.position,
      bio: form.bio,
      image: form.image,
      featured: form.featured,
      expertise: form.expertise
        .split(",")
        .map((e: string) => e.trim())
        .filter(Boolean),
      social: {
        linkedin: form.linkedin,
        twitter: form.twitter,
        email: form.email,
      },
      stats: form.stats.filter(
        (stat: any) => stat.label.trim() || stat.value.trim(),
      ),
    };

    try {
      const res = await fetch(`/api/team/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/admin/dashboard/team");
        }, 1500);
      } else {
        throw new Error("Update failed");
      }
    } catch (err) {
      setError("Failed to update team member. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const inputClasses =
    "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-gray-800 placeholder-gray-500";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-2";

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-gray-600 text-lg">
                Loading team member data...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push("/dashboard/team")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Team
          </button>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 md:p-8 text-white">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                    <Users className="w-8 h-8" />
                    Edit Team Member
                  </h1>
                  <p className="text-blue-100 mt-2">
                    Update the details for {form.name || "this team member"}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={fetchMemberData}
                    className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Refresh
                  </button>

                  {form.featured && (
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg font-medium">
                      <Sparkles className="w-4 h-4" />
                      Featured
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 md:p-8">
              <div className="space-y-8">
                {/* Status Messages */}
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-green-800 font-medium">
                        Team member updated successfully!
                      </p>
                      <p className="text-green-600 text-sm">
                        Redirecting to team dashboard...
                      </p>
                    </div>
                  </motion.div>
                )}

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3"
                  >
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-red-800 font-medium">Update failed</p>
                      <p className="text-red-600 text-sm">{error}</p>
                    </div>
                  </motion.div>
                )}

                {/* Basic Information */}
                <div>
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                    <User className="w-6 h-6 text-blue-600" />
                    <h2 className="text-xl font-bold text-gray-800">
                      Basic Information
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className={labelClasses}>
                        Full Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={inputClasses}
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="position" className={labelClasses}>
                        Position / Role
                      </label>
                      <input
                        id="position"
                        name="position"
                        value={form.position}
                        onChange={handleChange}
                        placeholder="Senior Developer"
                        className={inputClasses}
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="bio" className={labelClasses}>
                        Bio / Description
                      </label>
                      <textarea
                        id="bio"
                        name="bio"
                        value={form.bio}
                        onChange={handleChange}
                        placeholder="Brief description about the team member..."
                        className={`${inputClasses} min-h-[120px] resize-vertical`}
                        rows={4}
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        {form.bio.length}/500 characters
                      </p>
                    </div>
                  </div>
                </div>

                {/* Profile Image & Expertise */}
                <div>
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                    <ImageIcon className="w-6 h-6 text-blue-600" />
                    <h2 className="text-xl font-bold text-gray-800">
                      Profile & Expertise
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Image Section */}
                    <div>
                      <label htmlFor="image" className={labelClasses}>
                        Profile Image URL
                      </label>
                      <div className="flex gap-4">
                        <input
                          id="image"
                          name="image"
                          value={form.image}
                          onChange={handleChange}
                          placeholder="https://example.com/profile.jpg"
                          className={inputClasses}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const url = prompt("Enter image URL:");
                            if (url) setForm({ ...form, image: url });
                          }}
                          className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <Upload className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="mt-6">
                        <p className="text-sm font-medium text-gray-700 mb-3">
                          Image Preview
                        </p>
                        <div className="flex items-center gap-6">
                          <div className="w-32 h-32 rounded-xl overflow-hidden border-2 border-gray-300 bg-gradient-to-br from-gray-100 to-gray-200">
                            {form.image ? (
                              <NextImage
                                src={form.image}
                                alt="Preview"
                                layout="fill"
                                objectFit="cover"
                                onError={(e) => {
                                  e.currentTarget.src =
                                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E";
                                }}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <User className="w-12 h-12 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-600">
                              {form.image
                                ? "Image will be displayed on the team page"
                                : "No image set. A placeholder avatar will be used."}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Expertise Section */}
                    <div>
                      <label htmlFor="expertise" className={labelClasses}>
                        Areas of Expertise
                      </label>
                      <input
                        id="expertise"
                        name="expertise"
                        value={form.expertise}
                        onChange={handleChange}
                        placeholder="React, TypeScript, UI/UX Design, Project Management"
                        className={inputClasses}
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        Separate multiple skills with commas
                      </p>

                      {/* Skills Preview */}
                      {form.expertise && (
                        <div className="mt-6">
                          <p className="text-sm font-medium text-gray-700 mb-2">
                            Skills Preview
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {form.expertise.split(",").map(
                              (skill: string, index: number) =>
                                skill.trim() && (
                                  <span
                                    key={index}
                                    className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                                  >
                                    {skill.trim()}
                                  </span>
                                ),
                            )}
                          </div>
                        </div>
                      )}

                      {/* Featured Toggle */}
                      <div className="mt-8">
                        <label className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-6 h-6 rounded border flex items-center justify-center ${
                                form.featured
                                  ? "bg-gradient-to-r from-amber-500 to-orange-500 border-transparent"
                                  : "border-gray-400"
                              }`}
                            >
                              {form.featured && (
                                <Sparkles className="w-4 h-4 text-white" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">
                                Featured Team Member
                              </p>
                              <p className="text-sm text-gray-600">
                                Highlight this member on the team page
                              </p>
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            name="featured"
                            checked={form.featured}
                            onChange={handleChange}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact & Social Links */}
                <div>
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                    <Link className="w-6 h-6 text-blue-600" />
                    <h2 className="text-xl font-bold text-gray-800">
                      Contact & Social Links
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label htmlFor="email" className={labelClasses}>
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email Address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john.doe@company.com"
                        className={inputClasses}
                      />
                    </div>

                    <div>
                      <label htmlFor="linkedin" className={labelClasses}>
                        <div className="inline-flex items-center gap-2">
                          <div className="w-5 h-5 bg-blue-700 text-white rounded flex items-center justify-center text-xs font-bold">
                            in
                          </div>
                          LinkedIn
                        </div>
                      </label>
                      <input
                        id="linkedin"
                        name="linkedin"
                        value={form.linkedin}
                        onChange={handleChange}
                        placeholder="https://linkedin.com/in/johndoe"
                        className={inputClasses}
                      />
                    </div>

                    <div>
                      <label htmlFor="twitter" className={labelClasses}>
                        <div className="inline-flex items-center gap-2">
                          <div className="w-5 h-5 bg-blue-400 text-white rounded flex items-center justify-center text-xs font-bold">
                            𝕏
                          </div>
                          Twitter / X
                        </div>
                      </label>
                      <input
                        id="twitter"
                        name="twitter"
                        value={form.twitter}
                        onChange={handleChange}
                        placeholder="https://twitter.com/johndoe"
                        className={inputClasses}
                      />
                    </div>
                  </div>
                </div>

                {/* Statistics Section */}
                <div>
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <BarChart3 className="w-6 h-6 text-blue-600" />
                      <h2 className="text-xl font-bold text-gray-800">
                        Key Statistics
                      </h2>
                    </div>
                    {form.stats.length < 4 && (
                      <button
                        type="button"
                        onClick={addStat}
                        className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Add Stat
                      </button>
                    )}
                  </div>

                  <div className="space-y-6">
                    {form.stats.map((stat: any, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-medium text-gray-800">
                            Statistic {index + 1}
                          </h3>
                          {form.stats.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeStat(index)}
                              className="p-1 hover:bg-red-50 rounded text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-gray-700 block mb-2">
                              Label
                            </label>
                            <input
                              value={stat.label}
                              onChange={(e) =>
                                handleStatChange(index, "label", e.target.value)
                              }
                              placeholder="Projects Completed"
                              className={inputClasses}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700 block mb-2">
                              Value
                            </label>
                            <input
                              value={stat.value}
                              onChange={(e) =>
                                handleStatChange(index, "value", e.target.value)
                              }
                              placeholder="150+"
                              className={inputClasses}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-6 border-t border-gray-200">
                  <div className="flex flex-col-reverse sm:flex-row gap-4 justify-between">
                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => router.push("/dashboard/team")}
                        className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (
                            confirm(
                              "Are you sure you want to reset all changes?",
                            )
                          ) {
                            fetchMemberData();
                          }
                        }}
                        className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Reset Changes
                      </button>
                    </div>

                    <button
                      type="submit"
                      disabled={saving}
                      className={`px-8 py-3 rounded-lg font-medium text-white flex items-center justify-center gap-3 transition-all ${
                        saving
                          ? "bg-blue-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-lg hover:shadow-xl"
                      }`}
                    >
                      {saving ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Updating...
                        </>
                      ) : (
                        <>
                          <Save className="w-5 h-5" />
                          Update Team Member
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Preview Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Eye className="w-5 h-5 text-blue-600" />
            Live Preview
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-2xl">
                  {form.name ? form.name.charAt(0).toUpperCase() : "?"}
                </div>
                <div>
                  <h4 className="font-bold text-xl text-gray-800">
                    {form.name || "Team Member Name"}
                  </h4>
                  <p className="text-blue-600 font-medium">
                    {form.position || "Position"}
                  </p>
                  <p className="text-gray-600 mt-2 text-sm">
                    {form.bio || "Bio will appear here"}
                  </p>
                </div>
              </div>

              {form.expertise && (
                <div className="mt-6">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Expertise:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {form.expertise.split(",").map(
                      (skill: string, index: number) =>
                        skill.trim() && (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                          >
                            {skill.trim()}
                          </span>
                        ),
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-gray-50 p-5 rounded-xl">
              <h5 className="font-medium text-gray-700 mb-4">Key Stats</h5>
              <div className="space-y-4">
                {form.stats
                  .filter((stat: any) => stat.label || stat.value)
                  .map((stat: any, index: number) => (
                    <div
                      key={index}
                      className="bg-white p-3 rounded-lg border border-gray-200"
                    >
                      <p className="text-sm text-gray-600">
                        {stat.label || "Stat Label"}
                      </p>
                      <p className="text-xl font-bold text-gray-800">
                        {stat.value || "Value"}
                      </p>
                    </div>
                  ))}
                {form.stats.filter((stat: any) => stat.label || stat.value)
                  .length === 0 && (
                  <p className="text-gray-500 text-sm text-center py-4">
                    No stats added yet
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

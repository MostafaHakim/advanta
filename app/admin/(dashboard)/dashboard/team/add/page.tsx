"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import NextImage from "next/image";
import {
  Plus,
  Upload,
  User,
  Briefcase,
  FileText,
  Link,
  Mail,
  Award,
  Check,
  X,
  Globe,
  BarChart3,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function AddTeamMemberPage() {
  const [form, setForm] = useState({
    name: "",
    position: "",
    bio: "",
    image: "",
    expertise: "",
    linkedin: "",
    twitter: "",
    email: "",
    featured: false,
    stat1Label: "",
    stat1Value: "",
    stat2Label: "",
    stat2Value: "",
  });
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    // Clear any previous submit status when user edits form
    if (submitSuccess || submitError) {
      setSubmitSuccess(false);
      setSubmitError("");
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    const payload = {
      name: form.name,
      position: form.position,
      bio: form.bio,
      image: form.image,
      expertise: form.expertise.split(",").map((e) => e.trim()),
      featured: form.featured,
      social: {
        linkedin: form.linkedin,
        twitter: form.twitter,
        email: form.email,
      },
      stats: [
        { label: form.stat1Label, value: form.stat1Value },
        { label: form.stat2Label, value: form.stat2Value },
      ],
    };

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    try {
      const res = await fetch("/api/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmitSuccess(true);
        // Reset form after successful submission
        setTimeout(() => {
          setForm({
            name: "",
            position: "",
            bio: "",
            image: "",
            expertise: "",
            linkedin: "",
            twitter: "",
            email: "",
            featured: false,
            stat1Label: "",
            stat1Value: "",
            stat2Label: "",
            stat2Value: "",
          });
          setIsSubmitting(false);

          router.push("/admin/dashboard/team");
        }, 1500);
      } else {
        throw new Error("Failed to add team member");
      }
    } catch (error) {
      setSubmitError("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  const inputClasses =
    "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-gray-800 placeholder-gray-500";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-2";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8"
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 md:p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                  <Plus className="w-8 h-8" />
                  Add New Team Member
                </h1>
                <p className="text-blue-100 mt-2">
                  Fill in the details below to add a new member to your team
                </p>
              </div>
              <div className="hidden md:flex items-center justify-center bg-white/20 rounded-full w-16 h-16">
                <User className="w-8 h-8" />
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="space-y-8">
              {/* Personal Information Section */}
              <div>
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                  <User className="w-6 h-6 text-blue-600" />
                  <h2 className="text-xl font-bold text-gray-800">
                    Personal Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className={labelClasses}>
                      <span className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Full Name
                      </span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      value={form.name}
                      placeholder="John Doe"
                      onChange={handleChange}
                      className={inputClasses}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="position" className={labelClasses}>
                      <span className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        Position / Role
                      </span>
                    </label>
                    <input
                      id="position"
                      name="position"
                      value={form.position}
                      placeholder="Senior Developer"
                      onChange={handleChange}
                      className={inputClasses}
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="email" className={labelClasses}>
                      <span className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email Address
                      </span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      placeholder="john.doe@company.com"
                      onChange={handleChange}
                      className={inputClasses}
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="bio" className={labelClasses}>
                      <span className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Bio / Description
                      </span>
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={form.bio}
                      placeholder="Brief description about the team member..."
                      onChange={handleChange}
                      className={`${inputClasses} min-h-[120px] resize-vertical`}
                      rows={4}
                      required
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Provide a comprehensive bio highlighting skills and
                      experience
                    </p>
                  </div>
                </div>
              </div>

              {/* Image & Expertise Section */}
              <div>
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                  <Upload className="w-6 h-6 text-blue-600" />
                  <h2 className="text-xl font-bold text-gray-800">
                    Profile & Expertise
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="image" className={labelClasses}>
                      <span className="flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        Profile Image URL
                      </span>
                    </label>
                    <input
                      id="image"
                      name="image"
                      value={form.image}
                      placeholder="https://example.com/profile.jpg"
                      onChange={handleChange}
                      className={inputClasses}
                    />
                    {form.image && (
                      <div className="mt-4 p-3 border border-gray-200 rounded-lg bg-gray-50">
                        <p className="text-sm font-medium text-gray-700 mb-2">
                          Image Preview:
                        </p>
                        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300">
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
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="expertise" className={labelClasses}>
                      <span className="flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        Areas of Expertise
                      </span>
                    </label>
                    <input
                      id="expertise"
                      name="expertise"
                      value={form.expertise}
                      placeholder="React, TypeScript, UI/UX Design, Project Management"
                      onChange={handleChange}
                      className={inputClasses}
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Separate multiple expertise areas with commas
                    </p>

                    <div className="mt-6">
                      <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                        <div
                          className={`flex items-center justify-center w-6 h-6 rounded border ${form.featured ? "bg-blue-600 border-blue-600" : "border-gray-400"}`}
                        >
                          {form.featured && (
                            <Check className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <input
                          type="checkbox"
                          name="featured"
                          checked={form.featured}
                          onChange={handleChange}
                          className="hidden"
                        />
                        <div>
                          <p className="font-medium text-gray-800">
                            Featured Team Member
                          </p>
                          <p className="text-sm text-gray-600">
                            This member will be highlighted on the team page
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media Section */}
              <div>
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                  <Link className="w-6 h-6 text-blue-600" />
                  <h2 className="text-xl font-bold text-gray-800">
                    Social Media Links
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="linkedin" className={labelClasses}>
                      <span className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-blue-700 text-white rounded flex items-center justify-center">
                          <span className="text-xs font-bold">in</span>
                        </div>
                        LinkedIn URL
                      </span>
                    </label>
                    <input
                      id="linkedin"
                      name="linkedin"
                      value={form.linkedin}
                      placeholder="https://linkedin.com/in/johndoe"
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label htmlFor="twitter" className={labelClasses}>
                      <span className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-blue-400 text-white rounded flex items-center justify-center">
                          <span className="text-xs font-bold">𝕏</span>
                        </div>
                        Twitter / X URL
                      </span>
                    </label>
                    <input
                      id="twitter"
                      name="twitter"
                      value={form.twitter}
                      placeholder="https://twitter.com/johndoe"
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </div>
                </div>
              </div>

              {/* Stats Section */}
              <div>
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                  <h2 className="text-xl font-bold text-gray-800">
                    Key Statistics
                  </h2>
                </div>

                <p className="text-gray-600 mb-6">
                  Add up to 2 key statistics to highlight on the team member&apos;s
                  profile
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                      <h3 className="font-medium text-blue-800 mb-4">
                        Statistic 1
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label
                            htmlFor="stat1Label"
                            className="text-sm font-medium text-gray-700 block mb-2"
                          >
                            Label
                          </label>
                          <input
                            id="stat1Label"
                            name="stat1Label"
                            value={form.stat1Label}
                            placeholder="Projects Completed"
                            onChange={handleChange}
                            className={inputClasses}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="stat1Value"
                            className="text-sm font-medium text-gray-700 block mb-2"
                          >
                            Value
                          </label>
                          <input
                            id="stat1Value"
                            name="stat1Value"
                            value={form.stat1Value}
                            placeholder="150+"
                            onChange={handleChange}
                            className={inputClasses}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100">
                      <h3 className="font-medium text-indigo-800 mb-4">
                        Statistic 2
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label
                            htmlFor="stat2Label"
                            className="text-sm font-medium text-gray-700 block mb-2"
                          >
                            Label
                          </label>
                          <input
                            id="stat2Label"
                            name="stat2Label"
                            value={form.stat2Label}
                            placeholder="Client Satisfaction"
                            onChange={handleChange}
                            className={inputClasses}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="stat2Value"
                            className="text-sm font-medium text-gray-700 block mb-2"
                          >
                            Value
                          </label>
                          <input
                            id="stat2Value"
                            name="stat2Value"
                            value={form.stat2Value}
                            placeholder="98%"
                            onChange={handleChange}
                            className={inputClasses}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Section */}
              <div className="pt-6 border-t border-gray-200">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    {submitSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 text-green-600 bg-green-50 px-4 py-3 rounded-lg"
                      >
                        <Check className="w-5 h-5" />
                        <span className="font-medium">
                          Team member added successfully!
                        </span>
                      </motion.div>
                    )}

                    {submitError && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 text-red-600 bg-red-50 px-4 py-3 rounded-lg"
                      >
                        <X className="w-5 h-5" />
                        <span className="font-medium">{submitError}</span>
                      </motion.div>
                    )}
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setForm({
                          name: "",
                          position: "",
                          bio: "",
                          image: "",
                          expertise: "",
                          linkedin: "",
                          twitter: "",
                          email: "",
                          featured: false,
                          stat1Label: "",
                          stat1Value: "",
                          stat2Label: "",
                          stat2Value: "",
                        });
                        setSubmitError("");
                        setSubmitSuccess(false);
                      }}
                      className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Reset Form
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-8 py-3 rounded-lg font-medium text-white flex items-center gap-3 transition-all ${isSubmitting ? "bg-blue-400" : "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-lg hover:shadow-xl"}`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Adding...
                        </>
                      ) : (
                        <>
                          <Plus className="w-5 h-5" />
                          Add Team Member
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Form Preview Card */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" />
            Member Preview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl">
                  {form.name ? form.name.charAt(0).toUpperCase() : "?"}
                </div>
                <div>
                  <h4 className="font-bold text-xl text-gray-800">
                    {form.name || "Team Member Name"}
                  </h4>
                  <p className="text-blue-600 font-medium">
                    {form.position || "Position"}
                  </p>
                  <p className="text-gray-600 mt-2 text-sm line-clamp-2">
                    {form.bio || "Bio will appear here"}
                  </p>
                </div>
              </div>

              {form.expertise && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Expertise:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {form.expertise.split(",").map(
                      (skill, index) =>
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

            <div className="bg-gray-50 p-4 rounded-xl">
              <h5 className="font-medium text-gray-700 mb-3">Quick Stats</h5>
              <div className="space-y-3">
                {form.stat1Label && (
                  <div>
                    <p className="text-sm text-gray-600">{form.stat1Label}</p>
                    <p className="text-xl font-bold text-gray-800">
                      {form.stat1Value}
                    </p>
                  </div>
                )}
                {form.stat2Label && (
                  <div>
                    <p className="text-sm text-gray-600">{form.stat2Label}</p>
                    <p className="text-xl font-bold text-gray-800">
                      {form.stat2Value}
                    </p>
                  </div>
                )}
                {!form.stat1Label && !form.stat2Label && (
                  <p className="text-gray-500 text-sm">No stats added yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Loader2,
  AlertCircle,
  CheckCircle,
  X,
  Eye,
  Trash2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface PricePlan {
  price: string;
  features: string[];
}

interface FeatureDetail {
  title: string;
  description: string;
  items: string[];
}

interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

interface Faq {
  question: string;
  answer: string;
}

interface Service {
  _id: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  tagline?: string;
  category: string;
  icon?: string;
  color?: string;
  featured?: boolean;
  features: FeatureDetail[];
  process: ProcessStep[];
  faqs: Faq[];
  metrics?: { label: string; value: string }[];
  pricing: {
    starter: PricePlan;
    professional: PricePlan;
    enterprise: PricePlan;
  };
  createdAt: string;
  updatedAt: string;
}

interface EditServiceFormProps {
  serviceId: string;
}

const categoryOptions = [
  "Digital Marketing",
  "Web Development",
  "Mobile App",
  "SEO",
  "Social Media",
  "Content Writing",
  "Graphic Design",
  "Video Production",
  "Data Analytics",
  "E-commerce",
];

const colorOptions = [
  {
    value: "blue",
    label: "Blue",
    bg: "bg-blue-500",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    value: "purple",
    label: "Purple",
    bg: "bg-purple-500",
    gradient: "from-purple-500 to-purple-600",
  },
  {
    value: "green",
    label: "Green",
    bg: "bg-emerald-500",
    gradient: "from-emerald-500 to-emerald-600",
  },
  {
    value: "orange",
    label: "Orange",
    bg: "bg-orange-500",
    gradient: "from-orange-500 to-orange-600",
  },
  {
    value: "pink",
    label: "Pink",
    bg: "bg-pink-500",
    gradient: "from-pink-500 to-pink-600",
  },
  {
    value: "indigo",
    label: "Indigo",
    bg: "bg-indigo-500",
    gradient: "from-indigo-500 to-indigo-600",
  },
];

export default function EditServiceForm({ serviceId }: EditServiceFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("basic");
  const [service, setService] = useState<Service | null>(null);

  // Fetch service data
  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(`/api/services/${serviceId}`);
        if (!res.ok) throw new Error("Failed to fetch service");
        const data = await res.json();
        setService(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (serviceId) {
      fetchService();
    }
  }, [serviceId]);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    if (!service) return;
    const { name, value, type } = e.target;
    setService({
      ...service,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  // Handle dynamic array fields (features, process, faqs)
  const handleArrayChange = (
    field: keyof Pick<Service, "features" | "process" | "faqs">,
    index: number,
    subField: string,
    value: any,
  ) => {
    if (!service) return;

    const updatedArray = [...service[field]];

    if (field === "features" && subField === "items") {
      // Handle features items (comma-separated string to array)
      (updatedArray[index] as FeatureDetail).items = value
        .split(",")
        .map((item: string) => item.trim());
    } else if (field === "process" && subField === "step") {
      // Handle process step number
      (updatedArray[index] as ProcessStep).step = parseInt(value) || index + 1;
    } else {
      // Handle other fields
      (updatedArray[index] as any)[subField] = value;
    }

    setService({ ...service, [field]: updatedArray });
  };

  // Add new item to array
  const handleAddItem = (
    field: keyof Pick<Service, "features" | "process" | "faqs">,
  ) => {
    if (!service) return;

    let newItem;
    if (field === "features") {
      newItem = { title: "", description: "", items: [] };
    } else if (field === "process") {
      newItem = {
        step: service.process.length + 1,
        title: "",
        description: "",
      };
    } else {
      newItem = { question: "", answer: "" };
    }

    setService({
      ...service,
      [field]: [...service[field], newItem],
    });
  };

  // Remove item from array
  const handleRemoveItem = (
    field: keyof Pick<Service, "features" | "process" | "faqs">,
    index: number,
  ) => {
    if (!service) return;

    const updatedArray = [...service[field]];
    updatedArray.splice(index, 1);

    // Update step numbers for process
    if (field === "process") {
      updatedArray.forEach((item, idx) => {
        (item as ProcessStep).step = idx + 1;
      });
    }

    setService({ ...service, [field]: updatedArray });
  };

  // Handle metrics
  const handleMetricChange = (
    index: number,
    field: "label" | "value",
    value: string,
  ) => {
    if (!service || !service.metrics) return;

    const updatedMetrics = [...service.metrics];
    updatedMetrics[index][field] = value;
    setService({ ...service, metrics: updatedMetrics });
  };

  const handleAddMetric = () => {
    if (!service) return;

    const currentMetrics = service.metrics || [];
    setService({
      ...service,
      metrics: [...currentMetrics, { label: "", value: "" }],
    });
  };

  const handleRemoveMetric = (index: number) => {
    if (!service || !service.metrics) return;

    const updatedMetrics = [...service.metrics];
    updatedMetrics.splice(index, 1);
    setService({ ...service, metrics: updatedMetrics });
  };

  // Handle pricing
  const handlePricingChange = (
    plan: "starter" | "professional" | "enterprise",
    field: "price" | "features",
    value: string,
  ) => {
    if (!service) return;

    setService({
      ...service,
      pricing: {
        ...service.pricing,
        [plan]: {
          ...service.pricing[plan],
          [field]:
            field === "features"
              ? value.split(",").map((f) => f.trim())
              : value,
        },
      },
    });
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!service) return;

    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch(`/api/services/${serviceId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(service),
      });

      if (!res.ok) throw new Error("Failed to update service");

      setSuccess("Service updated successfully!");

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push("/admin/dashboard/services");
        router.refresh();
      }, 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    try {
      const res = await fetch(`/api/services/${serviceId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete service");

      router.push("/admin/dashboard/services");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
          <p className="text-gray-600">Loading service details...</p>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl border border-red-100">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
            Error Loading Service
          </h2>
          <p className="text-gray-600 text-center mb-6">
            {error || "Service not found"}
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => router.back()}
              className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
            >
              Go Back
            </button>
            <Link
              href="/admin/dashboard/services"
              className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors text-center"
            >
              View All Services
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "basic", label: "Basic Info", icon: "📋" },
    { id: "content", label: "Content", icon: "📝" },
    { id: "features", label: "Features", icon: "✨" },
    { id: "process", label: "Process", icon: "⚙️" },
    { id: "faqs", label: "FAQs", icon: "❓" },
    { id: "metrics", label: "Metrics", icon: "📊" },
    { id: "pricing", label: "Pricing", icon: "💰" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Edit Service
                </h1>
                <p className="text-gray-600 mt-1">
                  Update your service information
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href={`/services/${service.slug}`}
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
              >
                <Eye className="w-4 h-4" />
                Preview
              </Link>

              <button
                onClick={handleDelete}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* Success/Error Messages */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3"
            >
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              <span className="text-emerald-700">{success}</span>
              <button
                onClick={() => setSuccess(null)}
                className="ml-auto text-emerald-600 hover:text-emerald-700"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className="text-red-700">{error}</span>
              <button
                onClick={() => setError(null)}
                className="ml-auto text-red-600 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
        >
          {/* Tabs */}
          <div className="border-b border-gray-100 bg-gray-50/50 px-6 overflow-x-auto">
            <div className="flex gap-2 py-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                      : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {/* Basic Info Tab */}
              {activeTab === "basic" && (
                <motion.div
                  key="basic"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Basic Information
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title *
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={service.title}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Slug *
                      </label>
                      <input
                        type="text"
                        name="slug"
                        value={service.slug}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category *
                      </label>
                      <select
                        name="category"
                        value={service.category}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        required
                      >
                        <option value="">Select Category</option>
                        {categoryOptions.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Color Theme
                      </label>
                      <select
                        name="color"
                        value={service.color}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      >
                        {colorOptions.map((color) => (
                          <option key={color.value} value={color.value}>
                            {color.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Icon (Emoji)
                      </label>
                      <input
                        type="text"
                        name="icon"
                        value={service.icon || ""}
                        onChange={handleChange}
                        placeholder="✨"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      />
                    </div>

                    <div className="flex items-center">
                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          name="featured"
                          checked={service.featured || false}
                          onChange={(e) =>
                            setService({
                              ...service,
                              featured: e.target.checked,
                            })
                          }
                          className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700">
                          Featured Service
                        </span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tagline
                    </label>
                    <input
                      type="text"
                      name="tagline"
                      value={service.tagline || ""}
                      onChange={handleChange}
                      placeholder="Short catchy phrase"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Short Description *
                    </label>
                    <textarea
                      name="description"
                      value={service.description}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Long Description
                    </label>
                    <textarea
                      name="longDescription"
                      value={service.longDescription || ""}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                </motion.div>
              )}

              {/* Content Tab */}
              {activeTab === "content" && (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Content Management
                  </h2>
                  <p className="text-gray-500">
                    Additional content fields can go here
                  </p>
                </motion.div>
              )}

              {/* Features Tab */}
              {activeTab === "features" && (
                <motion.div
                  key="features"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Features
                    </h2>
                    <button
                      type="button"
                      onClick={() => handleAddItem("features")}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                    >
                      <span>+</span>
                      Add Feature
                    </button>
                  </div>

                  {service.features.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                      <p className="text-gray-500">No features added yet</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {service.features.map((feature, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 rounded-xl p-6 border border-gray-200"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-medium text-gray-900">
                              Feature {index + 1}
                            </h3>
                            <button
                              type="button"
                              onClick={() =>
                                handleRemoveItem("features", index)
                              }
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Title
                              </label>
                              <input
                                type="text"
                                value={feature.title}
                                onChange={(e) =>
                                  handleArrayChange(
                                    "features",
                                    index,
                                    "title",
                                    e.target.value,
                                  )
                                }
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                              </label>
                              <textarea
                                value={feature.description}
                                onChange={(e) =>
                                  handleArrayChange(
                                    "features",
                                    index,
                                    "description",
                                    e.target.value,
                                  )
                                }
                                rows={2}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Items (comma separated)
                              </label>
                              <input
                                type="text"
                                value={feature.items.join(", ")}
                                onChange={(e) =>
                                  handleArrayChange(
                                    "features",
                                    index,
                                    "items",
                                    e.target.value,
                                  )
                                }
                                placeholder="Item 1, Item 2, Item 3"
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Process Tab */}
              {activeTab === "process" && (
                <motion.div
                  key="process"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Process Steps
                    </h2>
                    <button
                      type="button"
                      onClick={() => handleAddItem("process")}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                    >
                      <span>+</span>
                      Add Step
                    </button>
                  </div>

                  {service.process.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                      <p className="text-gray-500">No process steps added</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {service.process.map((step, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 rounded-xl p-6 border border-gray-200"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-medium text-gray-900">
                              Step {step.step}
                            </h3>
                            <button
                              type="button"
                              onClick={() => handleRemoveItem("process", index)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Title
                              </label>
                              <input
                                type="text"
                                value={step.title}
                                onChange={(e) =>
                                  handleArrayChange(
                                    "process",
                                    index,
                                    "title",
                                    e.target.value,
                                  )
                                }
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                              </label>
                              <textarea
                                value={step.description}
                                onChange={(e) =>
                                  handleArrayChange(
                                    "process",
                                    index,
                                    "description",
                                    e.target.value,
                                  )
                                }
                                rows={2}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* FAQs Tab */}
              {activeTab === "faqs" && (
                <motion.div
                  key="faqs"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">
                      FAQs
                    </h2>
                    <button
                      type="button"
                      onClick={() => handleAddItem("faqs")}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                    >
                      <span>+</span>
                      Add FAQ
                    </button>
                  </div>

                  {service.faqs.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                      <p className="text-gray-500">No FAQs added</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {service.faqs.map((faq, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 rounded-xl p-6 border border-gray-200"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-medium text-gray-900">
                              FAQ {index + 1}
                            </h3>
                            <button
                              type="button"
                              onClick={() => handleRemoveItem("faqs", index)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Question
                              </label>
                              <input
                                type="text"
                                value={faq.question}
                                onChange={(e) =>
                                  handleArrayChange(
                                    "faqs",
                                    index,
                                    "question",
                                    e.target.value,
                                  )
                                }
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Answer
                              </label>
                              <textarea
                                value={faq.answer}
                                onChange={(e) =>
                                  handleArrayChange(
                                    "faqs",
                                    index,
                                    "answer",
                                    e.target.value,
                                  )
                                }
                                rows={3}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Metrics Tab */}
              {activeTab === "metrics" && (
                <motion.div
                  key="metrics"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Metrics
                    </h2>
                    <button
                      type="button"
                      onClick={handleAddMetric}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                    >
                      <span>+</span>
                      Add Metric
                    </button>
                  </div>

                  {!service.metrics || service.metrics.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                      <p className="text-gray-500">No metrics added</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {service.metrics.map((metric, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 rounded-xl p-6 border border-gray-200"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-medium text-gray-900">
                              Metric {index + 1}
                            </h3>
                            <button
                              type="button"
                              onClick={() => handleRemoveMetric(index)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Label
                              </label>
                              <input
                                type="text"
                                value={metric.label}
                                onChange={(e) =>
                                  handleMetricChange(
                                    index,
                                    "label",
                                    e.target.value,
                                  )
                                }
                                placeholder="e.g., Traffic Increase"
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Value
                              </label>
                              <input
                                type="text"
                                value={metric.value}
                                onChange={(e) =>
                                  handleMetricChange(
                                    index,
                                    "value",
                                    e.target.value,
                                  )
                                }
                                placeholder="e.g., +300%"
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Pricing Tab */}
              {activeTab === "pricing" && (
                <motion.div
                  key="pricing"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-semibold text-gray-900">
                    Pricing Plans
                  </h2>

                  <div className="grid lg:grid-cols-3 gap-6">
                    {["starter", "professional", "enterprise"].map((plan) => (
                      <div
                        key={plan}
                        className="bg-gray-50 rounded-xl p-6 border border-gray-200"
                      >
                        <h3 className="text-lg font-semibold text-gray-900 capitalize mb-4">
                          {plan} Plan
                        </h3>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Price
                            </label>
                            <input
                              type="text"
                              value={
                                service.pricing[
                                  plan as keyof typeof service.pricing
                                ].price
                              }
                              onChange={(e) =>
                                handlePricingChange(
                                  plan as any,
                                  "price",
                                  e.target.value,
                                )
                              }
                              placeholder="$0"
                              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Features (comma separated)
                            </label>
                            <textarea
                              value={service.pricing[
                                plan as keyof typeof service.pricing
                              ].features.join(", ")}
                              onChange={(e) =>
                                handlePricingChange(
                                  plan as any,
                                  "features",
                                  e.target.value,
                                )
                              }
                              placeholder="Feature 1, Feature 2, Feature 3"
                              rows={4}
                              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Form Actions */}
          <div className="border-t border-gray-100 p-6 bg-gray-50/50">
            <div className="flex items-center justify-end gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-gray-300 transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Saving Changes...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Last Updated Info */}
        <div className="mt-4 text-sm text-gray-500 text-right">
          Last updated: {new Date(service.updatedAt).toLocaleString()}
        </div>
      </div>
    </div>
  );
}

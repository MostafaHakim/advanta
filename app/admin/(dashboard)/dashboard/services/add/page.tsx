"use client";

import { useState } from "react";
import {
  ArrowRight,
  Plus,
  Trash,
  X,
  Zap,
  Tag,
  DollarSign,
  BarChart,
  Layers,
  Play,
  HelpCircle,
  TrendingUp,
  Save,
  Sparkles,
  Check,
  ChevronDown,
  Clock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ServiceListMap = {
  features: FeatureDetail;
  process: ProcessStep;
  faqs: Faq;
};

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
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  tagline?: string;
  category: string;
  icon?: string;
  color?: string;
  features: FeatureDetail[];
  process: ProcessStep[];
  faqs: Faq[];
  metrics?: { label: string; value: string }[];
  pricing: {
    starter: PricePlan;
    professional: PricePlan;
    enterprise: PricePlan;
  };
}

const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

const colorOptions = [
  { value: "blue", label: "Blue", gradient: "from-blue-500 to-blue-600" },
  {
    value: "purple",
    label: "Purple",
    gradient: "from-purple-500 to-purple-600",
  },
  {
    value: "green",
    label: "Green",
    gradient: "from-emerald-500 to-emerald-600",
  },
  {
    value: "orange",
    label: "Orange",
    gradient: "from-orange-500 to-orange-600",
  },
  { value: "pink", label: "Pink", gradient: "from-pink-500 to-pink-600" },
];

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

const CreateServiceForm = () => {
  const [service, setService] = useState<Service>({
    title: "",
    slug: "",
    description: "",
    category: "",
    icon: "",
    color: "blue",
    features: [],
    metrics: [],
    process: [],
    faqs: [],
    pricing: {
      starter: { price: "", features: [] },
      professional: { price: "", features: [] },
      enterprise: { price: "", features: [] },
    },
  });

  const [metricLabel, setMetricLabel] = useState("");
  const [metricValue, setMetricValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [activeSection, setActiveSection] = useState<string>("basic");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = generateSlug(title);
    setService({ ...service, title, slug });
  };

  const handleAddMetric = () => {
    if (metricLabel.trim() && metricValue.trim()) {
      setService({
        ...service,
        metrics: [
          ...(service.metrics || []),
          { label: metricLabel, value: metricValue },
        ],
      });
      setMetricLabel("");
      setMetricValue("");
    }
  };

  const handlePricingChange = (
    plan: "starter" | "professional" | "enterprise",
    field: "price" | "features",
    value: string,
  ) => {
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

  const handleDynamicChange = <K extends keyof ServiceListMap>(
    list: K,
    index: number,
    field: keyof ServiceListMap[K],
    value: string,
  ) => {
    const newList = [...(service[list] as ServiceListMap[K][])];

    if (field === "items") {
      (newList[index] as FeatureDetail).items = value
        .split(",")
        .map((item) => item.trim());
    } else {
      (newList[index] as any)[field] = value;
    }

    setService({ ...service, [list]: newList });
  };

  const handleAddItem = (list: keyof Service) => {
    let newItem;
    if (list === "features") {
      newItem = { title: "", description: "", items: [] };
    } else if (list === "process") {
      newItem = {
        step: service.process.length + 1,
        title: "",
        description: "",
      };
    } else if (list === "faqs") {
      newItem = { question: "", answer: "" };
    }
    setService({ ...service, [list]: [...(service[list] as any[]), newItem] });
  };

  const handleRemoveItem = (list: keyof Service, index: number) => {
    const newList = [...(service[list] as any[])];
    newList.splice(index, 1);
    setService({ ...service, [list]: newList });
  };

  const handleRemoveMetric = (index: number) => {
    const newMetrics = [...(service.metrics || [])];
    newMetrics.splice(index, 1);
    setService({ ...service, metrics: newMetrics });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(service),
      });

      if (!res.ok) throw new Error("Failed to create service");

      setMessage({ type: "success", text: "✨ Service created successfully!" });

      // Reset form
      setTimeout(() => {
        setService({
          title: "",
          slug: "",
          description: "",
          category: "",
          icon: "",
          color: "blue",
          features: [],
          metrics: [],
          process: [],
          faqs: [],
          pricing: {
            starter: { price: "", features: [] },
            professional: { price: "", features: [] },
            enterprise: { price: "", features: [] },
          },
        });
        setActiveSection("basic");
      }, 2000);
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  const sections = [
    { id: "basic", icon: Zap, label: "Basic Info", color: "blue" },
    { id: "features", icon: Layers, label: "Features", color: "purple" },
    { id: "process", icon: Play, label: "Process", color: "green" },
    { id: "faqs", icon: HelpCircle, label: "FAQs", color: "orange" },
    { id: "metrics", icon: TrendingUp, label: "Metrics", color: "pink" },
    { id: "pricing", icon: DollarSign, label: "Pricing", color: "indigo" },
  ];

  const getCurrentGradient = () => {
    const color =
      colorOptions.find((c) => c.value === service.color) || colorOptions[0];
    return color.gradient;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                Create New Service
              </h1>
              <p className="text-gray-600">
                Build an amazing service page with all the details
              </p>
            </div>

            {/* Preview Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl font-semibold hover:shadow-xl transition-all"
            >
              <Sparkles className="w-5 h-5" />
              Live Preview
            </motion.button>
          </div>

          {/* Progress Steps */}
          <div className="flex overflow-x-auto pb-4 mb-8">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 whitespace-nowrap ${
                  activeSection === section.id
                    ? `bg-gradient-to-r ${getCurrentGradient()} text-white shadow-lg`
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-100"
                }`}
              >
                <section.icon
                  className={`w-5 h-5 ${activeSection === section.id ? "text-white" : `text-${section.color}-600`}`}
                />
                <span className="font-medium">{section.label}</span>
                {activeSection === section.id && (
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Main Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-gray-100 shadow-2xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Form Header */}
          <div
            className={`bg-gradient-to-r ${getCurrentGradient()} p-8 text-white`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                  {service.icon ? (
                    <span className="text-2xl">{service.icon}</span>
                  ) : (
                    <Zap className="w-8 h-8" />
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Service Details</h2>
                  <p className="text-white/80">
                    Fill in all the necessary information
                  </p>
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">Auto-save enabled</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {/* Navigation Tabs */}
            <div className="flex flex-wrap gap-2 mb-8 pb-4 border-b border-gray-100">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    activeSection === section.id
                      ? `bg-${section.color}-50 text-${section.color}-700 border border-${section.color}-200`
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <section.icon className="w-4 h-4" />
                  {section.label}
                </button>
              ))}
            </div>

            <div className="space-y-8">
              {/* Basic Information Section */}
              <AnimatePresence mode="wait">
                {activeSection === "basic" && (
                  <motion.div
                    key="basic"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <Zap className="w-6 h-6 text-blue-600" />
                      Basic Information
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Title */}
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          Service Title
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={service.title}
                          onChange={handleTitleChange}
                          placeholder="e.g., Social Media Marketing"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 hover:bg-white"
                          required
                        />
                      </div>

                      {/* Slug */}
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">
                          URL Slug
                        </label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            /
                          </div>
                          <input
                            type="text"
                            value={service.slug}
                            onChange={(e) =>
                              setService({ ...service, slug: e.target.value })
                            }
                            placeholder="social-media-marketing"
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-100"
                            required
                          />
                        </div>
                      </div>

                      {/* Category */}
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <Tag className="w-4 h-4" />
                          Category
                        </label>
                        <select
                          value={service.category}
                          onChange={(e) =>
                            setService({ ...service, category: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none bg-gray-50 hover:bg-white"
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

                      {/* Color Theme */}
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">
                          Color Theme
                        </label>
                        <div className="flex gap-2 flex-wrap">
                          {colorOptions.map((color) => (
                            <button
                              key={color.value}
                              type="button"
                              onClick={() =>
                                setService({ ...service, color: color.value })
                              }
                              className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${
                                service.color === color.value
                                  ? "border-gray-300 bg-white shadow-sm"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <div
                                className={`w-4 h-4 rounded-full bg-gradient-to-r ${color.gradient}`}
                              />
                              <span className="text-sm">{color.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Tagline */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">
                        Tagline
                      </label>
                      <input
                        type="text"
                        value={service.tagline}
                        onChange={(e) =>
                          setService({ ...service, tagline: e.target.value })
                        }
                        placeholder="A catchy one-liner about your service"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 hover:bg-white"
                      />
                    </div>

                    {/* Icon */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">
                        Icon
                      </label>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
                          {service.icon ? (
                            <span className="text-2xl">{service.icon}</span>
                          ) : (
                            <Sparkles className="w-8 h-8 text-gray-400" />
                          )}
                        </div>
                        <input
                          type="text"
                          value={service.icon}
                          onChange={(e) =>
                            setService({ ...service, icon: e.target.value })
                          }
                          placeholder="✨ Emoji or Lucide icon name"
                          className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 hover:bg-white"
                        />
                      </div>
                    </div>

                    {/* Descriptions */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">
                          Short Description
                        </label>
                        <textarea
                          value={service.description}
                          onChange={(e) =>
                            setService({
                              ...service,
                              description: e.target.value,
                            })
                          }
                          placeholder="Brief description (2-3 sentences)"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 hover:bg-white h-32"
                          rows={3}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">
                          Long Description
                        </label>
                        <textarea
                          value={service.longDescription}
                          onChange={(e) =>
                            setService({
                              ...service,
                              longDescription: e.target.value,
                            })
                          }
                          placeholder="Detailed description about the service"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 hover:bg-white h-32"
                          rows={3}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Features Section */}
                {activeSection === "features" && (
                  <motion.div
                    key="features"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Layers className="w-6 h-6 text-purple-600" />
                        Features & Benefits
                      </h3>
                      <motion.button
                        type="button"
                        onClick={() => handleAddItem("features")}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-semibold"
                      >
                        <Plus className="w-4 h-4" />
                        Add Feature
                      </motion.button>
                    </div>

                    {service.features.length === 0 ? (
                      <div className="text-center py-12 bg-gradient-to-br from-purple-50 to-white rounded-2xl border-2 border-dashed border-purple-200">
                        <Layers className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                        <h4 className="text-lg font-semibold text-gray-700 mb-2">
                          No features added yet
                        </h4>
                        <p className="text-gray-500 mb-4">
                          Add features to showcase what&apos;s included
                        </p>
                        <button
                          type="button"
                          onClick={() => handleAddItem("features")}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-medium hover:bg-purple-200 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                          Add First Feature
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {service.features.map((feature, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-100 p-6 shadow-lg"
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                                  <Layers className="w-5 h-5 text-purple-600" />
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-900">
                                    Feature {index + 1}
                                  </h4>
                                  <p className="text-sm text-gray-500">
                                    What customers get
                                  </p>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() =>
                                  handleRemoveItem("features", index)
                                }
                                className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition-colors"
                              >
                                <Trash className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="space-y-4">
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                  Feature Title
                                </label>
                                <input
                                  type="text"
                                  value={feature.title}
                                  onChange={(e) =>
                                    handleDynamicChange(
                                      "features",
                                      index,
                                      "title",
                                      e.target.value,
                                    )
                                  }
                                  placeholder="e.g., Social Media Strategy"
                                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all bg-white"
                                />
                              </div>

                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                  Description
                                </label>
                                <textarea
                                  value={feature.description}
                                  onChange={(e) =>
                                    handleDynamicChange(
                                      "features",
                                      index,
                                      "description",
                                      e.target.value,
                                    )
                                  }
                                  placeholder="Describe this feature in detail"
                                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all bg-white h-24"
                                  rows={3}
                                />
                              </div>

                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                  Items (comma separated)
                                </label>
                                <textarea
                                  value={feature.items.join(", ")}
                                  onChange={(e) =>
                                    handleDynamicChange(
                                      "features",
                                      index,
                                      "items",
                                      e.target.value,
                                    )
                                  }
                                  placeholder="e.g., Strategy planning, Content creation, Performance analysis"
                                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all bg-white h-20"
                                  rows={2}
                                />
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Process Section */}
                {activeSection === "process" && (
                  <motion.div
                    key="process"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Play className="w-6 h-6 text-emerald-600" />
                        Process Steps
                      </h3>
                      <motion.button
                        type="button"
                        onClick={() => handleAddItem("process")}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg font-semibold"
                      >
                        <Plus className="w-4 h-4" />
                        Add Step
                      </motion.button>
                    </div>

                    {service.process.length === 0 ? (
                      <div className="text-center py-12 bg-gradient-to-br from-emerald-50 to-white rounded-2xl border-2 border-dashed border-emerald-200">
                        <Play className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                        <h4 className="text-lg font-semibold text-gray-700 mb-2">
                          No process steps added
                        </h4>
                        <p className="text-gray-500 mb-4">
                          Add steps to show your service workflow
                        </p>
                        <button
                          type="button"
                          onClick={() => handleAddItem("process")}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg font-medium hover:bg-emerald-200 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                          Add First Step
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {service.process.map((step, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-100 p-6 shadow-lg"
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                                  <div className="text-emerald-700 font-bold">
                                    {step.step}
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-900">
                                    Step {index + 1}
                                  </h4>
                                  <p className="text-sm text-gray-500">
                                    Process phase
                                  </p>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() =>
                                  handleRemoveItem("process", index)
                                }
                                className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition-colors"
                              >
                                <Trash className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="space-y-4">
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                  Step Title
                                </label>
                                <input
                                  type="text"
                                  value={step.title}
                                  onChange={(e) =>
                                    handleDynamicChange(
                                      "process",
                                      index,
                                      "title",
                                      e.target.value,
                                    )
                                  }
                                  placeholder="e.g., Discovery & Planning"
                                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-white"
                                />
                              </div>

                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                  Description
                                </label>
                                <textarea
                                  value={step.description}
                                  onChange={(e) =>
                                    handleDynamicChange(
                                      "process",
                                      index,
                                      "description",
                                      e.target.value,
                                    )
                                  }
                                  placeholder="Describe this step in detail"
                                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-white h-32"
                                  rows={3}
                                />
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                {/* FAQs Section */}
                {activeSection === "faqs" && (
                  <motion.div
                    key="faqs"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <HelpCircle className="w-6 h-6 text-orange-600" />
                        Frequently Asked Questions
                      </h3>
                      <motion.button
                        type="button"
                        onClick={() => handleAddItem("faqs")}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg font-semibold"
                      >
                        <Plus className="w-4 h-4" />
                        Add FAQ
                      </motion.button>
                    </div>

                    {service.faqs.length === 0 ? (
                      <div className="text-center py-12 bg-gradient-to-br from-orange-50 to-white rounded-2xl border-2 border-dashed border-orange-200">
                        <HelpCircle className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                        <h4 className="text-lg font-semibold text-gray-700 mb-2">
                          No FAQs added
                        </h4>
                        <p className="text-gray-500 mb-4">
                          Add common questions and answers
                        </p>
                        <button
                          type="button"
                          onClick={() => handleAddItem("faqs")}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-lg font-medium hover:bg-orange-200 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                          Add First FAQ
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {service.faqs.map((faq, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-100 p-6 shadow-lg"
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                                  <HelpCircle className="w-5 h-5 text-orange-600" />
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-900">
                                    FAQ {index + 1}
                                  </h4>
                                  <p className="text-sm text-gray-500">
                                    Question & Answer
                                  </p>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleRemoveItem("faqs", index)}
                                className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition-colors"
                              >
                                <Trash className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="space-y-4">
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                  Question
                                </label>
                                <input
                                  type="text"
                                  value={faq.question}
                                  onChange={(e) =>
                                    handleDynamicChange(
                                      "faqs",
                                      index,
                                      "question",
                                      e.target.value,
                                    )
                                  }
                                  placeholder="e.g., How long does it take to see results?"
                                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all bg-white"
                                />
                              </div>

                              <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                  Answer
                                </label>
                                <textarea
                                  value={faq.answer}
                                  onChange={(e) =>
                                    handleDynamicChange(
                                      "faqs",
                                      index,
                                      "answer",
                                      e.target.value,
                                    )
                                  }
                                  placeholder="Provide a clear and detailed answer"
                                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all bg-white h-32"
                                  rows={3}
                                />
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Metrics Section */}
                {activeSection === "metrics" && (
                  <motion.div
                    key="metrics"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <TrendingUp className="w-6 h-6 text-pink-600" />
                      Expected Results & Metrics
                    </h3>

                    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-100 p-6 shadow-lg">
                      <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">
                            Metric Label
                          </label>
                          <input
                            type="text"
                            value={metricLabel}
                            onChange={(e) => setMetricLabel(e.target.value)}
                            placeholder="e.g., Traffic Increase"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all bg-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">
                            Metric Value
                          </label>
                          <input
                            type="text"
                            value={metricValue}
                            onChange={(e) => setMetricValue(e.target.value)}
                            placeholder="e.g., +300%"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all bg-white"
                          />
                        </div>
                      </div>

                      <motion.button
                        type="button"
                        onClick={handleAddMetric}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-pink-700 text-white rounded-xl font-semibold w-full justify-center mb-6"
                      >
                        <Plus className="w-5 h-5" />
                        Add Metric
                      </motion.button>

                      {service.metrics && service.metrics.length > 0 ? (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {service.metrics.map((metric, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-semibold text-gray-900">
                                  {metric.value}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveMetric(index)}
                                  className="w-6 h-6 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition-colors"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                              <p className="text-sm text-gray-600">
                                {metric.label}
                              </p>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <BarChart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-500">No metrics added yet</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Pricing Section */}
                {activeSection === "pricing" && (
                  <motion.div
                    key="pricing"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <DollarSign className="w-6 h-6 text-indigo-600" />
                      Pricing Plans
                    </h3>

                    <div className="grid lg:grid-cols-3 gap-6">
                      {["starter", "professional", "enterprise"].map((plan) => (
                        <motion.div
                          key={plan}
                          whileHover={{ y: -5 }}
                          className={`bg-gradient-to-br from-white to-gray-50 rounded-2xl border ${
                            plan === "professional"
                              ? "border-indigo-500 shadow-xl"
                              : "border-gray-200 shadow-lg"
                          } p-6`}
                        >
                          {plan === "professional" && (
                            <div className="mb-4">
                              <div className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white text-xs font-bold rounded-full">
                                <Sparkles className="w-3 h-3" />
                                Most Popular
                              </div>
                            </div>
                          )}

                          <div className="space-y-2 mb-6">
                            <label className="text-lg font-semibold text-gray-900 capitalize">
                              {plan} Plan
                            </label>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                $
                              </span>
                              <input
                                type="text"
                                placeholder="Price"
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
                                className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                              Features (comma separated)
                            </label>
                            <textarea
                              placeholder="Feature 1, Feature 2, Feature 3"
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
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white h-48"
                              rows={4}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Submit Section */}
            <div className="mt-8 pt-8 border-t border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  {message && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex items-center gap-2 px-4 py-3 rounded-xl ${
                        message.type === "success"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-red-50 text-red-700 border border-red-200"
                      }`}
                    >
                      {message.type === "success" ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <X className="w-5 h-5" />
                      )}
                      {message.text}
                    </motion.div>
                  )}
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveSection(
                        activeSection === "basic"
                          ? "pricing"
                          : sections[
                              sections.findIndex(
                                (s) => s.id === activeSection,
                              ) - 1
                            ].id,
                      )
                    }
                    className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-gray-300 transition-colors"
                  >
                    Back
                  </button>

                  {activeSection === "pricing" ? (
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Creating Service...
                        </>
                      ) : (
                        <>
                          <Save className="w-5 h-5" />
                          Create Service
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </motion.button>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        setActiveSection(
                          sections[
                            sections.findIndex((s) => s.id === activeSection) +
                              1
                          ].id,
                        )
                      }
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl font-semibold hover:shadow-xl transition-all"
                    >
                      Next
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.form>

        {/* Progress Summary */}
        <div className="mt-8">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              Progress Summary
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-4">
              {sections.map((section) => {
                const hasData =
                  service[section.id as keyof Service] &&
                  (Array.isArray(service[section.id as keyof Service])
                    ? (service[section.id as keyof Service] as any[]).length > 0
                    : Boolean(service[section.id as keyof Service]));

                return (
                  <div key={section.id} className="text-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 ${
                        hasData
                          ? `bg-${section.color}-100 text-${section.color}-600`
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      <section.icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-medium text-gray-700">
                      {section.label}
                    </span>
                    <div
                      className={`w-2 h-2 rounded-full mx-auto mt-1 ${hasData ? "bg-emerald-500" : "bg-gray-300"}`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateServiceForm;

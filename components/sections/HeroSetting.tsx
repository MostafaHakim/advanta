"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FaEdit,
  FaSave,
  FaTrash,
  FaTimes,
  FaPlus,
  FaEye,
} from "react-icons/fa";

type ContentItem = {
  contentTitle: string;
  contentSubTitle: string;
};

export default function HeroSettings() {
  const [formData, setFormData] = useState<{
    titleFirst: string;
    titleLast: string;
    subTitle: string;
    content: ContentItem[];
    marqueeLabel: string[];
  }>({
    titleFirst: "",
    titleLast: "",
    subTitle: "",
    content: [],
    marqueeLabel: [],
  });

  const [id, setId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editingContentIndex, setEditingContentIndex] = useState<number | null>(
    null
  );
  const [editingMarqueeIndex, setEditingMarqueeIndex] = useState<number | null>(
    null
  );

  // Preview state
  const [showPreview, setShowPreview] = useState(false);

  // ================= FETCH HERO DATA =================
  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const res = await axios.get("/api/hero");

        if (res.data.data.length > 0) {
          const heroData = res.data.data[0];

          setFormData({
            titleFirst: heroData.titleFirst || "",
            titleLast: heroData.titleLast || "",
            subTitle: heroData.subTitle || "",
            content: heroData.content || [
              { contentTitle: "", contentSubTitle: "" },
            ],
            marqueeLabel: heroData.marqueeLabel || [],
          });

          setId(heroData._id);
        } else {
          setFormData((prev) => ({
            ...prev,
            content: [{ contentTitle: "", contentSubTitle: "" }],
          }));
        }
      } catch (error) {
        console.error("Failed to fetch hero data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  // ================= BASIC INPUT CHANGE =================
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ================= CONTENT CHANGE =================
  const handleContentChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const updated = [...formData.content];
    updated[index] = { ...updated[index], [name]: value };
    setFormData((prev) => ({ ...prev, content: updated }));
  };

  const addContent = () => {
    if (formData.content.length >= 4) return;
    setFormData((prev) => ({
      ...prev,
      content: [...prev.content, { contentTitle: "", contentSubTitle: "" }],
    }));
  };

  const removeContent = (index: number) => {
    const updated = formData.content.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, content: updated }));
  };

  const saveContent = async (index: number) => {
    if (!id) return;
    setSubmitting(true);
    try {
      const contentToSave = formData.content[index];
      const payload = {
        content: formData.content.map((item, i) =>
          i === index ? contentToSave : item
        ),
      };
      await axios.put(`/api/hero/${id}`, payload);
      setEditingContentIndex(null);
    } catch (error) {
      console.error("Failed to save content", error);
    } finally {
      setSubmitting(false);
    }
  };

  // ================= MARQUEE LABEL CHANGE =================
  const handleMarqueeChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updated = [...formData.marqueeLabel];
    updated[index] = e.target.value;
    setFormData((prev) => ({ ...prev, marqueeLabel: updated }));
  };

  const addMarqueeLabel = () => {
    setFormData((prev) => ({
      ...prev,
      marqueeLabel: [...prev.marqueeLabel, ""],
    }));
  };

  const removeMarqueeLabel = (index: number) => {
    const updated = formData.marqueeLabel.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, marqueeLabel: updated }));
  };

  const saveMarqueeLabel = async (index: number) => {
    if (!id) return;
    setSubmitting(true);
    try {
      const payload = {
        marqueeLabel: formData.marqueeLabel,
      };
      await axios.put(`/api/hero/${id}`, payload);
      setEditingMarqueeIndex(null);
    } catch (error) {
      console.error("Failed to save marquee label", error);
    } finally {
      setSubmitting(false);
    }
  };

  // ================= SAVE SINGLE FIELD =================
  const saveField = async (fieldName: string) => {
    if (!id) return;
    setSubmitting(true);
    try {
      const payload = {
        [fieldName]: formData[fieldName as keyof typeof formData],
      };
      await axios.put(`/api/hero/${id}`, payload);
      setEditingField(null);
    } catch (error) {
      console.error("Failed to save field", error);
    } finally {
      setSubmitting(false);
    }
  };

  // ================= DELETE HERO =================
  const deleteHero = async () => {
    if (!id || !confirm("Are you sure you want to delete this hero section?"))
      return;
    setSubmitting(true);
    try {
      await axios.delete(`/api/hero/${id}`);
      setFormData({
        titleFirst: "",
        titleLast: "",
        subTitle: "",
        content: [],
        marqueeLabel: [],
      });
      setId(null);
    } catch (error) {
      console.error("Failed to delete hero", error);
    } finally {
      setSubmitting(false);
    }
  };

  // ================= PREVIEW COMPONENT =================
  const HeroPreview = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h3 className="text-xl font-bold">Hero Preview</h3>
          <button
            onClick={() => setShowPreview(false)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <FaTimes size={24} />
          </button>
        </div>

        <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-700 text-white min-h-[400px] flex flex-col justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-yellow-300">{formData.titleFirst}</span>{" "}
              {formData.titleLast}
            </h1>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              {formData.subTitle}
            </p>

            {/* Content Items Preview */}
            {formData.content.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {formData.content.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm p-6 rounded-xl"
                  >
                    <h3 className="text-xl font-bold mb-2">
                      {item.contentTitle}
                    </h3>
                    <p className="opacity-80">{item.contentSubTitle}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Marquee Preview */}
            {formData.marqueeLabel.length > 0 && (
              <div className="bg-black/20 p-4 rounded-lg overflow-hidden">
                <div className="flex animate-marquee space-x-8">
                  {[...formData.marqueeLabel, ...formData.marqueeLabel].map(
                    (label, idx) => (
                      <span
                        key={idx}
                        className="text-lg font-medium whitespace-nowrap"
                      >
                        {label} •
                      </span>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );

  return (
    <div className="space-y-6">
      {showPreview && <HeroPreview />}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Hero Section Settings
          </h2>
          <p className="text-gray-600">Configure your hero section content</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowPreview(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2"
          >
            <FaEye /> Preview
          </button>
          {id && (
            <button
              onClick={deleteHero}
              disabled={submitting}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center gap-2"
            >
              <FaTrash /> Delete
            </button>
          )}
        </div>
      </div>

      {/* Main Content - Scrollable Container */}
      <div className="max-h-[calc(100vh-250px)] overflow-y-auto pr-2 space-y-6">
        {/* Titles Section */}
        <div className="bg-white rounded-xl border p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Hero Titles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                key: "titleFirst",
                label: "First Title",
                placeholder: "Enter first part of title",
              },
              {
                key: "titleLast",
                label: "Last Title",
                placeholder: "Enter second part of title",
              },
              {
                key: "subTitle",
                label: "Subtitle",
                placeholder: "Enter subtitle",
                fullWidth: true,
              },
            ].map(({ key, label, placeholder, fullWidth }) => (
              <div
                key={key}
                className={`space-y-2 ${fullWidth ? "md:col-span-2" : ""}`}
              >
                <label className="block text-sm font-medium text-gray-700">
                  {label}
                </label>
                <div className="flex items-center gap-2">
                  {editingField === key ? (
                    <>
                      <input
                        type="text"
                        name={key}
                        value={formData[key as keyof typeof formData] as string}
                        onChange={handleChange}
                        placeholder={placeholder}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button
                        onClick={() => saveField(key)}
                        disabled={submitting}
                        className="p-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                      >
                        <FaSave />
                      </button>
                      <button
                        onClick={() => setEditingField(null)}
                        className="p-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                      >
                        <FaTimes />
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-700">
                        {String(formData[key as keyof typeof formData]) ||
                          "Not set"}
                      </div>
                      <button
                        onClick={() => setEditingField(key)}
                        className="p-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        <FaEdit />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Items Section */}
        <div className="bg-white rounded-xl border p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">
                Content Items
              </h3>
              <p className="text-sm text-gray-500">
                Maximum 4 content items allowed
              </p>
            </div>
            <button
              onClick={addContent}
              disabled={formData.content.length >= 4 || submitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
            >
              <FaPlus /> Add Content
            </button>
          </div>

          {formData.content.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
              <p className="text-gray-500">No content items yet</p>
              <button
                onClick={addContent}
                className="mt-2 text-blue-600 hover:text-blue-800"
              >
                Add your first content item
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData.content.map((item, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="font-medium text-gray-700 bg-blue-50 px-3 py-1 rounded-full">
                      Content #{index + 1}
                    </span>
                    <button
                      onClick={() => removeContent(index)}
                      disabled={submitting}
                      className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg"
                    >
                      <FaTrash />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {["contentTitle", "contentSubTitle"].map((field) => (
                      <div key={field} className="space-y-1">
                        <label className="block text-xs font-medium text-gray-600 uppercase">
                          {field.replace("content", "")}
                        </label>
                        <div className="flex items-center gap-2">
                          {editingContentIndex === index ? (
                            <>
                              <input
                                type="text"
                                name={field}
                                value={item[field as keyof ContentItem]}
                                onChange={(e) => handleContentChange(index, e)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                placeholder={`Enter ${field.replace(
                                  "content",
                                  ""
                                )}`}
                              />
                              <button
                                onClick={() => saveContent(index)}
                                disabled={submitting}
                                className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                              >
                                <FaSave />
                              </button>
                              <button
                                onClick={() => setEditingContentIndex(null)}
                                className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                              >
                                <FaTimes />
                              </button>
                            </>
                          ) : (
                            <>
                              <div className="flex-1 px-3 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-sm">
                                {item[field as keyof ContentItem] || "Not set"}
                              </div>
                              <button
                                onClick={() => setEditingContentIndex(index)}
                                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                              >
                                <FaEdit />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Marquee Labels Section */}
        <div className="bg-white rounded-xl border p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">
                Marquee Labels
              </h3>
              <p className="text-sm text-gray-500">
                Labels that will scroll in the marquee
              </p>
            </div>
            <button
              onClick={addMarqueeLabel}
              disabled={submitting}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2"
            >
              <FaPlus /> Add Label
            </button>
          </div>

          {formData.marqueeLabel.length === 0 ? (
            <div className="text-center py-6 border-2 border-dashed border-gray-300 rounded-lg">
              <p className="text-gray-500">No marquee labels yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {formData.marqueeLabel.map((label, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex-1 flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-500 w-6">
                      #{index + 1}
                    </span>
                    {editingMarqueeIndex === index ? (
                      <>
                        <input
                          type="text"
                          value={label}
                          onChange={(e) => handleMarqueeChange(index, e)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                          placeholder="Enter label text"
                        />
                        <button
                          onClick={() => saveMarqueeLabel(index)}
                          disabled={submitting}
                          className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                          <FaSave />
                        </button>
                        <button
                          onClick={() => setEditingMarqueeIndex(null)}
                          className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                        >
                          <FaTimes />
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="flex-1 px-3 py-2 border border-gray-200 rounded bg-gray-50">
                          {label || "Empty label"}
                        </div>
                        <button
                          onClick={() => setEditingMarqueeIndex(index)}
                          className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => removeMarqueeLabel(index)}
                          className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg"
                        >
                          <FaTrash />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Save All Button - Sticky Bottom */}
      <div className="sticky bottom-0 pt-4 border-t bg-white">
        <button
          onClick={async () => {
            setSubmitting(true);
            try {
              const payload = {
                titleFirst: formData.titleFirst,
                titleLast: formData.titleLast,
                subTitle: formData.subTitle,
                content: formData.content,
                marqueeLabel: formData.marqueeLabel,
              };

              if (id) {
                await axios.put(`/api/hero/${id}`, payload);
                alert("Hero updated successfully!");
              } else {
                const res = await axios.post("/api/hero", payload);
                setId(res.data.data._id);
                alert("Hero created successfully!");
              }
            } catch (error) {
              console.error("Failed to save all", error);
              alert("Failed to save changes");
            } finally {
              setSubmitting(false);
            }
          }}
          disabled={submitting}
          className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 flex items-center justify-center gap-2 font-medium"
        >
          <FaSave />{" "}
          {submitting
            ? "Saving..."
            : id
            ? "Update All Changes"
            : "Create Hero Section"}
        </button>
      </div>

      {/* Add CSS for marquee animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
}

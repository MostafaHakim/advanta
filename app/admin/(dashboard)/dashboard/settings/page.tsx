"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit, FaSave, FaTrash, FaTimes } from "react-icons/fa";

type ContentItem = {
  contentTitle: string;
  contentSubTitle: string;
};

export default function Settings() {
  const [formData, setFormData] = useState<{
    titleFirst: string;
    titleLast: string;
    subTitle: string;
    contents: ContentItem[];
  }>({
    titleFirst: "",
    titleLast: "",
    subTitle: "",
    contents: [],
  });

  const [id, setId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editingContentIndex, setEditingContentIndex] = useState<number | null>(
    null
  );

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
            contents: heroData.content || [],
          });

          setId(heroData._id);
        } else {
          // 👉 data না থাকলে empty content যোগ
          setFormData((prev) => ({
            ...prev,
            contents: [{ contentTitle: "", contentSubTitle: "" }],
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
    const updated = [...formData.contents];

    updated[index] = { ...updated[index], [name]: value };

    setFormData((prev) => ({ ...prev, contents: updated }));
  };

  // ================= ADD CONTENT (MAX 4) =================
  const addContent = () => {
    if (formData.contents.length >= 4) return;

    setFormData((prev) => ({
      ...prev,
      contents: [...prev.contents, { contentTitle: "", contentSubTitle: "" }],
    }));
  };

  // ================= REMOVE CONTENT =================
  const removeContent = (index: number) => {
    const updated = formData.contents.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, contents: updated }));
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

  // ================= SAVE SINGLE CONTENT =================
  const saveContent = async (index: number) => {
    if (!id) return;

    setSubmitting(true);
    try {
      const contentToSave = formData.contents[index];
      const payload = {
        content: formData.contents.map((item, i) =>
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

  // ================= DELETE HERO =================
  const deleteHero = async () => {
    if (!id || !confirm("Are you sure you want to delete this hero section?"))
      return;

    setSubmitting(true);
    try {
      await axios.delete(`/api/hero/${id}`);
      // Reset form after deletion
      setFormData({
        titleFirst: "",
        titleLast: "",
        subTitle: "",
        contents: [],
      });
      setId(null);
    } catch (error) {
      console.error("Failed to delete hero", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Hero Section Settings</h2>
        {id && (
          <button
            onClick={deleteHero}
            disabled={submitting}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 flex items-center gap-2"
          >
            <FaTrash /> Delete Hero
          </button>
        )}
      </div>

      {/* Title First */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">First Title</label>
        <div className="flex items-center gap-2">
          {editingField === "titleFirst" ? (
            <>
              <input
                type="text"
                name="titleFirst"
                value={formData.titleFirst}
                onChange={handleChange}
                className="flex-1 px-3 py-2 border rounded-md"
                placeholder="First Title"
              />
              <button
                onClick={() => saveField("titleFirst")}
                disabled={submitting}
                className="p-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                <FaSave />
              </button>
              <button
                onClick={() => setEditingField(null)}
                className="p-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                <FaTimes />
              </button>
            </>
          ) : (
            <>
              <div className="flex-1 p-2 border rounded-md bg-gray-50">
                {formData.titleFirst || "Not set"}
              </div>
              <button
                onClick={() => setEditingField("titleFirst")}
                className="p-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
              >
                <FaEdit />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Title Last */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Last Title</label>
        <div className="flex items-center gap-2">
          {editingField === "titleLast" ? (
            <>
              <input
                type="text"
                name="titleLast"
                value={formData.titleLast}
                onChange={handleChange}
                className="flex-1 px-3 py-2 border rounded-md"
                placeholder="Last Title"
              />
              <button
                onClick={() => saveField("titleLast")}
                disabled={submitting}
                className="p-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                <FaSave />
              </button>
              <button
                onClick={() => setEditingField(null)}
                className="p-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                <FaTimes />
              </button>
            </>
          ) : (
            <>
              <div className="flex-1 p-2 border rounded-md bg-gray-50">
                {formData.titleLast || "Not set"}
              </div>
              <button
                onClick={() => setEditingField("titleLast")}
                className="p-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
              >
                <FaEdit />
              </button>
            </>
          )}
        </div>
      </div>

      {/* SubTitle */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Subtitle</label>
        <div className="flex items-center gap-2">
          {editingField === "subTitle" ? (
            <>
              <input
                type="text"
                name="subTitle"
                value={formData.subTitle}
                onChange={handleChange}
                className="flex-1 px-3 py-2 border rounded-md"
                placeholder="Subtitle"
              />
              <button
                onClick={() => saveField("subTitle")}
                disabled={submitting}
                className="p-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                <FaSave />
              </button>
              <button
                onClick={() => setEditingField(null)}
                className="p-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                <FaTimes />
              </button>
            </>
          ) : (
            <>
              <div className="flex-1 p-2 border rounded-md bg-gray-50">
                {formData.subTitle || "Not set"}
              </div>
              <button
                onClick={() => setEditingField("subTitle")}
                className="p-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
              >
                <FaEdit />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Content Items */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="block text-sm font-medium">Content Items</label>
          <button
            onClick={addContent}
            disabled={formData.contents.length >= 4}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            + Add Content (Max 4)
          </button>
        </div>

        {formData.contents.length === 0 ? (
          <p className="text-gray-500 italic">No content items yet</p>
        ) : (
          formData.contents.map((item, index) => (
            <div key={index} className="border p-4 rounded-md space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Content #{index + 1}</span>
                <button
                  onClick={() => removeContent(index)}
                  className="p-2 text-red-600 hover:text-red-800"
                >
                  <FaTrash />
                </button>
              </div>

              {/* Content Title */}
              <div className="space-y-1">
                <label className="block text-xs font-medium">
                  Content Title
                </label>
                <div className="flex items-center gap-2">
                  {editingContentIndex === index ? (
                    <>
                      <input
                        type="text"
                        name="contentTitle"
                        value={item.contentTitle}
                        onChange={(e) => handleContentChange(index, e)}
                        className="flex-1 px-3 py-2 border rounded-md"
                        placeholder="Content Title"
                      />
                      <button
                        onClick={() => saveContent(index)}
                        disabled={submitting}
                        className="p-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                      >
                        <FaSave />
                      </button>
                      <button
                        onClick={() => setEditingContentIndex(null)}
                        className="p-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                      >
                        <FaTimes />
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="flex-1 p-2 border rounded-md bg-gray-50">
                        {item.contentTitle || "Not set"}
                      </div>
                      <button
                        onClick={() => setEditingContentIndex(index)}
                        className="p-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                      >
                        <FaEdit />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Content Subtitle */}
              <div className="space-y-1">
                <label className="block text-xs font-medium">
                  Content Subtitle
                </label>
                <div className="flex items-center gap-2">
                  {editingContentIndex === index ? (
                    <>
                      <input
                        type="text"
                        name="contentSubTitle"
                        value={item.contentSubTitle}
                        onChange={(e) => handleContentChange(index, e)}
                        className="flex-1 px-3 py-2 border rounded-md"
                        placeholder="Content Subtitle"
                      />
                      <button
                        onClick={() => saveContent(index)}
                        disabled={submitting}
                        className="p-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                      >
                        <FaSave />
                      </button>
                      <button
                        onClick={() => setEditingContentIndex(null)}
                        className="p-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                      >
                        <FaTimes />
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="flex-1 p-2 border rounded-md bg-gray-50">
                        {item.contentSubTitle || "Not set"}
                      </div>
                      <button
                        onClick={() => setEditingContentIndex(index)}
                        className="p-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                      >
                        <FaEdit />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Save All Button (Optional) */}
      {formData.contents.length > 0 && (
        <div className="pt-4 border-t">
          <button
            onClick={async () => {
              setSubmitting(true);
              try {
                const payload = {
                  titleFirst: formData.titleFirst,
                  titleLast: formData.titleLast,
                  subTitle: formData.subTitle,
                  content: formData.contents,
                };

                if (id) {
                  await axios.put(`/api/hero/${id}`, payload);
                } else {
                  const res = await axios.post("/api/hero", payload);
                  setId(res.data.data._id);
                }
              } catch (error) {
                console.error("Failed to save all", error);
              } finally {
                setSubmitting(false);
              }
            }}
            disabled={submitting}
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <FaSave /> {submitting ? "Saving..." : "Save All Changes"}
          </button>
        </div>
      )}
    </div>
  );
}

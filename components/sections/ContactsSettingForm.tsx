"use client";

import { useEffect, useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  CheckCircle,
  Users,
  Headphones,
  Save,
  Plus,
  Trash2,
  Eye,
  Building,
  Calendar,
} from "lucide-react";

interface ContactInfo {
  title: string;
  icon: string;
  details: string[];
  description: string;
}

interface Department {
  name: string;
  email: string;
  icon: string;
}

interface AddressSection {
  address: {
    title: string;
    details: string[];
  };
  visitHours: {
    title: string;
    details: string[];
  };
  Appointment: {
    title: string;
    details: string[];
  };
}

interface ContactSettings {
  contactInfo: ContactInfo[];
  departments: Department[];
  address: AddressSection[];
}

const ICON_OPTIONS = [
  { value: "Phone", label: "Phone", icon: Phone },
  { value: "Mail", label: "Mail", icon: Mail },
  { value: "MapPin", label: "Map Pin", icon: MapPin },
  { value: "Clock", label: "Clock", icon: Clock },
  { value: "MessageSquare", label: "Message", icon: MessageSquare },
  { value: "CheckCircle", label: "Check", icon: CheckCircle },
  { value: "Users", label: "Users", icon: Users },
  { value: "Headphones", label: "Headphones", icon: Headphones },
  { value: "Building", label: "Building", icon: Building },
  { value: "Calendar", label: "Calendar", icon: Calendar },
];

export default function ContactSettingsForm() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ContactSettings>({
    contactInfo: [],
    departments: [],
    address: [
      {
        address: { title: "Address", details: [""] },
        visitHours: { title: "Visit Hours", details: [""] },
        Appointment: { title: "Appointment", details: [""] },
      },
    ],
  });
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    fetch("/api/admin/contact")
      .then((res) => res.json())
      .then((res) => {
        if (res?.data) {
          const normalized = {
            ...res.data,
            contactInfo:
              res.data.contactInfo?.map((c: any) => ({
                ...c,
                description: c.description || "",
                details: Array.isArray(c.details) ? c.details : [],
              })) || [],
            departments: res.data.departments || [],
            address: res.data.address || [
              {
                address: { title: "Address", details: [""] },
                visitHours: { title: "Visit Hours", details: [""] },
                Appointment: { title: "Appointment", details: [""] },
              },
            ],
          };
          setData(normalized);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const saveSettings = async () => {
    const res = await fetch("/api/admin/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      alert("✅ Settings saved successfully!");
    } else {
      alert("❌ Error saving data");
    }
  };

  const updateContact = <K extends keyof ContactInfo>(
    i: number,
    field: K,
    value: ContactInfo[K],
  ) => {
    const updated = [...data.contactInfo];
    updated[i] = { ...updated[i], [field]: value };
    setData({ ...data, contactInfo: updated });
  };

  const updateDept = <K extends keyof Department>(
    i: number,
    field: K,
    value: Department[K],
  ) => {
    const updated = [...data.departments];
    updated[i] = { ...updated[i], [field]: value };
    setData({ ...data, departments: updated });
  };

  const updateAddressSection = (
    section: keyof AddressSection,
    field: "title" | "details",
    value: string | string[],
  ) => {
    const updated = [...data.address];
    if (updated.length === 0) {
      updated.push({
        address: { title: "Address", details: [""] },
        visitHours: { title: "Visit Hours", details: [""] },
        Appointment: { title: "Appointment", details: [""] },
      });
    }

    updated[0] = {
      ...updated[0],
      [section]: {
        ...updated[0][section],
        [field]: value,
      },
    };
    setData({ ...data, address: updated });
  };

  const addContactRow = () => {
    setData({
      ...data,
      contactInfo: [
        ...data.contactInfo,
        { title: "New Contact", icon: "Phone", details: [""], description: "" },
      ],
    });
  };

  const addDepartmentRow = () => {
    setData({
      ...data,
      departments: [
        ...data.departments,
        { name: "New Department", email: "", icon: "Users" },
      ],
    });
  };

  const removeContact = (index: number) => {
    const updated = data.contactInfo.filter((_, i) => i !== index);
    setData({ ...data, contactInfo: updated });
  };

  const removeDepartment = (index: number) => {
    const updated = data.departments.filter((_, i) => i !== index);
    setData({ ...data, departments: updated });
  };

  const renderIcon = (iconName: string) => {
    const IconComponent = ICON_OPTIONS.find(
      (opt) => opt.value === iconName,
    )?.icon;
    return IconComponent ? <IconComponent className="w-5 h-5" /> : null;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Contact Page Settings
              </h1>
              <p className="text-gray-600 mt-2">
                Manage your contact information, departments, and address
                details
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setPreviewMode(!previewMode)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${previewMode ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              >
                <Eye className="w-4 h-4" />
                {previewMode ? "Edit Mode" : "Preview Mode"}
              </button>
              <button
                onClick={saveSettings}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg"
              >
                <Save className="w-5 h-5" />
                Save Changes
              </button>
            </div>
          </div>
        </div>

        {previewMode ? (
          /* Preview Section */
          <div className="space-y-8">
            {/* Contact Info Preview */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b">
                Contact Info Preview
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {data.contactInfo.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-100"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center">
                        {renderIcon(item.icon)}
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {item.title || "Untitled"}
                      </h3>
                    </div>
                    <div className="space-y-2 mb-4">
                      {item.details.map((detail, idx) => (
                        <p
                          key={idx}
                          className="text-gray-700 bg-white p-3 rounded-lg border"
                        >
                          {detail || "No detail provided"}
                        </p>
                      ))}
                    </div>
                    <p className="text-gray-600 text-sm bg-blue-50 p-4 rounded-lg">
                      {item.description || "No description provided"}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Address Section Preview */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b">
                Address & Hours Preview
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {data.address.length > 0 && (
                  <>
                    <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-6 border border-green-100">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 text-white flex items-center justify-center">
                          <Building className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">
                          {data.address[0].address.title || "Address"}
                        </h3>
                      </div>
                      <div className="space-y-2">
                        {data.address[0].address.details.map((detail, idx) => (
                          <p
                            key={idx}
                            className="text-gray-700 bg-white p-3 rounded-lg border"
                          >
                            {detail || "No address provided"}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-amber-50 to-white rounded-xl p-6 border border-amber-100">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 text-white flex items-center justify-center">
                          <Clock className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">
                          {data.address[0].visitHours.title || "Visit Hours"}
                        </h3>
                      </div>
                      <div className="space-y-2">
                        {data.address[0].visitHours.details.map(
                          (detail, idx) => (
                            <p
                              key={idx}
                              className="text-gray-700 bg-white p-3 rounded-lg border"
                            >
                              {detail || "No hours provided"}
                            </p>
                          ),
                        )}
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 border border-purple-100">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white flex items-center justify-center">
                          <Calendar className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">
                          {data.address[0].Appointment.title || "Appointment"}
                        </h3>
                      </div>
                      <div className="space-y-2">
                        {data.address[0].Appointment.details.map(
                          (detail, idx) => (
                            <p
                              key={idx}
                              className="text-gray-700 bg-white p-3 rounded-lg border"
                            >
                              {detail || "No appointment details provided"}
                            </p>
                          ),
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Departments Preview */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b">
                Departments Preview
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.departments.map((dept, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 border border-purple-100"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white flex items-center justify-center">
                        {renderIcon(dept.icon)}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">
                          {dept.name || "Untitled"}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {dept.email || "No email provided"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Edit Section */
          <div className="space-y-8">
            {/* Contact Info Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Contact Information
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Add and manage your contact details
                  </p>
                </div>
                <button
                  onClick={addContactRow}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all"
                >
                  <Plus className="w-5 h-5" />
                  Add Contact
                </button>
              </div>

              {data.contactInfo.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-xl">
                  <Mail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    No Contact Information
                  </h3>
                  <p className="text-gray-500">
                    Add your first contact info to get started
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {data.contactInfo.map((item, i) => (
                    <div
                      key={i}
                      className="border border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-all"
                    >
                      <div className="flex justify-between items-start mb-6">
                        <h3 className="text-lg font-semibold text-gray-800">
                          Contact #{i + 1}
                        </h3>
                        <button
                          onClick={() => removeContact(i)}
                          className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Title
                            </label>
                            <input
                              value={item.title}
                              onChange={(e) =>
                                updateContact(i, "title", e.target.value)
                              }
                              placeholder="e.g., Phone Support"
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Icon
                            </label>
                            <div className="grid grid-cols-4 gap-2">
                              {ICON_OPTIONS.map((iconOpt) => (
                                <button
                                  key={iconOpt.value}
                                  type="button"
                                  onClick={() =>
                                    updateContact(i, "icon", iconOpt.value)
                                  }
                                  className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${item.icon === iconOpt.value ? "bg-blue-50 border-blue-500 text-blue-600" : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"}`}
                                >
                                  <iconOpt.icon className="w-5 h-5 mb-1" />
                                  <span className="text-xs">
                                    {iconOpt.label}
                                  </span>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Details (One per line)
                          </label>
                          <textarea
                            value={item.details.join("\n")}
                            onChange={(e) =>
                              updateContact(
                                i,
                                "details",
                                e.target.value.split("\n"),
                              )
                            }
                            placeholder="+1 (555) 123-4567&#10;+1 (555) 987-6543"
                            className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            rows={3}
                          />
                        </div>
                      </div>

                      <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description
                        </label>
                        <textarea
                          value={item.description}
                          onChange={(e) =>
                            updateContact(i, "description", e.target.value)
                          }
                          placeholder="Brief description about this contact method"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                          rows={2}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Address Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Address & Hours
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Manage address, visit hours, and appointment details
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Address */}
                <div className="border border-gray-200 rounded-xl p-6 hover:border-green-300 transition-all">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 text-white flex items-center justify-center">
                      <Building className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Address
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title
                      </label>
                      <input
                        value={data.address[0]?.address.title || ""}
                        onChange={(e) =>
                          updateAddressSection(
                            "address",
                            "title",
                            e.target.value,
                          )
                        }
                        placeholder="e.g., Office Address"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Details (One per line)
                      </label>
                      <textarea
                        value={(data.address[0]?.address.details || [""]).join(
                          "\n",
                        )}
                        onChange={(e) =>
                          updateAddressSection(
                            "address",
                            "details",
                            e.target.value.split("\n"),
                          )
                        }
                        placeholder="123 Main Street&#10;City, State 12345"
                        className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                {/* Visit Hours */}
                <div className="border border-gray-200 rounded-xl p-6 hover:border-amber-300 transition-all">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 text-white flex items-center justify-center">
                      <Clock className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Visit Hours
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title
                      </label>
                      <input
                        value={data.address[0]?.visitHours.title || ""}
                        onChange={(e) =>
                          updateAddressSection(
                            "visitHours",
                            "title",
                            e.target.value,
                          )
                        }
                        placeholder="e.g., Business Hours"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Details (One per line)
                      </label>
                      <textarea
                        value={(
                          data.address[0]?.visitHours.details || [""]
                        ).join("\n")}
                        onChange={(e) =>
                          updateAddressSection(
                            "visitHours",
                            "details",
                            e.target.value.split("\n"),
                          )
                        }
                        placeholder="Monday - Friday: 9am - 5pm&#10;Saturday: 10am - 2pm"
                        className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                {/* Appointment */}
                <div className="border border-gray-200 rounded-xl p-6 hover:border-purple-300 transition-all">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white flex items-center justify-center">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Appointment
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title
                      </label>
                      <input
                        value={data.address[0]?.Appointment.title || ""}
                        onChange={(e) =>
                          updateAddressSection(
                            "Appointment",
                            "title",
                            e.target.value,
                          )
                        }
                        placeholder="e.g., Schedule Appointment"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Details (One per line)
                      </label>
                      <textarea
                        value={(
                          data.address[0]?.Appointment.details || [""]
                        ).join("\n")}
                        onChange={(e) =>
                          updateAddressSection(
                            "Appointment",
                            "details",
                            e.target.value.split("\n"),
                          )
                        }
                        placeholder="Call to schedule&#10;Online booking available"
                        className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Departments Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Departments
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Manage departments and contact emails
                  </p>
                </div>
                <button
                  onClick={addDepartmentRow}
                  className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-5 py-3 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all"
                >
                  <Plus className="w-5 h-5" />
                  Add Department
                </button>
              </div>

              {data.departments.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-xl">
                  <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    No Departments
                  </h3>
                  <p className="text-gray-500">
                    Add your first department to get started
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {data.departments.map((dept, i) => (
                    <div
                      key={i}
                      className="border border-gray-200 rounded-xl p-6 hover:border-green-300 transition-all"
                    >
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 text-white flex items-center justify-center">
                            {renderIcon(dept.icon)}
                          </div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            Department #{i + 1}
                          </h3>
                        </div>
                        <button
                          onClick={() => removeDepartment(i)}
                          className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Department Name
                          </label>
                          <input
                            value={dept.name}
                            onChange={(e) =>
                              updateDept(i, "name", e.target.value)
                            }
                            placeholder="e.g., Sales & Partnerships"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                          </label>
                          <input
                            value={dept.email}
                            onChange={(e) =>
                              updateDept(i, "email", e.target.value)
                            }
                            placeholder="e.g., sales@company.com"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Icon
                          </label>
                          <select
                            value={dept.icon}
                            onChange={(e) =>
                              updateDept(i, "icon", e.target.value)
                            }
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                          >
                            {ICON_OPTIONS.map((iconOpt) => (
                              <option key={iconOpt.value} value={iconOpt.value}>
                                {iconOpt.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={saveSettings}
            className="flex items-center gap-3 bg-gradient-to-r from-black to-gray-800 text-white px-10 py-4 rounded-xl font-bold text-lg hover:from-gray-800 hover:to-black transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            <Save className="w-6 h-6" />
            Save All Changes
          </button>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import {
//   Phone,
//   Mail,
//   MapPin,
//   Clock,
//   MessageSquare,
//   CheckCircle,
//   Users,
//   Headphones,
//   Save,
//   Plus,
//   Trash2,
//   Eye,
//   Building,
//   Calendar,
//   Globe,
//   Github,
//   Linkedin,
//   Twitter,
//   Youtube,
//   Instagram,
//   Facebook,
//   AlertCircle,
//   ChevronDown,
//   Menu,
//   X,
//   Copy,
//   Check,
//   Edit,
//   RefreshCw,
//   Download,
//   Upload,
//   Settings,
//   HelpCircle,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";
// import Link from "next/link";

// // Types
// interface ContactInfo {
//   title: string;
//   icon: string;
//   details: string[];
//   description: string;
//   isActive?: boolean;
//   order?: number;
// }

// interface Department {
//   name: string;
//   email: string;
//   icon: string;
//   phone?: string;
//   isActive?: boolean;
//   order?: number;
// }

// interface AddressSection {
//   address: {
//     title: string;
//     details: string[];
//     mapUrl?: string;
//   };
//   visitHours: {
//     title: string;
//     details: string[];
//     is24Hours?: boolean;
//   };
//   appointment: {
//     title: string;
//     details: string[];
//     bookingUrl?: string;
//   };
// }

// interface SocialLink {
//   platform: string;
//   url: string;
//   icon: string;
//   isActive: boolean;
// }

// interface ContactSettings {
//   contactInfo: ContactInfo[];
//   departments: Department[];
//   address: AddressSection[];
//   socialLinks: SocialLink[];
//   emergencyContact?: {
//     phone: string;
//     email: string;
//     isActive: boolean;
//   };
//   metaData?: {
//     title: string;
//     description: string;
//     keywords: string[];
//   };
// }

// // Icon Options
// const ICON_OPTIONS = [
//   { value: "Phone", label: "Phone", icon: Phone, category: "Contact" },
//   { value: "Mail", label: "Mail", icon: Mail, category: "Contact" },
//   { value: "MapPin", label: "Map Pin", icon: MapPin, category: "Location" },
//   { value: "Clock", label: "Clock", icon: Clock, category: "Time" },
//   {
//     value: "MessageSquare",
//     label: "Message",
//     icon: MessageSquare,
//     category: "Communication",
//   },
//   {
//     value: "CheckCircle",
//     label: "Check",
//     icon: CheckCircle,
//     category: "Status",
//   },
//   { value: "Users", label: "Users", icon: Users, category: "Team" },
//   {
//     value: "Headphones",
//     label: "Headphones",
//     icon: Headphones,
//     category: "Support",
//   },
//   {
//     value: "Building",
//     label: "Building",
//     icon: Building,
//     category: "Location",
//   },
//   { value: "Calendar", label: "Calendar", icon: Calendar, category: "Time" },
//   { value: "Globe", label: "Globe", icon: Globe, category: "Social" },
//   { value: "Github", label: "GitHub", icon: Github, category: "Social" },
//   { value: "Linkedin", label: "LinkedIn", icon: Linkedin, category: "Social" },
//   { value: "Twitter", label: "Twitter", icon: Twitter, category: "Social" },
//   { value: "Youtube", label: "YouTube", icon: Youtube, category: "Social" },
//   {
//     value: "Instagram",
//     label: "Instagram",
//     icon: Instagram,
//     category: "Social",
//   },
//   { value: "Facebook", label: "Facebook", icon: Facebook, category: "Social" },
// ];

// // Social Platform Options
// const SOCIAL_PLATFORMS = [
//   {
//     value: "facebook",
//     label: "Facebook",
//     icon: Facebook,
//     color: "bg-blue-600",
//   },
//   { value: "twitter", label: "Twitter", icon: Twitter, color: "bg-sky-500" },
//   {
//     value: "linkedin",
//     label: "LinkedIn",
//     icon: Linkedin,
//     color: "bg-blue-700",
//   },
//   {
//     value: "instagram",
//     label: "Instagram",
//     icon: Instagram,
//     color: "bg-pink-600",
//   },
//   { value: "youtube", label: "YouTube", icon: Youtube, color: "bg-red-600" },
//   { value: "github", label: "GitHub", icon: Github, color: "bg-gray-800" },
//   { value: "website", label: "Website", icon: Globe, color: "bg-green-600" },
// ];

// export default function ContactSettingsForm() {
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState<string | null>(null);
//   const [previewMode, setPreviewMode] = useState(false);
//   const [activeTab, setActiveTab] = useState("contact");
//   const [showMobileMenu, setShowMobileMenu] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [copiedId, setCopiedId] = useState<string | null>(null);

//   const [data, setData] = useState<ContactSettings>({
//     contactInfo: [],
//     departments: [],
//     address: [
//       {
//         address: { title: "Office Address", details: [""], mapUrl: "" },
//         visitHours: {
//           title: "Business Hours",
//           details: [""],
//           is24Hours: false,
//         },
//         appointment: {
//           title: "Make an Appointment",
//           details: [""],
//           bookingUrl: "",
//         },
//       },
//     ],
//     socialLinks: [],
//     emergencyContact: {
//       phone: "",
//       email: "",
//       isActive: false,
//     },
//     metaData: {
//       title: "Contact Us",
//       description: "Get in touch with our team",
//       keywords: [],
//     },
//   });

//   // Mobile Detection
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   // Fetch Data
//   useEffect(() => {
//     fetchContactData();
//   }, []);

//   const fetchContactData = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const res = await fetch("/api/admin/contact");
//       if (!res.ok) throw new Error("Failed to fetch contact data");
//       const response = await res.json();

//       if (response?.data) {
//         const normalized = {
//           contactInfo:
//             response.data.contactInfo?.map((c: any, index: number) => ({
//               ...c,
//               description: c.description || "",
//               details: Array.isArray(c.details) ? c.details : [],
//               isActive: c.isActive !== false,
//               order: c.order || index,
//             })) || [],

//           departments:
//             response.data.departments?.map((d: any, index: number) => ({
//               ...d,
//               isActive: d.isActive !== false,
//               order: d.order || index,
//             })) || [],

//           address: response.data.address || [
//             {
//               address: { title: "Office Address", details: [""], mapUrl: "" },
//               visitHours: {
//                 title: "Business Hours",
//                 details: [""],
//                 is24Hours: false,
//               },
//               appointment: {
//                 title: "Make an Appointment",
//                 details: [""],
//                 bookingUrl: "",
//               },
//             },
//           ],

//           socialLinks: response.data.socialLinks || [],
//           emergencyContact: response.data.emergencyContact || {
//             phone: "",
//             email: "",
//             isActive: false,
//           },
//           metaData: response.data.metaData || {
//             title: "Contact Us",
//             description: "Get in touch with our team",
//             keywords: [],
//           },
//         };
//         setData(normalized);
//       }
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to load data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Save Settings
//   const saveSettings = async () => {
//     try {
//       setSaving(true);
//       setError(null);
//       setSuccess(null);

//       const res = await fetch("/api/admin/contact", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       });

//       if (res.ok) {
//         setSuccess("✅ Settings saved successfully!");
//         setTimeout(() => setSuccess(null), 3000);
//       } else {
//         throw new Error("Failed to save settings");
//       }
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Error saving data");
//     } finally {
//       setSaving(false);
//     }
//   };

//   // Copy to Clipboard
//   const copyToClipboard = (text: string, id: string) => {
//     navigator.clipboard.writeText(text);
//     setCopiedId(id);
//     setTimeout(() => setCopiedId(null), 2000);
//   };

//   // Update Functions
//   const updateContact = <K extends keyof ContactInfo>(
//     index: number,
//     field: K,
//     value: ContactInfo[K],
//   ) => {
//     const updated = [...data.contactInfo];
//     updated[index] = { ...updated[index], [field]: value };
//     setData({ ...data, contactInfo: updated });
//   };

//   const updateDepartment = <K extends keyof Department>(
//     index: number,
//     field: K,
//     value: Department[K],
//   ) => {
//     const updated = [...data.departments];
//     updated[index] = { ...updated[index], [field]: value };
//     setData({ ...data, departments: updated });
//   };

//   const updateAddressSection = (
//     section: keyof AddressSection,
//     field: "title" | "details" | "mapUrl" | "is24Hours" | "bookingUrl",
//     value: string | string[] | boolean,
//   ) => {
//     const updated = [...data.address];
//     if (updated.length === 0) {
//       updated.push({
//         address: { title: "Office Address", details: [""], mapUrl: "" },
//         visitHours: {
//           title: "Business Hours",
//           details: [""],
//           is24Hours: false,
//         },
//         appointment: {
//           title: "Make an Appointment",
//           details: [""],
//           bookingUrl: "",
//         },
//       });
//     }

//     updated[0] = {
//       ...updated[0],
//       [section]: {
//         ...updated[0][section],
//         [field]: value,
//       },
//     };
//     setData({ ...data, address: updated });
//   };

//   const updateSocialLink = (
//     index: number,
//     field: keyof SocialLink,
//     value: any,
//   ) => {
//     const updated = [...data.socialLinks];
//     updated[index] = { ...updated[index], [field]: value };
//     setData({ ...data, socialLinks: updated });
//   };

//   // Add Functions
//   const addContactRow = () => {
//     setData({
//       ...data,
//       contactInfo: [
//         ...data.contactInfo,
//         {
//           title: "New Contact",
//           icon: "Phone",
//           details: [""],
//           description: "",
//           isActive: true,
//           order: data.contactInfo.length,
//         },
//       ],
//     });
//   };

//   const addDepartmentRow = () => {
//     setData({
//       ...data,
//       departments: [
//         ...data.departments,
//         {
//           name: "New Department",
//           email: "",
//           icon: "Users",
//           isActive: true,
//           order: data.departments.length,
//         },
//       ],
//     });
//   };

//   const addSocialLink = () => {
//     setData({
//       ...data,
//       socialLinks: [
//         ...data.socialLinks,
//         {
//           platform: "website",
//           url: "",
//           icon: "Globe",
//           isActive: true,
//         },
//       ],
//     });
//   };

//   // Remove Functions
//   const removeContact = (index: number) => {
//     const updated = data.contactInfo.filter((_, i) => i !== index);
//     setData({ ...data, contactInfo: updated });
//   };

//   const removeDepartment = (index: number) => {
//     const updated = data.departments.filter((_, i) => i !== index);
//     setData({ ...data, departments: updated });
//   };

//   const removeSocialLink = (index: number) => {
//     const updated = data.socialLinks.filter((_, i) => i !== index);
//     setData({ ...data, socialLinks: updated });
//   };

//   // Reorder Functions
//   const moveItem = (
//     type: "contact" | "department",
//     fromIndex: number,
//     direction: "up" | "down",
//   ) => {
//     const toIndex = direction === "up" ? fromIndex - 1 : fromIndex + 1;
//     if (
//       toIndex < 0 ||
//       toIndex >= data[type === "contact" ? "contactInfo" : "departments"].length
//     )
//       return;

//     const updated = [
//       ...data[type === "contact" ? "contactInfo" : "departments"],
//     ];
//     [updated[fromIndex], updated[toIndex]] = [
//       updated[toIndex],
//       updated[fromIndex],
//     ];

//     if (type === "contact") {
//       setData({ ...data, contactInfo: updated });
//     } else {
//       setData({ ...data, departments: updated });
//     }
//   };

//   // Render Icon
//   const renderIcon = (iconName: string, className = "w-5 h-5") => {
//     const IconComponent = ICON_OPTIONS.find(
//       (opt) => opt.value === iconName,
//     )?.icon;
//     return IconComponent ? <IconComponent className={className} /> : null;
//   };

//   // Loading State
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
//         <div className="text-center">
//           <div className="relative">
//             <div className="w-16 h-16 rounded-full border-4 border-gray-200" />
//             <div className="absolute top-0 left-0 w-16 h-16 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
//           </div>
//           <p className="mt-4 text-gray-600 font-medium">
//             Loading contact settings...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
//         {/* Header */}
//         <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
//           <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
//             <div>
//               <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
//                 Contact Page Settings
//               </h1>
//               <p className="text-sm sm:text-base text-gray-600 mt-2">
//                 Manage your contact information, departments, and address
//                 details
//               </p>
//             </div>

//             <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
//               {/* Preview Toggle */}
//               <button
//                 onClick={() => setPreviewMode(!previewMode)}
//                 className={`flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all ${
//                   previewMode
//                     ? "bg-purple-100 text-purple-700 border-2 border-purple-200"
//                     : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent"
//                 }`}
//               >
//                 <Eye className="w-4 h-4" />
//                 <span className="hidden sm:inline">
//                   {previewMode ? "Edit Mode" : "Preview Mode"}
//                 </span>
//                 <span className="sm:hidden">
//                   {previewMode ? "Edit" : "Preview"}
//                 </span>
//               </button>

//               {/* Save Button */}
//               <button
//                 onClick={saveSettings}
//                 disabled={saving}
//                 className={`flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-medium text-white transition-all ${
//                   saving
//                     ? "bg-gray-400 cursor-not-allowed"
//                     : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg"
//                 }`}
//               >
//                 {saving ? (
//                   <>
//                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                     <span>Saving...</span>
//                   </>
//                 ) : (
//                   <>
//                     <Save className="w-4 h-4" />
//                     <span className="hidden sm:inline">Save Changes</span>
//                     <span className="sm:hidden">Save</span>
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Success/Error Messages */}
//           <AnimatePresence>
//             {success && (
//               <motion.div
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3"
//               >
//                 <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
//                 <p className="text-green-800 text-sm">{success}</p>
//               </motion.div>
//             )}

//             {error && (
//               <motion.div
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3"
//               >
//                 <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
//                 <p className="text-red-800 text-sm">{error}</p>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>

//         {/* Mobile Tab Navigation */}
//         <div className="lg:hidden mb-4">
//           <button
//             onClick={() => setShowMobileMenu(!showMobileMenu)}
//             className="w-full bg-white rounded-xl p-4 shadow-lg flex items-center justify-between"
//           >
//             <span className="font-medium text-gray-700">
//               {activeTab === "contact"
//                 ? "Contact Info"
//                 : activeTab === "address"
//                   ? "Address & Hours"
//                   : activeTab === "departments"
//                     ? "Departments"
//                     : activeTab === "social"
//                       ? "Social Links"
//                       : "Settings"}
//             </span>
//             {showMobileMenu ? (
//               <X className="w-5 h-5" />
//             ) : (
//               <Menu className="w-5 h-5" />
//             )}
//           </button>

//           <AnimatePresence>
//             {showMobileMenu && (
//               <motion.div
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 className="absolute z-50 mt-2 w-full max-w-[calc(100%-2rem)] bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden"
//               >
//                 {[
//                   { id: "contact", label: "Contact Info", icon: Phone },
//                   { id: "address", label: "Address & Hours", icon: MapPin },
//                   { id: "departments", label: "Departments", icon: Users },
//                   { id: "social", label: "Social Links", icon: Globe },
//                   { id: "settings", label: "Settings", icon: Settings },
//                 ].map((tab) => (
//                   <button
//                     key={tab.id}
//                     onClick={() => {
//                       setActiveTab(tab.id);
//                       setShowMobileMenu(false);
//                     }}
//                     className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-colors ${
//                       activeTab === tab.id
//                         ? "bg-blue-50 text-blue-700"
//                         : "hover:bg-gray-50 text-gray-700"
//                     }`}
//                   >
//                     <tab.icon className="w-5 h-5" />
//                     <span>{tab.label}</span>
//                   </button>
//                 ))}
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>

//         {/* Desktop Tab Navigation */}
//         <div className="hidden lg:flex bg-white rounded-xl shadow-lg p-2 mb-6">
//           {[
//             { id: "contact", label: "Contact Info", icon: Phone },
//             { id: "address", label: "Address & Hours", icon: MapPin },
//             { id: "departments", label: "Departments", icon: Users },
//             { id: "social", label: "Social Links", icon: Globe },
//             { id: "settings", label: "Settings", icon: Settings },
//           ].map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
//                 activeTab === tab.id
//                   ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md"
//                   : "text-gray-600 hover:bg-gray-50"
//               }`}
//             >
//               <tab.icon className="w-5 h-5" />
//               {tab.label}
//             </button>
//           ))}
//         </div>

//         {previewMode ? (
//           /* Preview Mode */
//           <PreviewMode data={data} renderIcon={renderIcon} />
//         ) : (
//           /* Edit Mode */
//           <div className="space-y-6">
//             {/* Contact Info Section */}
//             {activeTab === "contact" && (
//               <EditContactInfo
//                 data={data}
//                 updateContact={updateContact}
//                 addContactRow={addContactRow}
//                 removeContact={removeContact}
//                 moveItem={moveItem}
//                 renderIcon={renderIcon}
//                 ICON_OPTIONS={ICON_OPTIONS}
//               />
//             )}

//             {/* Address Section */}
//             {activeTab === "address" && (
//               <EditAddress
//                 data={data}
//                 updateAddressSection={updateAddressSection}
//               />
//             )}

//             {/* Departments Section */}
//             {activeTab === "departments" && (
//               <EditDepartments
//                 data={data}
//                 updateDepartment={updateDepartment}
//                 addDepartmentRow={addDepartmentRow}
//                 removeDepartment={removeDepartment}
//                 moveItem={moveItem}
//                 renderIcon={renderIcon}
//                 ICON_OPTIONS={ICON_OPTIONS}
//               />
//             )}

//             {/* Social Links Section */}
//             {activeTab === "social" && (
//               <EditSocialLinks
//                 data={data}
//                 updateSocialLink={updateSocialLink}
//                 addSocialLink={addSocialLink}
//                 removeSocialLink={removeSocialLink}
//                 SOCIAL_PLATFORMS={SOCIAL_PLATFORMS}
//               />
//             )}

//             {/* Settings Section */}
//             {activeTab === "settings" && (
//               <EditSettings data={data} setData={setData} />
//             )}
//           </div>
//         )}

//         {/* Footer Save Button */}
//         <div className="mt-8 flex justify-center">
//           <button
//             onClick={saveSettings}
//             disabled={saving}
//             className={`flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 ${
//               saving
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-gradient-to-r from-black to-gray-800 hover:from-gray-800 hover:to-black text-white"
//             }`}
//           >
//             {saving ? (
//               <>
//                 <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                 Saving Changes...
//               </>
//             ) : (
//               <>
//                 <Save className="w-6 h-6" />
//                 Save All Changes
//               </>
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Preview Mode Component
// const PreviewMode = ({ data, renderIcon }: any) => (
//   <motion.div
//     initial={{ opacity: 0 }}
//     animate={{ opacity: 1 }}
//     className="space-y-8"
//   >
//     {/* Emergency Contact Banner */}
//     {data.emergencyContact?.isActive && (
//       <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl p-6 shadow-lg">
//         <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
//           <div className="flex items-center gap-4">
//             <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
//               <Headphones className="w-6 h-6" />
//             </div>
//             <div>
//               <h3 className="text-xl font-bold">Emergency Contact</h3>
//               <p className="text-red-100">
//                 Available 24/7 for urgent inquiries
//               </p>
//             </div>
//           </div>
//           <div className="flex gap-4">
//             {data.emergencyContact.phone && (
//               <a
//                 href={`tel:${data.emergencyContact.phone}`}
//                 className="px-4 py-2 bg-white text-red-700 rounded-lg font-medium hover:bg-red-50 transition-colors"
//               >
//                 {data.emergencyContact.phone}
//               </a>
//             )}
//             {data.emergencyContact.email && (
//               <a
//                 href={`mailto:${data.emergencyContact.email}`}
//                 className="px-4 py-2 bg-white/20 text-white rounded-lg font-medium hover:bg-white/30 transition-colors"
//               >
//                 Email
//               </a>
//             )}
//           </div>
//         </div>
//       </div>
//     )}

//     {/* Contact Info Preview */}
//     <div className="bg-white rounded-2xl shadow-lg p-6">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b">
//         Contact Information
//       </h2>
//       <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {data.contactInfo
//           .filter((c: any) => c.isActive !== false)
//           .map((item: any, index: number) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.1 }}
//               className="group relative bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-100 hover:shadow-xl transition-all"
//             >
//               <div className="flex items-start gap-4 mb-4">
//                 <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
//                   {renderIcon(item.icon, "w-6 h-6")}
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-800">
//                   {item.title}
//                 </h3>
//               </div>
//               <div className="space-y-2 mb-4">
//                 {item.details.map((detail: string, idx: number) => (
//                   <p
//                     key={idx}
//                     className="text-gray-700 bg-white p-3 rounded-lg border"
//                   >
//                     {detail || "—"}
//                   </p>
//                 ))}
//               </div>
//               {item.description && (
//                 <p className="text-gray-600 text-sm bg-blue-50 p-4 rounded-lg">
//                   {item.description}
//                 </p>
//               )}
//             </motion.div>
//           ))}
//       </div>
//     </div>

//     {/* Address & Hours Preview */}
//     <div className="bg-white rounded-2xl shadow-lg p-6">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b">
//         Location & Hours
//       </h2>
//       <div className="grid md:grid-cols-3 gap-6">
//         {/* Address Card */}
//         <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-6 border border-green-100">
//           <div className="flex items-center gap-4 mb-4">
//             <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 text-white flex items-center justify-center">
//               <Building className="w-6 h-6" />
//             </div>
//             <h3 className="text-xl font-bold text-gray-800">
//               {data.address[0]?.address.title}
//             </h3>
//           </div>
//           <div className="space-y-2">
//             {data.address[0]?.address.details.map(
//               (detail: string, idx: number) => (
//                 <p
//                   key={idx}
//                   className="text-gray-700 bg-white p-3 rounded-lg border"
//                 >
//                   {detail || "—"}
//                 </p>
//               ),
//             )}
//           </div>
//           {data.address[0]?.address.mapUrl && (
//             <a
//               href={data.address[0].address.mapUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="mt-4 inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
//             >
//               <MapPin className="w-4 h-4" />
//               View on Map
//             </a>
//           )}
//         </div>

//         {/* Hours Card */}
//         <div className="bg-gradient-to-br from-amber-50 to-white rounded-xl p-6 border border-amber-100">
//           <div className="flex items-center gap-4 mb-4">
//             <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 text-white flex items-center justify-center">
//               <Clock className="w-6 h-6" />
//             </div>
//             <h3 className="text-xl font-bold text-gray-800">
//               {data.address[0]?.visitHours.title}
//             </h3>
//           </div>
//           {data.address[0]?.visitHours.is24Hours ? (
//             <p className="text-gray-700 bg-white p-3 rounded-lg border text-center font-bold">
//               Open 24/7
//             </p>
//           ) : (
//             <div className="space-y-2">
//               {data.address[0]?.visitHours.details.map(
//                 (detail: string, idx: number) => (
//                   <p
//                     key={idx}
//                     className="text-gray-700 bg-white p-3 rounded-lg border"
//                   >
//                     {detail || "—"}
//                   </p>
//                 ),
//               )}
//             </div>
//           )}
//         </div>

//         {/* Appointment Card */}
//         <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 border border-purple-100">
//           <div className="flex items-center gap-4 mb-4">
//             <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white flex items-center justify-center">
//               <Calendar className="w-6 h-6" />
//             </div>
//             <h3 className="text-xl font-bold text-gray-800">
//               {data.address[0]?.appointment.title}
//             </h3>
//           </div>
//           <div className="space-y-2 mb-4">
//             {data.address[0]?.appointment.details.map(
//               (detail: string, idx: number) => (
//                 <p
//                   key={idx}
//                   className="text-gray-700 bg-white p-3 rounded-lg border"
//                 >
//                   {detail || "—"}
//                 </p>
//               ),
//             )}
//           </div>
//           {data.address[0]?.appointment.bookingUrl && (
//             <a
//               href={data.address[0].appointment.bookingUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
//             >
//               <Calendar className="w-4 h-4" />
//               Book Appointment
//             </a>
//           )}
//         </div>
//       </div>
//     </div>

//     {/* Departments Preview */}
//     <div className="bg-white rounded-2xl shadow-lg p-6">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b">
//         Our Departments
//       </h2>
//       <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {data.departments
//           .filter((d: any) => d.isActive !== false)
//           .map((dept: any, index: number) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.1 }}
//               className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 border border-purple-100 hover:shadow-xl transition-all"
//             >
//               <div className="flex items-center gap-4 mb-4">
//                 <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white flex items-center justify-center">
//                   {renderIcon(dept.icon, "w-6 h-6")}
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-bold text-gray-800">
//                     {dept.name}
//                   </h3>
//                   {dept.email && (
//                     <a
//                       href={`mailto:${dept.email}`}
//                       className="text-sm text-purple-600 hover:text-purple-700"
//                     >
//                       {dept.email}
//                     </a>
//                   )}
//                   {dept.phone && (
//                     <a
//                       href={`tel:${dept.phone}`}
//                       className="text-sm text-gray-600 block"
//                     >
//                       {dept.phone}
//                     </a>
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//       </div>
//     </div>

//     {/* Social Links Preview */}
//     {data.socialLinks.filter((s: any) => s.isActive).length > 0 && (
//       <div className="bg-white rounded-2xl shadow-lg p-6">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b">
//           Connect With Us
//         </h2>
//         <div className="flex flex-wrap justify-center gap-4">
//           {data.socialLinks
//             .filter((s: any) => s.isActive)
//             .map((social: any, index: number) => {
//               const platform = SOCIAL_PLATFORMS.find(
//                 (p) => p.value === social.platform,
//               );
//               return (
//                 <a
//                   key={index}
//                   href={social.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className={`w-12 h-12 rounded-full ${platform?.color || "bg-gray-600"} text-white flex items-center justify-center hover:scale-110 transition-transform`}
//                 >
//                   {renderIcon(social.icon, "w-5 h-5")}
//                 </a>
//               );
//             })}
//         </div>
//       </div>
//     )}

//     {/* SEO Meta Preview */}
//     <div className="bg-white rounded-2xl shadow-lg p-6">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b">
//         SEO Preview
//       </h2>
//       <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
//         <p className="text-sm text-green-700 mb-1">
//           {window.location.origin}/contact
//         </p>
//         <h3 className="text-xl text-blue-600 hover:text-blue-700 cursor-pointer mb-1">
//           {data.metaData?.title || "Contact Us"}
//         </h3>
//         <p className="text-sm text-gray-600">
//           {data.metaData?.description || "Get in touch with our team"}
//         </p>
//         {data.metaData?.keywords && data.metaData.keywords.length > 0 && (
//           <div className="mt-2 flex flex-wrap gap-1">
//             {data.metaData.keywords.map((keyword: string, idx: number) => (
//               <span key={idx} className="text-xs text-gray-500">
//                 #{keyword}
//               </span>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   </motion.div>
// );

// // Edit Contact Info Component
// const EditContactInfo = ({
//   data,
//   updateContact,
//   addContactRow,
//   removeContact,
//   moveItem,
//   renderIcon,
//   ICON_OPTIONS,
// }: any) => (
//   <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
//     <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
//       <div>
//         <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
//           Contact Information
//         </h2>
//         <p className="text-sm sm:text-base text-gray-600 mt-1">
//           Add and manage your contact details
//         </p>
//       </div>
//       <button
//         onClick={addContactRow}
//         className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all"
//       >
//         <Plus className="w-5 h-5" />
//         Add Contact
//       </button>
//     </div>

//     {data.contactInfo.length === 0 ? (
//       <EmptyState
//         icon={Phone}
//         title="No Contact Information"
//         message="Add your first contact info to get started"
//         action={addContactRow}
//         actionLabel="Add Contact"
//       />
//     ) : (
//       <div className="space-y-4">
//         {data.contactInfo.map((item: any, index: number) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             className="border border-gray-200 rounded-xl p-4 sm:p-6 hover:border-blue-300 transition-all"
//           >
//             <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center">
//                   {renderIcon(item.icon)}
//                 </div>
//                 <h3 className="text-lg font-semibold text-gray-800">
//                   Contact #{index + 1}
//                 </h3>
//               </div>
//               <div className="flex items-center gap-2 w-full sm:w-auto">
//                 {/* Reorder Buttons */}
//                 <div className="flex border border-gray-200 rounded-lg overflow-hidden">
//                   <button
//                     onClick={() => moveItem("contact", index, "up")}
//                     disabled={index === 0}
//                     className={`p-2 ${index === 0 ? "text-gray-300" : "text-gray-600 hover:bg-gray-100"}`}
//                   >
//                     <ChevronDown className="w-4 h-4 rotate-180" />
//                   </button>
//                   <button
//                     onClick={() => moveItem("contact", index, "down")}
//                     disabled={index === data.contactInfo.length - 1}
//                     className={`p-2 ${index === data.contactInfo.length - 1 ? "text-gray-300" : "text-gray-600 hover:bg-gray-100"}`}
//                   >
//                     <ChevronDown className="w-4 h-4" />
//                   </button>
//                 </div>

//                 {/* Active Toggle */}
//                 <label className="relative inline-flex items-center cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={item.isActive !== false}
//                     onChange={(e) =>
//                       updateContact(index, "isActive", e.target.checked)
//                     }
//                     className="sr-only peer"
//                   />
//                   <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//                 </label>

//                 <button
//                   onClick={() => removeContact(index)}
//                   className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
//                 >
//                   <Trash2 className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>

//             <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Title
//                   </label>
//                   <input
//                     value={item.title}
//                     onChange={(e) =>
//                       updateContact(index, "title", e.target.value)
//                     }
//                     placeholder="e.g., Phone Support"
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Icon
//                   </label>
//                   <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-48 overflow-y-auto p-2 border border-gray-200 rounded-lg">
//                     {ICON_OPTIONS.map((iconOpt: any) => (
//                       <button
//                         key={iconOpt.value}
//                         type="button"
//                         onClick={() =>
//                           updateContact(index, "icon", iconOpt.value)
//                         }
//                         className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-all ${
//                           item.icon === iconOpt.value
//                             ? "bg-blue-50 border-blue-500 text-blue-600"
//                             : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
//                         }`}
//                       >
//                         <iconOpt.icon className="w-4 h-4 mb-1" />
//                         <span className="text-xs truncate max-w-full">
//                           {iconOpt.label}
//                         </span>
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Details (One per line)
//                 </label>
//                 <textarea
//                   value={item.details.join("\n")}
//                   onChange={(e) =>
//                     updateContact(index, "details", e.target.value.split("\n"))
//                   }
//                   placeholder="+1 (555) 123-4567&#10;+1 (555) 987-6543"
//                   className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
//                   rows={3}
//                 />
//               </div>
//             </div>

//             <div className="mt-4">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Description
//               </label>
//               <textarea
//                 value={item.description}
//                 onChange={(e) =>
//                   updateContact(index, "description", e.target.value)
//                 }
//                 placeholder="Brief description about this contact method"
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
//                 rows={2}
//               />
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     )}
//   </div>
// );

// // Edit Address Component
// const EditAddress = ({ data, updateAddressSection }: any) => (
//   <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
//     <div className="mb-8">
//       <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
//         Address & Hours
//       </h2>
//       <p className="text-sm sm:text-base text-gray-600 mt-1">
//         Manage address, visit hours, and appointment details
//       </p>
//     </div>

//     <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//       {/* Address */}
//       <div className="border border-gray-200 rounded-xl p-4 sm:p-6 hover:border-green-300 transition-all">
//         <div className="flex items-center gap-3 mb-6">
//           <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 text-white flex items-center justify-center">
//             <Building className="w-5 h-5" />
//           </div>
//           <h3 className="text-lg font-semibold text-gray-800">Address</h3>
//         </div>
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Title
//             </label>
//             <input
//               value={data.address[0]?.address.title || ""}
//               onChange={(e) =>
//                 updateAddressSection("address", "title", e.target.value)
//               }
//               placeholder="e.g., Office Address"
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Details (One per line)
//             </label>
//             <textarea
//               value={(data.address[0]?.address.details || [""]).join("\n")}
//               onChange={(e) =>
//                 updateAddressSection(
//                   "address",
//                   "details",
//                   e.target.value.split("\n"),
//                 )
//               }
//               placeholder="123 Main Street&#10;City, State 12345"
//               className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
//               rows={3}
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Google Maps URL
//             </label>
//             <input
//               value={data.address[0]?.address.mapUrl || ""}
//               onChange={(e) =>
//                 updateAddressSection("address", "mapUrl", e.target.value)
//               }
//               placeholder="https://maps.google.com/..."
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Visit Hours */}
//       <div className="border border-gray-200 rounded-xl p-4 sm:p-6 hover:border-amber-300 transition-all">
//         <div className="flex items-center gap-3 mb-6">
//           <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 text-white flex items-center justify-center">
//             <Clock className="w-5 h-5" />
//           </div>
//           <h3 className="text-lg font-semibold text-gray-800">Visit Hours</h3>
//         </div>
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Title
//             </label>
//             <input
//               value={data.address[0]?.visitHours.title || ""}
//               onChange={(e) =>
//                 updateAddressSection("visitHours", "title", e.target.value)
//               }
//               placeholder="e.g., Business Hours"
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
//             />
//           </div>

//           {/* 24/7 Toggle */}
//           <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//             <span className="text-sm font-medium text-gray-700">Open 24/7</span>
//             <label className="relative inline-flex items-center cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={data.address[0]?.visitHours.is24Hours || false}
//                 onChange={(e) =>
//                   updateAddressSection(
//                     "visitHours",
//                     "is24Hours",
//                     e.target.checked,
//                   )
//                 }
//                 className="sr-only peer"
//               />
//               <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
//             </label>
//           </label>

//           {!data.address[0]?.visitHours.is24Hours && (
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Details (One per line)
//               </label>
//               <textarea
//                 value={(data.address[0]?.visitHours.details || [""]).join("\n")}
//                 onChange={(e) =>
//                   updateAddressSection(
//                     "visitHours",
//                     "details",
//                     e.target.value.split("\n"),
//                   )
//                 }
//                 placeholder="Monday - Friday: 9am - 5pm&#10;Saturday: 10am - 2pm"
//                 className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
//                 rows={3}
//               />
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Appointment */}
//       <div className="border border-gray-200 rounded-xl p-4 sm:p-6 hover:border-purple-300 transition-all">
//         <div className="flex items-center gap-3 mb-6">
//           <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white flex items-center justify-center">
//             <Calendar className="w-5 h-5" />
//           </div>
//           <h3 className="text-lg font-semibold text-gray-800">Appointment</h3>
//         </div>
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Title
//             </label>
//             <input
//               value={data.address[0]?.appointment.title || ""}
//               onChange={(e) =>
//                 updateAddressSection("appointment", "title", e.target.value)
//               }
//               placeholder="e.g., Schedule Appointment"
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Details (One per line)
//             </label>
//             <textarea
//               value={(data.address[0]?.appointment.details || [""]).join("\n")}
//               onChange={(e) =>
//                 updateAddressSection(
//                   "appointment",
//                   "details",
//                   e.target.value.split("\n"),
//                 )
//               }
//               placeholder="Call to schedule&#10;Online booking available"
//               className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
//               rows={3}
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Booking URL
//             </label>
//             <input
//               value={data.address[0]?.appointment.bookingUrl || ""}
//               onChange={(e) =>
//                 updateAddressSection(
//                   "appointment",
//                   "bookingUrl",
//                   e.target.value,
//                 )
//               }
//               placeholder="https://calendly.com/..."
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// // Edit Departments Component
// const EditDepartments = ({
//   data,
//   updateDepartment,
//   addDepartmentRow,
//   removeDepartment,
//   moveItem,
//   renderIcon,
//   ICON_OPTIONS,
// }: any) => (
//   <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
//     <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
//       <div>
//         <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
//           Departments
//         </h2>
//         <p className="text-sm sm:text-base text-gray-600 mt-1">
//           Manage departments and contact emails
//         </p>
//       </div>
//       <button
//         onClick={addDepartmentRow}
//         className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-5 py-3 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all"
//       >
//         <Plus className="w-5 h-5" />
//         Add Department
//       </button>
//     </div>

//     {data.departments.length === 0 ? (
//       <EmptyState
//         icon={Users}
//         title="No Departments"
//         message="Add your first department to get started"
//         action={addDepartmentRow}
//         actionLabel="Add Department"
//       />
//     ) : (
//       <div className="grid sm:grid-cols-2 gap-6">
//         {data.departments.map((dept: any, index: number) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             className="border border-gray-200 rounded-xl p-4 sm:p-6 hover:border-green-300 transition-all"
//           >
//             <div className="flex justify-between items-start mb-6">
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 text-white flex items-center justify-center">
//                   {renderIcon(dept.icon)}
//                 </div>
//                 <h3 className="text-lg font-semibold text-gray-800">
//                   Department #{index + 1}
//                 </h3>
//               </div>
//               <div className="flex items-center gap-2">
//                 {/* Reorder Buttons */}
//                 <div className="flex border border-gray-200 rounded-lg overflow-hidden">
//                   <button
//                     onClick={() => moveItem("department", index, "up")}
//                     disabled={index === 0}
//                     className={`p-2 ${index === 0 ? "text-gray-300" : "text-gray-600 hover:bg-gray-100"}`}
//                   >
//                     <ChevronDown className="w-4 h-4 rotate-180" />
//                   </button>
//                   <button
//                     onClick={() => moveItem("department", index, "down")}
//                     disabled={index === data.departments.length - 1}
//                     className={`p-2 ${index === data.departments.length - 1 ? "text-gray-300" : "text-gray-600 hover:bg-gray-100"}`}
//                   >
//                     <ChevronDown className="w-4 h-4" />
//                   </button>
//                 </div>

//                 {/* Active Toggle */}
//                 <label className="relative inline-flex items-center cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={dept.isActive !== false}
//                     onChange={(e) =>
//                       updateDepartment(index, "isActive", e.target.checked)
//                     }
//                     className="sr-only peer"
//                   />
//                   <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
//                 </label>

//                 <button
//                   onClick={() => removeDepartment(index)}
//                   className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
//                 >
//                   <Trash2 className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Department Name
//                 </label>
//                 <input
//                   value={dept.name}
//                   onChange={(e) =>
//                     updateDepartment(index, "name", e.target.value)
//                   }
//                   placeholder="e.g., Sales & Partnerships"
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Email Address
//                 </label>
//                 <input
//                   value={dept.email}
//                   onChange={(e) =>
//                     updateDepartment(index, "email", e.target.value)
//                   }
//                   placeholder="e.g., sales@company.com"
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Phone Number (Optional)
//                 </label>
//                 <input
//                   value={dept.phone || ""}
//                   onChange={(e) =>
//                     updateDepartment(index, "phone", e.target.value)
//                   }
//                   placeholder="e.g., +1 (555) 123-4567"
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Icon
//                 </label>
//                 <select
//                   value={dept.icon}
//                   onChange={(e) =>
//                     updateDepartment(index, "icon", e.target.value)
//                   }
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
//                 >
//                   {ICON_OPTIONS.map((iconOpt: any) => (
//                     <option key={iconOpt.value} value={iconOpt.value}>
//                       {iconOpt.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     )}
//   </div>
// );

// // Edit Social Links Component
// const EditSocialLinks = ({
//   data,
//   updateSocialLink,
//   addSocialLink,
//   removeSocialLink,
//   SOCIAL_PLATFORMS,
// }: any) => (
//   <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
//     <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
//       <div>
//         <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
//           Social Links
//         </h2>
//         <p className="text-sm sm:text-base text-gray-600 mt-1">
//           Connect your social media accounts
//         </p>
//       </div>
//       <button
//         onClick={addSocialLink}
//         className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-5 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-purple-700 transition-all"
//       >
//         <Plus className="w-5 h-5" />
//         Add Social Link
//       </button>
//     </div>

//     {data.socialLinks.length === 0 ? (
//       <EmptyState
//         icon={Globe}
//         title="No Social Links"
//         message="Add your social media profiles"
//         action={addSocialLink}
//         actionLabel="Add Social Link"
//       />
//     ) : (
//       <div className="grid sm:grid-cols-2 gap-6">
//         {data.socialLinks.map((social: any, index: number) => {
//           const platform = SOCIAL_PLATFORMS.find(
//             (p: any) => p.value === social.platform,
//           );
//           return (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className="border border-gray-200 rounded-xl p-4 sm:p-6 hover:border-purple-300 transition-all"
//             >
//               <div className="flex justify-between items-start mb-4">
//                 <div className="flex items-center gap-3">
//                   <div
//                     className={`w-10 h-10 rounded-lg ${platform?.color || "bg-gray-600"} text-white flex items-center justify-center`}
//                   >
//                     <platform.icon className="w-5 h-5" />
//                   </div>
//                   <h3 className="text-lg font-semibold text-gray-800">
//                     {platform?.label || "Custom Link"}
//                   </h3>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   {/* Active Toggle */}
//                   <label className="relative inline-flex items-center cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={social.isActive}
//                       onChange={(e) =>
//                         updateSocialLink(index, "isActive", e.target.checked)
//                       }
//                       className="sr-only peer"
//                     />
//                     <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
//                   </label>

//                   <button
//                     onClick={() => removeSocialLink(index)}
//                     className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
//                   >
//                     <Trash2 className="w-5 h-5" />
//                   </button>
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Platform
//                   </label>
//                   <select
//                     value={social.platform}
//                     onChange={(e) =>
//                       updateSocialLink(index, "platform", e.target.value)
//                     }
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
//                   >
//                     {SOCIAL_PLATFORMS.map((platform: any) => (
//                       <option key={platform.value} value={platform.value}>
//                         {platform.label}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     URL
//                   </label>
//                   <input
//                     value={social.url}
//                     onChange={(e) =>
//                       updateSocialLink(index, "url", e.target.value)
//                     }
//                     placeholder="https://..."
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
//                   />
//                 </div>
//               </div>
//             </motion.div>
//           );
//         })}
//       </div>
//     )}
//   </div>
// );

// // Edit Settings Component
// const EditSettings = ({ data, setData }: any) => (
//   <div className="space-y-6">
//     {/* Emergency Contact */}
//     <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
//       <div className="flex items-center gap-3 mb-6">
//         <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-red-600 text-white flex items-center justify-center">
//           <Headphones className="w-5 h-5" />
//         </div>
//         <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
//           Emergency Contact
//         </h2>
//       </div>

//       <div className="space-y-4 max-w-xl">
//         <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
//           <div>
//             <span className="font-medium text-gray-700">
//               Enable Emergency Contact
//             </span>
//             <p className="text-sm text-gray-500">
//               Show emergency contact banner on contact page
//             </p>
//           </div>
//           <label className="relative inline-flex items-center cursor-pointer">
//             <input
//               type="checkbox"
//               checked={data.emergencyContact?.isActive}
//               onChange={(e) =>
//                 setData({
//                   ...data,
//                   emergencyContact: {
//                     ...data.emergencyContact,
//                     isActive: e.target.checked,
//                   },
//                 })
//               }
//               className="sr-only peer"
//             />
//             <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
//           </label>
//         </label>

//         {data.emergencyContact?.isActive && (
//           <div className="grid sm:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Emergency Phone
//               </label>
//               <input
//                 value={data.emergencyContact.phone}
//                 onChange={(e) =>
//                   setData({
//                     ...data,
//                     emergencyContact: {
//                       ...data.emergencyContact,
//                       phone: e.target.value,
//                     },
//                   })
//                 }
//                 placeholder="+1 (555) 123-4567"
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Emergency Email
//               </label>
//               <input
//                 value={data.emergencyContact.email}
//                 onChange={(e) =>
//                   setData({
//                     ...data,
//                     emergencyContact: {
//                       ...data.emergencyContact,
//                       email: e.target.value,
//                     },
//                   })
//                 }
//                 placeholder="emergency@company.com"
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
//               />
//             </div>
//           </div>
//         )}
//       </div>
//     </div>

//     {/* SEO Meta Data */}
//     <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
//       <div className="flex items-center gap-3 mb-6">
//         <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center">
//           <Globe className="w-5 h-5" />
//         </div>
//         <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
//           SEO Meta Data
//         </h2>
//       </div>

//       <div className="space-y-4 max-w-2xl">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Page Title
//           </label>
//           <input
//             value={data.metaData?.title || ""}
//             onChange={(e) =>
//               setData({
//                 ...data,
//                 metaData: { ...data.metaData, title: e.target.value },
//               })
//             }
//             placeholder="Contact Us"
//             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
//           />
//           <p className="text-xs text-gray-500 mt-1">
//             Recommended: 50-60 characters
//           </p>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Meta Description
//           </label>
//           <textarea
//             value={data.metaData?.description || ""}
//             onChange={(e) =>
//               setData({
//                 ...data,
//                 metaData: { ...data.metaData, description: e.target.value },
//               })
//             }
//             placeholder="Get in touch with our team"
//             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
//             rows={3}
//           />
//           <p className="text-xs text-gray-500 mt-1">
//             Recommended: 150-160 characters
//           </p>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Keywords (comma separated)
//           </label>
//           <input
//             value={data.metaData?.keywords?.join(", ") || ""}
//             onChange={(e) =>
//               setData({
//                 ...data,
//                 metaData: {
//                   ...data.metaData,
//                   keywords: e.target.value
//                     .split(",")
//                     .map((k) => k.trim())
//                     .filter((k) => k),
//                 },
//               })
//             }
//             placeholder="contact, support, help, customer service"
//             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
//           />
//         </div>
//       </div>
//     </div>

//     {/* Import/Export */}
//     <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
//       <div className="flex items-center gap-3 mb-6">
//         <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-500 to-gray-600 text-white flex items-center justify-center">
//           <Settings className="w-5 h-5" />
//         </div>
//         <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
//           Import / Export
//         </h2>
//       </div>

//       <div className="flex flex-wrap gap-4">
//         <button
//           onClick={() => {
//             const dataStr = JSON.stringify(data, null, 2);
//             const blob = new Blob([dataStr], { type: "application/json" });
//             const url = window.URL.createObjectURL(blob);
//             const a = document.createElement("a");
//             a.href = url;
//             a.download = "contact-settings-backup.json";
//             a.click();
//           }}
//           className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
//         >
//           <Download className="w-4 h-4" />
//           Export Settings
//         </button>

//         <button
//           onClick={() => {
//             const input = document.createElement("input");
//             input.type = "file";
//             input.accept = ".json";
//             input.onchange = (e) => {
//               const file = (e.target as HTMLInputElement).files?.[0];
//               if (file) {
//                 const reader = new FileReader();
//                 reader.onload = (e) => {
//                   try {
//                     const imported = JSON.parse(e.target?.result as string);
//                     setData(imported);
//                     alert("✅ Settings imported successfully!");
//                   } catch {
//                     alert("❌ Invalid JSON file");
//                   }
//                 };
//                 reader.readAsText(file);
//               }
//             };
//             input.click();
//           }}
//           className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
//         >
//           <Upload className="w-4 h-4" />
//           Import Settings
//         </button>
//       </div>
//     </div>
//   </div>
// );

// // Empty State Component
// const EmptyState = ({
//   icon: Icon,
//   title,
//   message,
//   action,
//   actionLabel,
// }: any) => (
//   <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-xl">
//     <Icon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//     <h3 className="text-xl font-semibold text-gray-700 mb-2">{title}</h3>
//     <p className="text-gray-500 mb-4">{message}</p>
//     <button
//       onClick={action}
//       className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
//     >
//       <Plus className="w-5 h-5" />
//       {actionLabel}
//     </button>
//   </div>
// );

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

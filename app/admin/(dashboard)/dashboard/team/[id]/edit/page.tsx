// // "use client";

// // import { useCallback, useEffect, useState } from "react";
// // import { useParams, useRouter } from "next/navigation";
// // import { motion } from "framer-motion";
// // import {
// //   ArrowLeft,
// //   Save,
// //   Upload,
// //   User,
// //   Briefcase,
// //   FileText,
// //   Link,
// //   Mail,
// //   Award,
// //   BarChart3,
// //   Users,
// //   RefreshCw,
// //   CheckCircle,
// //   XCircle,
// //   Image as ImageIcon,
// //   Globe,
// //   Sparkles,
// //   Trash2,
// //   Plus,
// //   Eye,
// // } from "lucide-react";
// // import NextImage from "next/image";

// // export default function EditTeamMemberPage() {
// //   const { id } = useParams();
// //   const router = useRouter();

// //   const [loading, setLoading] = useState(true);
// //   const [saving, setSaving] = useState(false);
// //   const [success, setSuccess] = useState(false);
// //   const [error, setError] = useState("");
// //   const [form, setForm] = useState<any>({
// //     name: "",
// //     position: "",
// //     bio: "",
// //     image: "",
// //     expertise: "",
// //     featured: false,
// //     linkedin: "",
// //     twitter: "",
// //     email: "",
// //     stats: [
// //       { label: "", value: "" },
// //       { label: "", value: "" },
// //     ],
// //   });

// //   const fetchMemberData = useCallback(async () => {
// //     try {
// //       setLoading(true);
// //       const res = await fetch(`/api/team/${id}`);
// //       if (!res.ok) throw new Error("Failed to fetch member data");

// //       const data = await res.json();

// //       setForm({
// //         ...data,
// //         expertise: data.expertise?.join(", ") || "",
// //         linkedin: data.social?.linkedin || "",
// //         twitter: data.social?.twitter || "",
// //         email: data.social?.email || "",
// //         stats: data.stats || [
// //           { label: "", value: "" },
// //           { label: "", value: "" },
// //         ],
// //       });
// //     } catch (err) {
// //       setError("Failed to load team member data");
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [id]);

// //   useEffect(() => {
// //     fetchMemberData();
// //   }, [fetchMemberData]);

// //   const handleChange = (e: any) => {
// //     const { name, value, type, checked } = e.target;
// //     setForm({ ...form, [name]: type === "checkbox" ? checked : value });
// //     // Clear any previous success/error states
// //     if (success || error) {
// //       setSuccess(false);
// //       setError("");
// //     }
// //   };

// //   const handleStatChange = (index: number, field: string, value: string) => {
// //     const updatedStats = [...form.stats];
// //     updatedStats[index][field] = value;
// //     setForm({ ...form, stats: updatedStats });
// //     if (success || error) {
// //       setSuccess(false);
// //       setError("");
// //     }
// //   };

// //   const addStat = () => {
// //     if (form.stats.length < 4) {
// //       setForm({
// //         ...form,
// //         stats: [...form.stats, { label: "", value: "" }],
// //       });
// //     }
// //   };

// //   const removeStat = (index: number) => {
// //     if (form.stats.length > 1) {
// //       const updatedStats = form.stats.filter(
// //         (_: any, i: number) => i !== index,
// //       );
// //       setForm({ ...form, stats: updatedStats });
// //     }
// //   };

// //   const handleSubmit = async (e: any) => {
// //     e.preventDefault();
// //     setSaving(true);
// //     setError("");

// //     const payload = {
// //       name: form.name,
// //       position: form.position,
// //       bio: form.bio,
// //       image: form.image,
// //       featured: form.featured,
// //       expertise: form.expertise
// //         .split(",")
// //         .map((e: string) => e.trim())
// //         .filter(Boolean),
// //       social: {
// //         linkedin: form.linkedin,
// //         twitter: form.twitter,
// //         email: form.email,
// //       },
// //       stats: form.stats.filter(
// //         (stat: any) => stat.label.trim() || stat.value.trim(),
// //       ),
// //     };

// //     try {
// //       const res = await fetch(`/api/team/${id}`, {
// //         method: "PUT",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(payload),
// //       });

// //       if (res.ok) {
// //         setSuccess(true);
// //         setTimeout(() => {
// //           router.push("/admin/dashboard/team");
// //         }, 1500);
// //       } else {
// //         throw new Error("Update failed");
// //       }
// //     } catch (err) {
// //       setError("Failed to update team member. Please try again.");
// //     } finally {
// //       setSaving(false);
// //     }
// //   };

// //   const inputClasses =
// //     "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-gray-800 placeholder-gray-500";
// //   const labelClasses = "block text-sm font-medium text-gray-700 mb-2";

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
// //         <div className="max-w-4xl mx-auto">
// //           <div className="flex items-center justify-center min-h-[60vh]">
// //             <div className="text-center">
// //               <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
// //               <p className="text-gray-600 text-lg">
// //                 Loading team member data...
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <motion.div
// //       initial={{ opacity: 0, y: 20 }}
// //       animate={{ opacity: 1, y: 0 }}
// //       transition={{ duration: 0.4 }}
// //       className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8"
// //     >
// //       <div className="max-w-5xl mx-auto">
// //         {/* Header */}
// //         <div className="mb-8">
// //           <button
// //             onClick={() => router.push("/dashboard/team")}
// //             className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
// //           >
// //             <ArrowLeft className="w-5 h-5" />
// //             Back to Team
// //           </button>

// //           <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
// //             <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 md:p-8 text-white">
// //               <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
// //                 <div>
// //                   <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
// //                     <Users className="w-8 h-8 text-blue-500" />
// //                     Edit Team Member
// //                   </h1>
// //                   <p className="text-blue-100 mt-2">
// //                     Update the details for {form.name || "this team member"}
// //                   </p>
// //                 </div>

// //                 <div className="flex items-center gap-4">
// //                   <button
// //                     onClick={fetchMemberData}
// //                     className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
// //                   >
// //                     <RefreshCw className="w-4 h-4" />
// //                     Refresh
// //                   </button>

// //                   {form.featured && (
// //                     <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg font-medium">
// //                       <Sparkles className="w-4 h-4" />
// //                       Featured
// //                     </span>
// //                   )}
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Form */}
// //             <form onSubmit={handleSubmit} className="p-6 md:p-8">
// //               <div className="space-y-8">
// //                 {/* Status Messages */}
// //                 {success && (
// //                   <motion.div
// //                     initial={{ opacity: 0, y: -10 }}
// //                     animate={{ opacity: 1, y: 0 }}
// //                     className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3"
// //                   >
// //                     <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
// //                     <div>
// //                       <p className="text-green-800 font-medium">
// //                         Team member updated successfully!
// //                       </p>
// //                       <p className="text-green-600 text-sm">
// //                         Redirecting to team dashboard...
// //                       </p>
// //                     </div>
// //                   </motion.div>
// //                 )}

// //                 {error && (
// //                   <motion.div
// //                     initial={{ opacity: 0, y: -10 }}
// //                     animate={{ opacity: 1, y: 0 }}
// //                     className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3"
// //                   >
// //                     <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
// //                     <div>
// //                       <p className="text-red-800 font-medium">Update failed</p>
// //                       <p className="text-red-600 text-sm">{error}</p>
// //                     </div>
// //                   </motion.div>
// //                 )}

// //                 {/* Basic Information */}
// //                 <div>
// //                   <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
// //                     <User className="w-6 h-6 text-blue-600" />
// //                     <h2 className="text-xl font-bold text-gray-800">
// //                       Basic Information
// //                     </h2>
// //                   </div>

// //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                     <div>
// //                       <label htmlFor="name" className={labelClasses}>
// //                         Full Name
// //                       </label>
// //                       <input
// //                         id="name"
// //                         name="name"
// //                         value={form.name}
// //                         onChange={handleChange}
// //                         placeholder="John Doe"
// //                         className={inputClasses}
// //                         required
// //                       />
// //                     </div>

// //                     <div>
// //                       <label htmlFor="position" className={labelClasses}>
// //                         Position / Role
// //                       </label>
// //                       <input
// //                         id="position"
// //                         name="position"
// //                         value={form.position}
// //                         onChange={handleChange}
// //                         placeholder="Senior Developer"
// //                         className={inputClasses}
// //                         required
// //                       />
// //                     </div>

// //                     <div className="md:col-span-2">
// //                       <label htmlFor="bio" className={labelClasses}>
// //                         Bio / Description
// //                       </label>
// //                       <textarea
// //                         id="bio"
// //                         name="bio"
// //                         value={form.bio}
// //                         onChange={handleChange}
// //                         placeholder="Brief description about the team member..."
// //                         className={`${inputClasses} min-h-[120px] resize-vertical`}
// //                         rows={4}
// //                       />
// //                       <p className="text-xs text-gray-500 mt-2">
// //                         {form.bio.length}/500 characters
// //                       </p>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Profile Image & Expertise */}
// //                 <div>
// //                   <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
// //                     <ImageIcon className="w-6 h-6 text-blue-600" />
// //                     <h2 className="text-xl font-bold text-gray-800">
// //                       Profile & Expertise
// //                     </h2>
// //                   </div>

// //                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
// //                     {/* Image Section */}
// //                     <div>
// //                       <label htmlFor="image" className={labelClasses}>
// //                         Profile Image URL
// //                       </label>
// //                       <div className="flex gap-4">
// //                         <input
// //                           id="image"
// //                           name="image"
// //                           value={form.image}
// //                           onChange={handleChange}
// //                           placeholder="https://example.com/profile.jpg"
// //                           className={inputClasses}
// //                         />
// //                         <button
// //                           type="button"
// //                           onClick={() => {
// //                             const url = prompt("Enter image URL:");
// //                             if (url) setForm({ ...form, image: url });
// //                           }}
// //                           className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
// //                         >
// //                           <Upload className="w-5 h-5" />
// //                         </button>
// //                       </div>

// //                       <div className="mt-6">
// //                         <p className="text-sm font-medium text-gray-700 mb-3">
// //                           Image Preview
// //                         </p>
// //                         <div className="flex items-center gap-6">
// //                           <div className="w-32 h-32 rounded-xl overflow-hidden border-2 border-gray-300 bg-gradient-to-br from-gray-100 to-gray-200">
// //                             {form.image ? (
// //                               <NextImage
// //                                 src={form.image}
// //                                 alt="Preview"
// //                                 layout="fill"
// //                                 objectFit="cover"
// //                                 onError={(e) => {
// //                                   e.currentTarget.src =
// //                                     "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E";
// //                                 }}
// //                               />
// //                             ) : (
// //                               <div className="w-full h-full flex items-center justify-center">
// //                                 <Award className="w-12 h-12 text-gray-400" />
// //                               </div>
// //                             )}
// //                           </div>
// //                           <div className="flex-1">
// //                             <p className="text-sm text-gray-600">
// //                               {form.image
// //                                 ? "Image will be displayed on the team page"
// //                                 : "No image set. A placeholder avatar will be used."}
// //                             </p>
// //                           </div>
// //                         </div>
// //                       </div>
// //                     </div>

// //                     {/* Expertise Section */}
// //                     <div>
// //                       <label htmlFor="expertise" className={labelClasses}>
// //                         Areas of Expertise
// //                       </label>
// //                       <input
// //                         id="expertise"
// //                         name="expertise"
// //                         value={form.expertise}
// //                         onChange={handleChange}
// //                         placeholder="React, TypeScript, UI/UX Design, Project Management"
// //                         className={inputClasses}
// //                       />
// //                       <p className="text-xs text-gray-500 mt-2">
// //                         Separate multiple skills with commas
// //                       </p>

// //                       {/* Skills Preview */}
// //                       {form.expertise && (
// //                         <div className="mt-6">
// //                           <p className="text-sm font-medium text-gray-700 mb-2">
// //                             Skills Preview
// //                           </p>
// //                           <div className="flex flex-wrap gap-2">
// //                             {form.expertise.split(",").map(
// //                               (skill: string, index: number) =>
// //                                 skill.trim() && (
// //                                   <span
// //                                     key={index}
// //                                     className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
// //                                   >
// //                                     {skill.trim()}
// //                                   </span>
// //                                 ),
// //                             )}
// //                           </div>
// //                         </div>
// //                       )}

// //                       {/* Featured Toggle */}
// //                       <div className="mt-8">
// //                         <label className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
// //                           <div className="flex items-center gap-3">
// //                             <div
// //                               className={`w-6 h-6 rounded border flex items-center justify-center ${
// //                                 form.featured
// //                                   ? "bg-gradient-to-r from-amber-500 to-orange-500 border-transparent"
// //                                   : "border-gray-400"
// //                               }`}
// //                             >
// //                               {form.featured && (
// //                                 <Sparkles className="w-4 h-4 text-white" />
// //                               )}
// //                             </div>
// //                             <div>
// //                               <p className="font-medium text-gray-800">
// //                                 Featured Team Member
// //                               </p>
// //                               <p className="text-sm text-gray-600">
// //                                 Highlight this member on the team page
// //                               </p>
// //                             </div>
// //                           </div>
// //                           <input
// //                             type="checkbox"
// //                             name="featured"
// //                             checked={form.featured}
// //                             onChange={handleChange}
// //                             className="hidden"
// //                           />
// //                         </label>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Contact & Social Links */}
// //                 <div>
// //                   <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
// //                     <Link className="w-6 h-6 text-blue-600" />
// //                     <h2 className="text-xl font-bold text-gray-800">
// //                       Contact & Social Links
// //                     </h2>
// //                   </div>

// //                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //                     <div>
// //                       <label htmlFor="email" className={labelClasses}>
// //                         <Mail className="w-4 h-4 inline mr-2" />
// //                         Email Address
// //                       </label>
// //                       <input
// //                         id="email"
// //                         name="email"
// //                         type="email"
// //                         value={form.email}
// //                         onChange={handleChange}
// //                         placeholder="john.doe@company.com"
// //                         className={inputClasses}
// //                       />
// //                     </div>

// //                     <div>
// //                       <label htmlFor="linkedin" className={labelClasses}>
// //                         <div className="inline-flex items-center gap-2">
// //                           <div className="w-5 h-5 bg-blue-700 text-white rounded flex items-center justify-center text-xs font-bold">
// //                             in
// //                           </div>
// //                           LinkedIn
// //                         </div>
// //                       </label>
// //                       <input
// //                         id="linkedin"
// //                         name="linkedin"
// //                         value={form.linkedin}
// //                         onChange={handleChange}
// //                         placeholder="https://linkedin.com/in/johndoe"
// //                         className={inputClasses}
// //                       />
// //                     </div>

// //                     <div>
// //                       <label htmlFor="twitter" className={labelClasses}>
// //                         <div className="inline-flex items-center gap-2">
// //                           <div className="w-5 h-5 bg-blue-400 text-white rounded flex items-center justify-center text-xs font-bold">
// //                             𝕏
// //                           </div>
// //                           Twitter / X
// //                         </div>
// //                       </label>
// //                       <input
// //                         id="twitter"
// //                         name="twitter"
// //                         value={form.twitter}
// //                         onChange={handleChange}
// //                         placeholder="https://twitter.com/johndoe"
// //                         className={inputClasses}
// //                       />
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Statistics Section */}
// //                 <div>
// //                   <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
// //                     <div className="flex items-center gap-3">
// //                       <BarChart3 className="w-6 h-6 text-blue-600" />
// //                       <h2 className="text-xl font-bold text-gray-800">
// //                         Key Statistics
// //                       </h2>
// //                     </div>
// //                     {form.stats.length < 4 && (
// //                       <button
// //                         type="button"
// //                         onClick={addStat}
// //                         className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
// //                       >
// //                         <Plus className="w-4 h-4" />
// //                         Add Stat
// //                       </button>
// //                     )}
// //                   </div>

// //                   <div className="space-y-6">
// //                     {form.stats.map((stat: any, index: number) => (
// //                       <motion.div
// //                         key={index}
// //                         initial={{ opacity: 0, y: 10 }}
// //                         animate={{ opacity: 1, y: 0 }}
// //                         className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200"
// //                       >
// //                         <div className="flex items-center justify-between mb-4">
// //                           <h3 className="font-medium text-gray-800">
// //                             Statistic {index + 1}
// //                           </h3>
// //                           {form.stats.length > 1 && (
// //                             <button
// //                               type="button"
// //                               onClick={() => removeStat(index)}
// //                               className="p-1 hover:bg-red-50 rounded text-red-500 hover:text-red-700"
// //                             >
// //                               <Trash2 className="w-4 h-4" />
// //                             </button>
// //                           )}
// //                         </div>

// //                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                           <div>
// //                             <label className="text-sm font-medium text-gray-700 block mb-2">
// //                               Label
// //                             </label>
// //                             <input
// //                               value={stat.label}
// //                               onChange={(e) =>
// //                                 handleStatChange(index, "label", e.target.value)
// //                               }
// //                               placeholder="Projects Completed"
// //                               className={inputClasses}
// //                             />
// //                           </div>
// //                           <div>
// //                             <label className="text-sm font-medium text-gray-700 block mb-2">
// //                               Value
// //                             </label>
// //                             <input
// //                               value={stat.value}
// //                               onChange={(e) =>
// //                                 handleStatChange(index, "value", e.target.value)
// //                               }
// //                               placeholder="150+"
// //                               className={inputClasses}
// //                             />
// //                           </div>
// //                         </div>
// //                       </motion.div>
// //                     ))}
// //                   </div>
// //                 </div>

// //                 {/* Action Buttons */}
// //                 <div className="pt-6 border-t border-gray-200">
// //                   <div className="flex flex-col-reverse sm:flex-row gap-4 justify-between">
// //                     <div className="flex gap-4">
// //                       <button
// //                         type="button"
// //                         onClick={() => router.push("/dashboard/team")}
// //                         className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
// //                       >
// //                         Cancel
// //                       </button>
// //                       <button
// //                         type="button"
// //                         onClick={() => {
// //                           if (
// //                             confirm(
// //                               "Are you sure you want to reset all changes?",
// //                             )
// //                           ) {
// //                             fetchMemberData();
// //                           }
// //                         }}
// //                         className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
// //                       >
// //                         Reset Changes
// //                       </button>
// //                     </div>

// //                     <button
// //                       type="submit"
// //                       disabled={saving}
// //                       className={`px-8 py-3 rounded-lg font-medium text-white flex items-center justify-center gap-3 transition-all ${
// //                         saving
// //                           ? "bg-blue-400 cursor-not-allowed"
// //                           : "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-lg hover:shadow-xl"
// //                       }`}
// //                     >
// //                       {saving ? (
// //                         <>
// //                           <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
// //                           Updating...
// //                         </>
// //                       ) : (
// //                         <>
// //                           <Save className="w-5 h-5" />
// //                           Update Team Member
// //                         </>
// //                       )}
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //             </form>
// //           </div>
// //         </div>

// //         {/* Preview Card */}
// //         <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
// //           <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
// //             <Eye className="w-5 h-5 text-blue-600" />
// //             Live Preview
// //           </h3>
// //           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// //             <div className="lg:col-span-2">
// //               <div className="flex items-start gap-4">
// //                 <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-2xl">
// //                   {form.name ? form.name.charAt(0).toUpperCase() : "?"}
// //                 </div>
// //                 <div>
// //                   <h4 className="font-bold text-xl text-gray-800">
// //                     {form.name || "Team Member Name"}
// //                   </h4>
// //                   <p className="text-blue-600 font-medium">
// //                     {form.position || "Position"}
// //                   </p>
// //                   <p className="text-gray-600 mt-2 text-sm">
// //                     {form.bio || "Bio will appear here"}
// //                   </p>
// //                 </div>
// //               </div>

// //               {form.expertise && (
// //                 <div className="mt-6">
// //                   <p className="text-sm font-medium text-gray-700 mb-2">
// //                     Expertise:
// //                   </p>
// //                   <div className="flex flex-wrap gap-2">
// //                     {form.expertise.split(",").map(
// //                       (skill: string, index: number) =>
// //                         skill.trim() && (
// //                           <span
// //                             key={index}
// //                             className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
// //                           >
// //                             {skill.trim()}
// //                           </span>
// //                         ),
// //                     )}
// //                   </div>
// //                 </div>
// //               )}
// //             </div>

// //             <div className="bg-gray-50 p-5 rounded-xl">
// //               <h5 className="font-medium text-gray-700 mb-4">Key Stats</h5>
// //               <div className="space-y-4">
// //                 {form.stats
// //                   .filter((stat: any) => stat.label || stat.value)
// //                   .map((stat: any, index: number) => (
// //                     <div
// //                       key={index}
// //                       className="bg-white p-3 rounded-lg border border-gray-200"
// //                     >
// //                       <p className="text-sm text-gray-600">
// //                         {stat.label || "Stat Label"}
// //                       </p>
// //                       <p className="text-xl font-bold text-gray-800">
// //                         {stat.value || "Value"}
// //                       </p>
// //                     </div>
// //                   ))}
// //                 {form.stats.filter((stat: any) => stat.label || stat.value)
// //                   .length === 0 && (
// //                   <p className="text-gray-500 text-sm text-center py-4">
// //                     No stats added yet
// //                   </p>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </motion.div>
// //   );
// // }

// "use client";

// import { useCallback, useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import {
//   ArrowLeft,
//   Save,
//   Upload,
//   User,
//   Briefcase,
//   FileText,
//   Link as LinkIcon,
//   Mail,
//   Award,
//   BarChart3,
//   Users,
//   RefreshCw,
//   CheckCircle,
//   XCircle,
//   Image as ImageIcon,
//   Sparkles,
//   Trash2,
//   Plus,
//   Eye,
// } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";

// interface TeamMember {
//   _id: string;
//   name: string;
//   position: string;
//   bio: string;
//   image: string;
//   expertise: string[];
//   featured: boolean;
//   social: {
//     linkedin?: string;
//     twitter?: string;
//     email?: string;
//   };
//   stats: Array<{ label: string; value: string }>;
//   createdAt: string;
//   updatedAt: string;
// }

// export default function EditTeamMemberPage() {
//   const { id } = useParams();
//   const router = useRouter();

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState("");
//   const [imageError, setImageError] = useState(false);

//   const [form, setForm] = useState({
//     name: "",
//     position: "",
//     bio: "",
//     image: "",
//     expertise: "",
//     featured: false,
//     linkedin: "",
//     twitter: "",
//     email: "",
//     stats: [
//       { label: "", value: "" },
//       { label: "", value: "" },
//     ],
//   });

//   const fetchMemberData = useCallback(async () => {
//     try {
//       setLoading(true);
//       const res = await fetch(`/api/team/${id}`);
//       if (!res.ok) throw new Error("Failed to fetch member data");

//       const data: TeamMember = await res.json();

//       setForm({
//         name: data.name || "",
//         position: data.position || "",
//         bio: data.bio || "",
//         image: data.image || "",
//         expertise: data.expertise?.join(", ") || "",
//         featured: data.featured || false,
//         linkedin: data.social?.linkedin || "",
//         twitter: data.social?.twitter || "",
//         email: data.social?.email || "",
//         stats: data.stats?.length
//           ? data.stats
//           : [
//               { label: "", value: "" },
//               { label: "", value: "" },
//             ],
//       });
//       setImageError(false);
//     } catch (err) {
//       setError("Failed to load team member data");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }, [id]);

//   useEffect(() => {
//     if (id) {
//       fetchMemberData();
//     }
//   }, [id, fetchMemberData]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//   ) => {
//     const { name, value, type } = e.target;
//     const checked =
//       type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

//     setForm((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));

//     // Clear messages on change
//     if (success || error) {
//       setSuccess(false);
//       setError("");
//     }
//   };

//   const handleStatChange = (
//     index: number,
//     field: "label" | "value",
//     value: string,
//   ) => {
//     const updatedStats = [...form.stats];
//     updatedStats[index][field] = value;
//     setForm((prev) => ({ ...prev, stats: updatedStats }));

//     if (success || error) {
//       setSuccess(false);
//       setError("");
//     }
//   };

//   const addStat = () => {
//     if (form.stats.length < 4) {
//       setForm((prev) => ({
//         ...prev,
//         stats: [...prev.stats, { label: "", value: "" }],
//       }));
//     }
//   };

//   const removeStat = (index: number) => {
//     if (form.stats.length > 1) {
//       const updatedStats = form.stats.filter((_, i) => i !== index);
//       setForm((prev) => ({ ...prev, stats: updatedStats }));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setSaving(true);
//     setError("");
//     setSuccess(false);

//     const payload = {
//       name: form.name,
//       position: form.position,
//       bio: form.bio,
//       image: form.image,
//       featured: form.featured,
//       expertise: form.expertise
//         .split(",")
//         .map((e: string) => e.trim())
//         .filter(Boolean),
//       social: {
//         linkedin: form.linkedin,
//         twitter: form.twitter,
//         email: form.email,
//       },
//       stats: form.stats.filter(
//         (stat) => stat.label.trim() || stat.value.trim(),
//       ),
//     };

//     try {
//       const res = await fetch(`/api/team/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.error || "Update failed");
//       }

//       setSuccess(true);

//       // Refresh the data
//       await fetchMemberData();

//       // Redirect after 2 seconds
//       setTimeout(() => {
//         router.push("/admin/dashboard/team");
//         router.refresh();
//       }, 2000);
//     } catch (err: any) {
//       setError(
//         err.message || "Failed to update team member. Please try again.",
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   const inputClasses =
//     "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-gray-800 placeholder-gray-500";
//   const labelClasses = "block text-sm font-medium text-gray-700 mb-2";

//   // Image preview component with error handling
//   const ImagePreview = () => {
//     if (!form.image || imageError) {
//       return (
//         <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
//           <Award className="w-12 h-12 text-gray-400" />
//         </div>
//       );
//     }

//     return (
//       <Image
//         src={form.image}
//         alt={form.name || "Profile preview"}
//         fill
//         className="object-cover"
//         onError={() => setImageError(true)}
//         sizes="(max-width: 128px) 100vw, 128px"
//       />
//     );
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
//         <div className="max-w-4xl mx-auto">
//           <div className="flex items-center justify-center min-h-[60vh]">
//             <div className="text-center">
//               <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
//               <p className="text-gray-600 text-lg">
//                 Loading team member data...
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4 }}
//       className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8"
//     >
//       <div className="max-w-5xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <Link
//             href="/admin/dashboard/team"
//             className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
//           >
//             <ArrowLeft className="w-5 h-5" />
//             Back to Team
//           </Link>

//           <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
//             <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 md:p-8 text-white">
//               <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
//                 <div>
//                   <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
//                     <Users className="w-8 h-8 text-blue-500" />
//                     Edit Team Member
//                   </h1>
//                   <p className="text-blue-100 mt-2">
//                     Update the details for {form.name || "this team member"}
//                   </p>
//                 </div>

//                 <div className="flex items-center gap-4">
//                   <button
//                     onClick={fetchMemberData}
//                     type="button"
//                     className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
//                   >
//                     <RefreshCw className="w-4 h-4" />
//                     Refresh
//                   </button>

//                   {form.featured && (
//                     <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg font-medium">
//                       <Sparkles className="w-4 h-4" />
//                       Featured
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Form */}
//             <form onSubmit={handleSubmit} className="p-6 md:p-8">
//               <div className="space-y-8">
//                 {/* Status Messages */}
//                 {success && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3"
//                   >
//                     <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
//                     <div>
//                       <p className="text-green-800 font-medium">
//                         Team member updated successfully!
//                       </p>
//                       <p className="text-green-600 text-sm">
//                         Redirecting to team dashboard...
//                       </p>
//                     </div>
//                   </motion.div>
//                 )}

//                 {error && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3"
//                   >
//                     <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
//                     <div>
//                       <p className="text-red-800 font-medium">Update failed</p>
//                       <p className="text-red-600 text-sm">{error}</p>
//                     </div>
//                   </motion.div>
//                 )}

//                 {/* Basic Information */}
//                 <div>
//                   <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
//                     <User className="w-6 h-6 text-blue-600" />
//                     <h2 className="text-xl font-bold text-gray-800">
//                       Basic Information
//                     </h2>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <label htmlFor="name" className={labelClasses}>
//                         Full Name <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         id="name"
//                         name="name"
//                         value={form.name}
//                         onChange={handleChange}
//                         placeholder="John Doe"
//                         className={inputClasses}
//                         required
//                       />
//                     </div>

//                     <div>
//                       <label htmlFor="position" className={labelClasses}>
//                         Position / Role <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         id="position"
//                         name="position"
//                         value={form.position}
//                         onChange={handleChange}
//                         placeholder="Senior Developer"
//                         className={inputClasses}
//                         required
//                       />
//                     </div>

//                     <div className="md:col-span-2">
//                       <label htmlFor="bio" className={labelClasses}>
//                         Bio / Description
//                       </label>
//                       <textarea
//                         id="bio"
//                         name="bio"
//                         value={form.bio}
//                         onChange={handleChange}
//                         placeholder="Brief description about the team member..."
//                         className={`${inputClasses} min-h-[120px] resize-y`}
//                         rows={4}
//                       />
//                       <p className="text-xs text-gray-500 mt-2">
//                         {form.bio.length}/500 characters
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Profile Image & Expertise */}
//                 <div>
//                   <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
//                     <ImageIcon className="w-6 h-6 text-blue-600" />
//                     <h2 className="text-xl font-bold text-gray-800">
//                       Profile & Expertise
//                     </h2>
//                   </div>

//                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                     {/* Image Section */}
//                     <div>
//                       <label htmlFor="image" className={labelClasses}>
//                         Profile Image URL
//                       </label>
//                       <div className="flex gap-4">
//                         <input
//                           id="image"
//                           name="image"
//                           value={form.image}
//                           onChange={handleChange}
//                           placeholder="https://example.com/profile.jpg"
//                           className={inputClasses}
//                         />
//                         <button
//                           type="button"
//                           onClick={() => {
//                             const url = prompt("Enter image URL:");
//                             if (url) {
//                               setForm((prev) => ({ ...prev, image: url }));
//                               setImageError(false);
//                             }
//                           }}
//                           className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//                         >
//                           <Upload className="w-5 h-5" />
//                         </button>
//                       </div>

//                       <div className="mt-6">
//                         <p className="text-sm font-medium text-gray-700 mb-3">
//                           Image Preview
//                         </p>
//                         <div className="flex items-center gap-6">
//                           <div className="relative w-32 h-32 rounded-xl overflow-hidden border-2 border-gray-300 bg-gradient-to-br from-gray-100 to-gray-200">
//                             <ImagePreview />
//                           </div>
//                           <div className="flex-1">
//                             <p className="text-sm text-gray-600">
//                               {form.image && !imageError
//                                 ? "Image will be displayed on the team page"
//                                 : imageError
//                                   ? "Failed to load image. Please check the URL."
//                                   : "No image set. A placeholder avatar will be used."}
//                             </p>
//                             {form.image && imageError && (
//                               <button
//                                 type="button"
//                                 onClick={() => setImageError(false)}
//                                 className="mt-2 text-sm text-blue-600 hover:text-blue-800"
//                               >
//                                 Try again
//                               </button>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Expertise Section */}
//                     <div>
//                       <label htmlFor="expertise" className={labelClasses}>
//                         Areas of Expertise
//                       </label>
//                       <input
//                         id="expertise"
//                         name="expertise"
//                         value={form.expertise}
//                         onChange={handleChange}
//                         placeholder="React, TypeScript, UI/UX Design, Project Management"
//                         className={inputClasses}
//                       />
//                       <p className="text-xs text-gray-500 mt-2">
//                         Separate multiple skills with commas
//                       </p>

//                       {/* Skills Preview */}
//                       {form.expertise && (
//                         <div className="mt-6">
//                           <p className="text-sm font-medium text-gray-700 mb-2">
//                             Skills Preview
//                           </p>
//                           <div className="flex flex-wrap gap-2">
//                             {form.expertise.split(",").map(
//                               (skill: string, index: number) =>
//                                 skill.trim() && (
//                                   <span
//                                     key={index}
//                                     className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
//                                   >
//                                     {skill.trim()}
//                                   </span>
//                                 ),
//                             )}
//                           </div>
//                         </div>
//                       )}

//                       {/* Featured Toggle */}
//                       <div className="mt-8">
//                         <label className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
//                           <div className="flex items-center gap-3">
//                             <div
//                               className={`w-6 h-6 rounded border flex items-center justify-center ${
//                                 form.featured
//                                   ? "bg-gradient-to-r from-amber-500 to-orange-500 border-transparent"
//                                   : "border-gray-400"
//                               }`}
//                             >
//                               {form.featured && (
//                                 <Sparkles className="w-4 h-4 text-white" />
//                               )}
//                             </div>
//                             <div>
//                               <p className="font-medium text-gray-800">
//                                 Featured Team Member
//                               </p>
//                               <p className="text-sm text-gray-600">
//                                 Highlight this member on the team page
//                               </p>
//                             </div>
//                           </div>
//                           <input
//                             type="checkbox"
//                             name="featured"
//                             checked={form.featured}
//                             onChange={handleChange}
//                             className="hidden"
//                           />
//                         </label>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Contact & Social Links */}
//                 <div>
//                   <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
//                     <LinkIcon className="w-6 h-6 text-blue-600" />
//                     <h2 className="text-xl font-bold text-gray-800">
//                       Contact & Social Links
//                     </h2>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                     <div>
//                       <label htmlFor="email" className={labelClasses}>
//                         <Mail className="w-4 h-4 inline mr-2" />
//                         Email Address
//                       </label>
//                       <input
//                         id="email"
//                         name="email"
//                         type="email"
//                         value={form.email}
//                         onChange={handleChange}
//                         placeholder="john.doe@company.com"
//                         className={inputClasses}
//                       />
//                     </div>

//                     <div>
//                       <label htmlFor="linkedin" className={labelClasses}>
//                         <div className="inline-flex items-center gap-2">
//                           <div className="w-5 h-5 bg-blue-700 text-white rounded flex items-center justify-center text-xs font-bold">
//                             in
//                           </div>
//                           LinkedIn
//                         </div>
//                       </label>
//                       <input
//                         id="linkedin"
//                         name="linkedin"
//                         value={form.linkedin}
//                         onChange={handleChange}
//                         placeholder="https://linkedin.com/in/johndoe"
//                         className={inputClasses}
//                       />
//                     </div>

//                     <div>
//                       <label htmlFor="twitter" className={labelClasses}>
//                         <div className="inline-flex items-center gap-2">
//                           <div className="w-5 h-5 bg-blue-400 text-white rounded flex items-center justify-center text-xs font-bold">
//                             𝕏
//                           </div>
//                           Twitter / X
//                         </div>
//                       </label>
//                       <input
//                         id="twitter"
//                         name="twitter"
//                         value={form.twitter}
//                         onChange={handleChange}
//                         placeholder="https://twitter.com/johndoe"
//                         className={inputClasses}
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Statistics Section */}
//                 <div>
//                   <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
//                     <div className="flex items-center gap-3">
//                       <BarChart3 className="w-6 h-6 text-blue-600" />
//                       <h2 className="text-xl font-bold text-gray-800">
//                         Key Statistics
//                       </h2>
//                     </div>
//                     {form.stats.length < 4 && (
//                       <button
//                         type="button"
//                         onClick={addStat}
//                         className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
//                       >
//                         <Plus className="w-4 h-4" />
//                         Add Stat
//                       </button>
//                     )}
//                   </div>

//                   <div className="space-y-6">
//                     {form.stats.map((stat: any, index: number) => (
//                       <motion.div
//                         key={index}
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200"
//                       >
//                         <div className="flex items-center justify-between mb-4">
//                           <h3 className="font-medium text-gray-800">
//                             Statistic {index + 1}
//                           </h3>
//                           {form.stats.length > 1 && (
//                             <button
//                               type="button"
//                               onClick={() => removeStat(index)}
//                               className="p-1 hover:bg-red-50 rounded text-red-500 hover:text-red-700"
//                             >
//                               <Trash2 className="w-4 h-4" />
//                             </button>
//                           )}
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           <div>
//                             <label className="text-sm font-medium text-gray-700 block mb-2">
//                               Label
//                             </label>
//                             <input
//                               value={stat.label}
//                               onChange={(e) =>
//                                 handleStatChange(index, "label", e.target.value)
//                               }
//                               placeholder="Projects Completed"
//                               className={inputClasses}
//                             />
//                           </div>
//                           <div>
//                             <label className="text-sm font-medium text-gray-700 block mb-2">
//                               Value
//                             </label>
//                             <input
//                               value={stat.value}
//                               onChange={(e) =>
//                                 handleStatChange(index, "value", e.target.value)
//                               }
//                               placeholder="150+"
//                               className={inputClasses}
//                             />
//                           </div>
//                         </div>
//                       </motion.div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="pt-6 border-t border-gray-200">
//                   <div className="flex flex-col-reverse sm:flex-row gap-4 justify-between">
//                     <div className="flex gap-4">
//                       <Link
//                         href="/admin/dashboard/team"
//                         className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
//                       >
//                         Cancel
//                       </Link>
//                       <button
//                         type="button"
//                         onClick={() => {
//                           if (
//                             confirm(
//                               "Are you sure you want to reset all changes?",
//                             )
//                           ) {
//                             fetchMemberData();
//                           }
//                         }}
//                         className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
//                       >
//                         Reset Changes
//                       </button>
//                     </div>

//                     <button
//                       type="submit"
//                       disabled={saving}
//                       className={`px-8 py-3 rounded-lg font-medium text-white flex items-center justify-center gap-3 transition-all ${
//                         saving
//                           ? "bg-blue-400 cursor-not-allowed"
//                           : "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-lg hover:shadow-xl"
//                       }`}
//                     >
//                       {saving ? (
//                         <>
//                           <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                           Updating...
//                         </>
//                       ) : (
//                         <>
//                           <Save className="w-5 h-5" />
//                           Update Team Member
//                         </>
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>

//         {/* Preview Card */}
//         <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
//           <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
//             <Eye className="w-5 h-5 text-blue-600" />
//             Live Preview
//           </h3>
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             <div className="lg:col-span-2">
//               <div className="flex items-start gap-4">
//                 <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-2xl">
//                   {form.image && !imageError ? (
//                     <Image
//                       src={form.image}
//                       alt={form.name || "Profile"}
//                       fill
//                       className="object-cover"
//                       onError={() => setImageError(true)}
//                       sizes="80px"
//                     />
//                   ) : (
//                     <span>
//                       {form.name ? form.name.charAt(0).toUpperCase() : "?"}
//                     </span>
//                   )}
//                 </div>
//                 <div>
//                   <h4 className="font-bold text-xl text-gray-800">
//                     {form.name || "Team Member Name"}
//                   </h4>
//                   <p className="text-blue-600 font-medium">
//                     {form.position || "Position"}
//                   </p>
//                   <p className="text-gray-600 mt-2 text-sm line-clamp-2">
//                     {form.bio || "Bio will appear here"}
//                   </p>
//                 </div>
//               </div>

//               {form.expertise && (
//                 <div className="mt-6">
//                   <p className="text-sm font-medium text-gray-700 mb-2">
//                     Expertise:
//                   </p>
//                   <div className="flex flex-wrap gap-2">
//                     {form.expertise.split(",").map(
//                       (skill: string, index: number) =>
//                         skill.trim() && (
//                           <span
//                             key={index}
//                             className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
//                           >
//                             {skill.trim()}
//                           </span>
//                         ),
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>

//             <div className="bg-gray-50 p-5 rounded-xl">
//               <h5 className="font-medium text-gray-700 mb-4">Key Stats</h5>
//               <div className="space-y-4">
//                 {form.stats
//                   .filter((stat: any) => stat.label || stat.value)
//                   .map((stat: any, index: number) => (
//                     <div
//                       key={index}
//                       className="bg-white p-3 rounded-lg border border-gray-200"
//                     >
//                       <p className="text-sm text-gray-600">
//                         {stat.label || "Stat Label"}
//                       </p>
//                       <p className="text-xl font-bold text-gray-800">
//                         {stat.value || "Value"}
//                       </p>
//                     </div>
//                   ))}
//                 {form.stats.filter((stat: any) => stat.label || stat.value)
//                   .length === 0 && (
//                   <p className="text-gray-500 text-sm text-center py-4">
//                     No stats added yet
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// }
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
  Link as LinkIcon,
  Mail,
  Award,
  BarChart3,
  Users,
  RefreshCw,
  CheckCircle,
  XCircle,
  Image as ImageIcon,
  Sparkles,
  Trash2,
  Plus,
  Eye,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface TeamMember {
  _id: string;
  name: string;
  position: string;
  bio: string;
  image: {
    url: string;
    publicId?: string;
  };
  expertise: string[];
  featured: boolean;
  social: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
  stats: Array<{ label: string; value: string }>;
  createdAt: string;
  updatedAt: string;
}

interface FormData {
  name: string;
  position: string;
  bio: string;
  image: {
    url: string;
    publicId?: string;
  };
  expertise: string;
  featured: boolean;
  linkedin: string;
  twitter: string;
  email: string;
  phone: string;
  location: string;
  stats: Array<{ label: string; value: string }>;
}

export default function EditTeamMemberPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [imageError, setImageError] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  const [form, setForm] = useState<FormData>({
    name: "",
    position: "",
    bio: "",
    image: {
      url: "",
      publicId: "",
    },
    expertise: "",
    featured: false,
    linkedin: "",
    twitter: "",
    email: "",
    phone: "",
    location: "",
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

      const data: TeamMember = await res.json();

      setForm({
        name: data.name || "",
        position: data.position || "",
        bio: data.bio || "",
        image: data.image || { url: "", publicId: "" },
        expertise: data.expertise?.join(", ") || "",
        featured: data.featured || false,
        linkedin: data.social?.linkedin || "",
        twitter: data.social?.twitter || "",
        email: data.social?.email || "",
        phone: "",
        location: "",
        stats: data.stats?.length
          ? data.stats
          : [
              { label: "", value: "" },
              { label: "", value: "" },
            ],
      });

      setImagePreview(data.image?.url || "");
      setImageError(false);
    } catch (err) {
      setError("Failed to load team member data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchMemberData();
    }
  }, [id, fetchMemberData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    if (name === "expertise") {
      setForm((prev) => ({
        ...prev,
        expertise: value,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }

    if (success || error) {
      setSuccess(false);
      setError("");
    }
  };

  const handleImageUpload = async (file: File) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB");
      return;
    }

    setUploading(true);
    setError("");

    try {
      // Convert file to base64
      const reader = new FileReader();

      reader.onloadend = async () => {
        const base64Image = reader.result;

        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64Image }),
        });

        if (!res.ok) throw new Error("Failed to upload image");

        const data = await res.json();

        setForm((prev) => ({
          ...prev,
          image: {
            url: data.url,
            publicId: data.public_id,
          },
        }));

        setImagePreview(data.url);
        setUploading(false);
      };

      reader.readAsDataURL(file);
    } catch (err: any) {
      setError(err.message || "Failed to upload image");
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleStatChange = (
    index: number,
    field: "label" | "value",
    value: string,
  ) => {
    const updatedStats = [...form.stats];
    updatedStats[index][field] = value;
    setForm((prev) => ({ ...prev, stats: updatedStats }));

    if (success || error) {
      setSuccess(false);
      setError("");
    }
  };

  const addStat = () => {
    if (form.stats.length < 4) {
      setForm((prev) => ({
        ...prev,
        stats: [...prev.stats, { label: "", value: "" }],
      }));
    }
  };

  const removeStat = (index: number) => {
    if (form.stats.length > 1) {
      const updatedStats = form.stats.filter((_, i) => i !== index);
      setForm((prev) => ({ ...prev, stats: updatedStats }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess(false);

    // Process expertise string to array
    const expertiseArray = form.expertise
      .split(",")
      .map((e) => e.trim())
      .filter((e) => e !== "");

    const payload = {
      name: form.name,
      position: form.position,
      bio: form.bio,
      image: form.image, // Send as object with url and publicId
      featured: form.featured,
      expertise: expertiseArray,
      social: {
        linkedin: form.linkedin || null,
        twitter: form.twitter || null,
        email: form.email || null,
      },
      stats: form.stats.filter(
        (stat) => stat.label.trim() && stat.value.trim(),
      ),
    };

    try {
      const res = await fetch(`/api/team/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Update failed");
      }

      setSuccess(true);

      // Refresh the data
      await fetchMemberData();

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push("/admin/dashboard/team");
        router.refresh();
      }, 2000);
    } catch (err: any) {
      setError(
        err.message || "Failed to update team member. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  const inputClasses =
    "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-gray-800 placeholder-gray-500";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-2";

  // Image preview component
  const ImagePreview = () => {
    if (uploading) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      );
    }

    if (!imagePreview || imageError) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
          <Award className="w-12 h-12 text-gray-400" />
        </div>
      );
    }

    return (
      <Image
        src={imagePreview}
        alt={form.name || "Profile preview"}
        fill
        className="object-cover"
        onError={() => setImageError(true)}
        sizes="(max-width: 128px) 100vw, 128px"
        unoptimized={imagePreview.startsWith("data:")}
      />
    );
  };

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
          <Link
            href="/admin/dashboard/team"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Team
          </Link>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 md:p-8 text-white">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                    <Users className="w-8 h-8 text-blue-500" />
                    Edit Team Member
                  </h1>
                  <p className="text-blue-100 mt-2">
                    Update the details for {form.name || "this team member"}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={fetchMemberData}
                    type="button"
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
                        Full Name <span className="text-red-500">*</span>
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
                        Position / Role <span className="text-red-500">*</span>
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
                        className={`${inputClasses} min-h-[120px] resize-y`}
                        rows={4}
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        {form.bio.length}/500 characters
                      </p>
                    </div>
                  </div>
                </div>

                {/* Profile Image Upload */}
                <div>
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                    <ImageIcon className="w-6 h-6 text-blue-600" />
                    <h2 className="text-xl font-bold text-gray-800">
                      Profile Image
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Image Upload Section */}
                    <div>
                      <label className={labelClasses}>
                        Upload Profile Image
                      </label>

                      {/* File Upload Button */}
                      <div className="mt-2">
                        <label
                          htmlFor="image-upload"
                          className={`relative cursor-pointer bg-white rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors inline-block ${
                            uploading ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                        >
                          <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            disabled={uploading}
                            className="sr-only"
                          />
                          <div className="px-6 py-3 flex items-center gap-2">
                            {uploading ? (
                              <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                            ) : (
                              <Upload className="w-5 h-5 text-gray-600" />
                            )}
                            <span className="text-sm font-medium text-gray-700">
                              {uploading ? "Uploading..." : "Choose New Image"}
                            </span>
                          </div>
                        </label>
                        <p className="text-xs text-gray-500 mt-2">
                          PNG, JPG, GIF up to 5MB
                        </p>
                      </div>

                      {/* Current Image Preview */}
                      <div className="mt-6">
                        <p className="text-sm font-medium text-gray-700 mb-3">
                          Current Image
                        </p>
                        <div className="flex items-center gap-6">
                          <div className="relative w-32 h-32 rounded-xl overflow-hidden border-2 border-gray-300 bg-gradient-to-br from-gray-100 to-gray-200">
                            <ImagePreview />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-600">
                              {imagePreview && !imageError && !uploading
                                ? "Image uploaded successfully"
                                : imageError
                                  ? "Failed to load image. Please upload again."
                                  : uploading
                                    ? "Uploading image..."
                                    : "No image uploaded yet"}
                            </p>
                            {imagePreview && !uploading && (
                              <button
                                type="button"
                                onClick={() => {
                                  setImagePreview("");
                                  setForm((prev) => ({
                                    ...prev,
                                    image: { url: "", publicId: "" },
                                  }));
                                }}
                                className="mt-2 text-sm text-red-600 hover:text-red-800"
                              >
                                Remove image
                              </button>
                            )}
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
                        <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                          <input
                            type="checkbox"
                            name="featured"
                            checked={form.featured}
                            onChange={handleChange}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <div>
                            <p className="font-medium text-gray-800">
                              Featured Team Member
                            </p>
                            <p className="text-sm text-gray-600">
                              Highlight this member on the team page
                            </p>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact & Social Links */}
                <div>
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                    <LinkIcon className="w-6 h-6 text-blue-600" />
                    <h2 className="text-xl font-bold text-gray-800">
                      Contact & Social Links
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      <label htmlFor="phone" className={labelClasses}>
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+1 234 567 890"
                        className={inputClasses}
                      />
                    </div>

                    <div>
                      <label htmlFor="location" className={labelClasses}>
                        Location
                      </label>
                      <input
                        id="location"
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        placeholder="New York, USA"
                        className={inputClasses}
                      />
                    </div>

                    <div>
                      <label htmlFor="linkedin" className={labelClasses}>
                        <div className="inline-flex items-center gap-2">
                          <div className="w-5 h-5 bg-blue-700 text-white rounded flex items-center justify-center text-xs font-bold">
                            in
                          </div>
                          LinkedIn URL
                        </div>
                      </label>
                      <input
                        id="linkedin"
                        name="linkedin"
                        type="url"
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
                          Twitter / X URL
                        </div>
                      </label>
                      <input
                        id="twitter"
                        name="twitter"
                        type="url"
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
                      <Link
                        href="/admin/dashboard/team"
                        className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </Link>
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
                      disabled={saving || uploading}
                      className={`px-8 py-3 rounded-lg font-medium text-white flex items-center justify-center gap-3 transition-all ${
                        saving || uploading
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
                <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600 flex-shrink-0">
                  {imagePreview && !imageError ? (
                    <Image
                      src={imagePreview}
                      alt={form.name || "Profile"}
                      fill
                      className="object-cover"
                      onError={() => setImageError(true)}
                      sizes="80px"
                      unoptimized={imagePreview.startsWith("data:")}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white font-bold text-2xl">
                      {form.name ? form.name.charAt(0).toUpperCase() : "?"}
                    </div>
                  )}
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
                  .filter((stat: any) => stat.label && stat.value)
                  .map((stat: any, index: number) => (
                    <div
                      key={index}
                      className="bg-white p-3 rounded-lg border border-gray-200"
                    >
                      <p className="text-sm text-gray-600">{stat.label}</p>
                      <p className="text-xl font-bold text-gray-800">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                {form.stats.filter((stat: any) => stat.label && stat.value)
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

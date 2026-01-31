"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Plus,
  Edit,
  Trash2,
  Star,
  Search,
  Filter,
  MoreVertical,
  UserPlus,
  RefreshCw,
  Eye,
  Award,
  ChevronDown,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

type TeamMember = {
  _id: string;
  name: string;
  position: string;
  image: string;
  featured: boolean;
  expertise: string[];
  bio?: string;
  email?: string;
  social?: {
    linkedin?: string;
    twitter?: string;
  };
};

export default function TeamDashboardPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterFeatured, setFilterFeatured] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"name" | "featured" | "newest">(
    "newest",
  );

  useEffect(() => {
    fetchTeamData();
  }, []);

  const fetchTeamData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/team");
      if (!res.ok) throw new Error("Failed to fetch team data");
      const data = await res.json();
      setTeam(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load team members",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/team/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setTeam(team.filter((member) => member._id !== id));
        setDeleteConfirm(null);
      } else {
        throw new Error("Failed to delete member");
      }
    } catch (err) {
      setError("Failed to delete team member");
    }
  };

  const filteredTeam = team
    .filter((member) => {
      const matchesSearch =
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.expertise.some((skill) =>
          skill.toLowerCase().includes(searchQuery.toLowerCase()),
        );

      const matchesFilter = !filterFeatured || member.featured;

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "featured":
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        case "newest":
        default:
          return 0; // Assuming API returns newest first
      }
    });

  const stats = {
    total: team.length,
    featured: team.filter((m) => m.featured).length,
    withEmail: team.filter((m) => m.email).length,
    withSocial: team.filter((m) => m.social?.linkedin || m.social?.twitter)
      .length,
  };

  if (loading && team.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-gray-600 text-lg">Loading team members...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Users className="w-8 h-8 text-blue-600" />
                Team Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Manage your team members and their profiles
              </p>
            </div>

            <a
              href="/admin/dashboard/team/add"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all"
            >
              <UserPlus className="w-5 h-5" />
              Add New Member
            </a>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-5 shadow-lg border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Members</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    {stats.total}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-5 shadow-lg border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Featured Members</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    {stats.featured}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                  <Star className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-5 shadow-lg border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">With Email</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    {stats.withEmail}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl p-5 shadow-lg border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Social Profiles</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    {stats.withSocial}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-200">
          <div className="flex flex-col lg:flex-row gap-4 justify-between">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search members by name, position, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="appearance-none pl-4 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                >
                  <option value="newest">Sort by: Newest</option>
                  <option value="name">Sort by: Name</option>
                  <option value="featured">Sort by: Featured</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>

              <button
                onClick={() => setFilterFeatured(!filterFeatured)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl border transition-all ${
                  filterFeatured
                    ? "bg-amber-50 border-amber-200 text-amber-700"
                    : "border-gray-300 hover:bg-gray-50 text-gray-700"
                }`}
              >
                <Star
                  className={`w-5 h-5 ${filterFeatured ? "fill-amber-500 text-amber-500" : ""}`}
                />
                Featured Only
              </button>

              <button
                onClick={fetchTeamData}
                className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors text-gray-700"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-red-800 font-medium">
                Error loading team members
              </p>
              <p className="text-red-600 text-sm mt-1">{error}</p>
              <button
                onClick={fetchTeamData}
                className="mt-2 text-sm text-red-700 hover:text-red-900 font-medium"
              >
                Try again
              </button>
            </div>
          </motion.div>
        )}

        {/* Team Grid */}
        {filteredTeam.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-200"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
              <Users className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {searchQuery || filterFeatured
                ? "No matching members found"
                : "No team members yet"}
            </h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              {searchQuery || filterFeatured
                ? "Try adjusting your search or filter to find what you're looking for."
                : "Get started by adding your first team member to the dashboard."}
            </p>
            <a
              href="/dashboard/team/add"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Your First Member
            </a>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredTeam.map((member, index) => (
                <motion.div
                  key={member._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  layout
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 group"
                >
                  {/* Member Header */}
                  <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600">
                        <span className="text-4xl font-bold text-white">
                          {member.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}

                    {member.featured && (
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                          <Star className="w-3 h-3 fill-current" />
                          Featured
                        </span>
                      </div>
                    )}

                    <div className="absolute top-4 right-4">
                      <button
                        onClick={() =>
                          setSelectedMember(
                            selectedMember?._id === member._id ? null : member,
                          )
                        }
                        className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-md"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-700" />
                      </button>
                    </div>
                  </div>

                  {/* Member Info */}
                  <div className="p-5">
                    <div className="mb-3">
                      <h3 className="font-bold text-lg text-gray-900 truncate">
                        {member.name}
                      </h3>
                      <p className="text-blue-600 font-medium truncate">
                        {member.position}
                      </p>
                    </div>

                    {member.bio && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {member.bio}
                      </p>
                    )}

                    {/* Expertise Tags */}
                    <div className="mb-5">
                      <div className="flex flex-wrap gap-2">
                        {member.expertise.slice(0, 3).map((skill, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                        {member.expertise.length > 3 && (
                          <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                            +{member.expertise.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-4 border-t border-gray-100">
                      <button
                        onClick={() =>
                          (window.location.href = `/admin/dashboard/team/${member._id}/edit`)
                        }
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg font-medium transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(member._id)}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg font-medium transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* Quick View Overlay */}
                  {selectedMember?._id === member._id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-gray-100 p-5 bg-gray-50"
                    >
                      <div className="space-y-3">
                        {member.email && (
                          <div className="flex items-center gap-3 text-sm">
                            <span className="font-medium text-gray-700">
                              Email:
                            </span>
                            <span className="text-gray-600 truncate">
                              {member.email}
                            </span>
                          </div>
                        )}
                        <div className="flex gap-4">
                          {member.social?.linkedin && (
                            <a
                              href={member.social.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                              LinkedIn
                            </a>
                          )}
                          {member.social?.twitter && (
                            <a
                              href={member.social.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-600 text-sm font-medium"
                            >
                              Twitter
                            </a>
                          )}
                        </div>
                        <button
                          onClick={() =>
                            (window.location.href = `/team/${member._id}`)
                          }
                          className="w-full flex items-center justify-center gap-2 py-2 text-sm text-gray-600 hover:text-gray-900 font-medium"
                        >
                          <Eye className="w-4 h-4" />
                          View Full Profile
                        </button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {deleteConfirm && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                  <Trash2 className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                  Delete Team Member
                </h3>
                <p className="text-gray-600 text-center mb-6">
                  Are you sure you want to delete this team member? This action
                  cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="flex-1 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDelete(deleteConfirm)}
                    className="flex-1 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-medium transition-all"
                  >
                    Delete Member
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

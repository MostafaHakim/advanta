"use client";

import {
  Briefcase,
  Users,
  MessageCircle,
  Handshake,
  PlaneTakeoff,
  BookOpen,
} from "lucide-react";
import StatCard from "@/components/admin/StatCard";
import { use, useEffect, useState } from "react";

// Define the type for a message
interface Message {
  id?: string | number;
  name: string;
  email: string;
  phone?: string;
  message: string;
  service?: string;
  company?: string;
  date?: string;
  read?: boolean;
}

// Define the type for a user
interface User {
  _id: string;
  username: string;
  email: string;
  status: string;
}

export default function AdminDashboard() {
  const [data, setData] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [
          usersRes,
          messagesRes,
          projectsRes,
          servicesRes,
          teamRes,
          blogsRes,
        ] = await Promise.all([
          fetch("/api/admin/users"),
          fetch("/api/contact"),
          fetch("/api/projects"),
          fetch("/api/services"),
          fetch("/api/team"),
          fetch("/api/blogs"),
        ]);

        const usersData = await usersRes.json();
        const messagesData = await messagesRes.json();
        const projectsData = await projectsRes.json();
        const servicesData = await servicesRes.json();
        const teamData = await teamRes.json();
        const blogsData = await blogsRes.json();
        setUsers(usersData);
        setTeamMembers(teamData);
        setBlogs(blogsData);

        const messages: Message[] = Array.isArray(messagesData.data)
          ? messagesData.data.map((item: any) => ({
              id: item.id || Math.random().toString(),
              name: item.name || "Anonymous",
              email: item.email || "No email provided",
              phone: item.phone,
              message: item.message || "No message provided",
              service: item.service,
              company: item.company,
              date: item.date || new Date().toISOString(),
              read: item.read || false,
            }))
          : [];

        setData(messages);
        setProjects(projectsData?.data || []);
        setServices(servicesData || []);
        setTeamMembers(teamData || []);
        setBlogs(blogsData || []);
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Advanta Dashboard
          </h1>
          <p className="text-gray-600 mt-2 capitalize">
            You Can Find the Summery of your business!
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={`${users?.length}`}
          change={0}
          icon={<Users className="w-6 h-6" />}
          color="from-green-500 to-emerald-600"
        />
        <StatCard
          title="Total Messages"
          value={`${data.length}`}
          change={0}
          icon={<MessageCircle className="w-6 h-6" />}
          color="from-green-500 to-emerald-600"
        />
        <StatCard
          title="Active Projects"
          value={`${projects?.length}`}
          change={0}
          icon={<Briefcase className="w-6 h-6" />}
          color="from-blue-500 to-cyan-600"
        />
        <StatCard
          title="Total Services"
          value={`${services?.length}`}
          change={0}
          icon={<PlaneTakeoff className="w-6 h-6" />}
          color="from-blue-500 to-cyan-600"
        />
        <StatCard
          title="Team Members"
          value={`${teamMembers.length}`}
          change={0}
          icon={<Handshake className="w-6 h-6" />}
          color="from-purple-500 to-pink-600"
        />
        <StatCard
          title="Total Blogs"
          value={`${blogs.length}`}
          change={0}
          icon={<BookOpen className="w-6 h-6" />}
          color="from-orange-500 to-red-600"
        />
      </div>
    </div>
  );
}

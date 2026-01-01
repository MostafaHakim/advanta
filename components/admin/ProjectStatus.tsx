"use client";

import {
  CheckCircle,
  Clock,
  AlertCircle,
  PauseCircle,
  PlayCircle,
} from "lucide-react";
import { useState } from "react";

const ProjectStatus = () => {
  const [projects] = useState([
    {
      id: 1,
      name: "E-commerce Platform",
      client: "FashionHub",
      progress: 85,
      status: "in-progress",
      deadline: "Dec 28, 2023",
      budget: "$15,000",
      team: 4,
    },
    {
      id: 2,
      name: "SEO Optimization",
      client: "TechCorp",
      progress: 100,
      status: "completed",
      deadline: "Dec 25, 2023",
      budget: "$5,000",
      team: 2,
    },
    {
      id: 3,
      name: "Mobile App Development",
      client: "HealthPlus",
      progress: 65,
      status: "in-progress",
      deadline: "Jan 15, 2024",
      budget: "$25,000",
      team: 5,
    },
    {
      id: 4,
      name: "Social Media Campaign",
      client: "Wellness Brand",
      progress: 30,
      status: "pending",
      deadline: "Jan 30, 2024",
      budget: "$8,000",
      team: 3,
    },
    {
      id: 5,
      name: "Brand Redesign",
      client: "EduTech",
      progress: 0,
      status: "not-started",
      deadline: "Feb 10, 2024",
      budget: "$12,000",
      team: 3,
    },
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case "in-progress":
        return <PlayCircle className="w-5 h-5 text-blue-500" />;
      case "pending":
        return <Clock className="w-5 h-5 text-amber-500" />;
      case "not-started":
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
      default:
        return <AlertCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "in-progress":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "not-started":
        return "bg-gray-50 text-gray-700 border-gray-200";
      default:
        return "bg-red-50 text-red-700 border-red-200";
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "from-emerald-500 to-green-500";
    if (progress >= 50) return "from-blue-500 to-cyan-500";
    if (progress >= 30) return "from-amber-500 to-yellow-500";
    return "from-gray-400 to-gray-500";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-bold text-gray-900">Active Projects</h4>
        <span className="text-sm text-gray-600">
          {projects.filter((p) => p.status === "in-progress").length} in
          progress
        </span>
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-sm transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center mb-1">
                  {getStatusIcon(project.status)}
                  <h5 className="font-semibold text-gray-900 ml-2">
                    {project.name}
                  </h5>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span>Client: {project.client}</span>
                  <span className="mx-2">•</span>
                  <span>Team: {project.team} members</span>
                  <span className="mx-2">•</span>
                  <span>Budget: {project.budget}</span>
                </div>
              </div>

              <span
                className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(
                  project.status
                )}`}
              >
                {project.status.replace("-", " ")}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="mb-3">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium text-gray-900">
                  {project.progress}%
                </span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${getProgressColor(
                    project.progress
                  )} transition-all duration-500`}
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center text-gray-600">
                <Clock className="w-4 h-4 mr-1" />
                <span>Due: {project.deadline}</span>
              </div>
              <button className="text-blue-600 hover:text-blue-700 font-medium">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectStatus;

"use client";

import BrandSetting from "@/components/sections/BrandSetting";
import HeroSettings from "@/components/sections/HeroSetting";
import React, { useState, useEffect } from "react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("client");

  const settingsTabs = [
    {
      id: "client",
      name: "Client",
      icon: "👥",
      content: (
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Client Settings
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-2">
                Client Information
              </h3>
              <p className="text-gray-600">
                Manage client details and preferences here.
              </p>
            </div>
            {/* Add more client settings components here */}
          </div>
        </div>
      ),
    },
    {
      id: "Hero",
      name: "Hero",
      icon: "👥",
      content: (
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Hero Settings
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <HeroSettings />
            </div>
            {/* Add more client settings components here */}
          </div>
        </div>
      ),
    },
    {
      id: "project",
      name: "Project",
      icon: "📁",
      content: (
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Project Settings
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-2">
                Project Configuration
              </h3>
              <p className="text-gray-600">
                Configure project settings and parameters.
              </p>
            </div>
          </div>
        </div>
      ),
    },

    {
      id: "rule",
      name: "Rule",
      icon: "📜",
      content: (
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Rule Settings
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-2">
                Rules & Regulations
              </h3>
              <p className="text-gray-600">
                Define and manage application rules.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "brands",
      name: "Brands",
      icon: "🌐",
      content: (
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Brands Settings
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <BrandSetting />
            </div>
            {/* Add more client settings components here */}
          </div>
        </div>
      ),
    },
  ];

  const activeTabContent = settingsTabs.find(
    (tab) => tab.id === activeTab,
  )?.content;

  return (
    <div className="space-y-8 max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="pt-2">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Settings Dashboard
        </h1>
        <p className="text-gray-600">Manage all your settings from one place</p>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-1">
        <ul className="flex flex-wrap list-none">
          {settingsTabs.map((tab, index) => (
            <li key={tab.id} className="flex-1 min-w-[120px]">
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`
                  w-full flex flex-col sm:flex-row items-center justify-center gap-2 px-4 py-3.5
                  transition-all duration-200 ease-in-out
                  ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }
                  ${index === 0 ? "rounded-l-lg" : ""}
                  ${index === settingsTabs.length - 1 ? "rounded-r-lg" : ""}
                  border-r border-gray-100 last:border-r-0
                `}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="font-medium text-sm sm:text-base">
                  {tab.name}
                </span>

                {/* Active indicator */}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-white rounded-full"></div>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Active Tab Indicator */}
      <div className="flex items-center text-sm text-gray-500">
        <span className="font-medium text-blue-600">
          {settingsTabs.find((tab) => tab.id === activeTab)?.name || "Client"}{" "}
          Settings
        </span>
        <svg
          className="w-4 h-4 mx-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          ></path>
        </svg>
        <span>Manage configuration and preferences</span>
      </div>

      {/* Content Area - Dynamic based on active tab */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {activeTabContent}
      </div>
    </div>
  );
}

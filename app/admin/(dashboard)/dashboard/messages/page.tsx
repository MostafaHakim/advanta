"use client";

import { useEffect, useState } from "react";

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

export default function Messages() {
  const [data, setData] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/api/contact")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch messages");
        }
        return res.json();
      })
      .then((result) => {
        // Ensure data is properly typed
        const messages: Message[] = Array.isArray(result.data)
          ? result.data.map((item: any) => ({
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
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Filter messages based on search term
  const filteredMessages = data.filter((item: Message) => {
    if (!searchTerm) return true;

    const searchLower = searchTerm.toLowerCase();
    return (
      item.name?.toLowerCase().includes(searchLower) ||
      item.email?.toLowerCase().includes(searchLower) ||
      item.message?.toLowerCase().includes(searchLower) ||
      item.service?.toLowerCase().includes(searchLower)
    );
  });

  // Format date if available in data
  const formatDate = (dateString: string): string => {
    if (!dateString) return "No date";

    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get service color based on service type
  const getServiceColor = (service?: string): string => {
    const colors: Record<string, string> = {
      "web design": "bg-blue-100 text-blue-800",
      development: "bg-purple-100 text-purple-800",
      seo: "bg-green-100 text-green-800",
      consulting: "bg-amber-100 text-amber-800",
      marketing: "bg-pink-100 text-pink-800",
      default: "bg-gray-100 text-gray-800",
    };

    const serviceLower = service?.toLowerCase() || "";
    for (const [key, value] of Object.entries(colors)) {
      if (serviceLower.includes(key)) return value;
    }

    return colors.default;
  };

  const handleViewDetails = (message: Message) => {
    setSelectedMessage(message);
  };

  const handleCloseDetails = () => {
    setSelectedMessage(null);
  };

  const handleMarkAsRead = (index: number) => {
    const newData = [...data];
    if (newData[index]) {
      newData[index].read = true;
      setData(newData);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-gray-600">Loading messages...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
        <div className="flex">
          <div className="shrink-0">
            <svg
              className="h-5 w-5 text-red-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              Error loading messages
            </h3>
            <p className="text-sm text-red-700 mt-1">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-3 px-3 py-1 bg-red-100 text-red-700 rounded text-sm font-medium hover:bg-red-200"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Visitor Messages</h2>
          <p className="text-gray-600 mt-1">
            {filteredMessages.length} message
            {filteredMessages.length !== 1 ? "s" : ""} found
          </p>
        </div>

        <div className="mt-4 md:mt-0">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-64"
            />
          </div>
        </div>
      </div>

      {filteredMessages.length === 0 ? (
        <div className="bg-gray-50 rounded-xl p-8 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            No messages found
          </h3>
          <p className="mt-1 text-gray-500">
            {searchTerm
              ? "Try a different search term"
              : "No visitor messages yet"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Message List */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {filteredMessages.map((item, index) => (
                <div
                  key={item.id || index}
                  className={`border rounded-xl p-4 hover:shadow-md transition-shadow duration-200 ${!item.read ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200"}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-600 font-bold text-lg">
                              {item.name?.charAt(0) || "V"}
                            </span>
                          </div>
                          <div className="ml-3">
                            <h3 className="font-semibold text-gray-900">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {item.email}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          {item.date && (
                            <span className="text-xs text-gray-500">
                              {formatDate(item.date)}
                            </span>
                          )}
                          {!item.read && (
                            <span className="h-2 w-2 bg-blue-500 rounded-full"></span>
                          )}
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {item.service && (
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${getServiceColor(item.service)}`}
                            >
                              {item.service}
                            </span>
                          )}
                          {item.company && (
                            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                              {item.company}
                            </span>
                          )}
                        </div>

                        <p className="text-gray-700 line-clamp-2">
                          {item.message}
                        </p>

                        <div className="mt-4 flex justify-between items-center">
                          <div className="flex items-center">
                            <svg
                              className="h-4 w-4 text-gray-400 mr-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                            <span className="text-sm text-gray-600">
                              {item.email}
                            </span>
                          </div>

                          <div className="flex space-x-2">
                            {item.phone && (
                              <a
                                href={`tel:${item.phone}`}
                                className="text-sm text-gray-600 hover:text-blue-600 flex items-center"
                              >
                                <svg
                                  className="h-4 w-4 mr-1"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                                {item.phone}
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="ml-4 flex flex-col space-y-2">
                      <button
                        onClick={() => handleViewDetails(item)}
                        className="px-3 py-1.5 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100"
                      >
                        View
                      </button>
                      {!item.read && (
                        <button
                          onClick={() => handleMarkAsRead(index)}
                          className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                        >
                          Mark Read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message Details Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Message Details
                </h3>

                {selectedMessage ? (
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-xl">
                          {selectedMessage.name?.charAt(0) || "V"}
                        </span>
                      </div>
                      <div className="ml-3">
                        <h4 className="font-bold text-gray-900">
                          {selectedMessage.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {selectedMessage.email}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h5 className="text-xs uppercase text-gray-500 font-semibold mb-1">
                          Service
                        </h5>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getServiceColor(selectedMessage.service)}`}
                        >
                          {selectedMessage.service || "Not specified"}
                        </span>
                      </div>

                      <div>
                        <h5 className="text-xs uppercase text-gray-500 font-semibold mb-1">
                          Company
                        </h5>
                        <p className="text-gray-800">
                          {selectedMessage.company || "Not specified"}
                        </p>
                      </div>

                      <div>
                        <h5 className="text-xs uppercase text-gray-500 font-semibold mb-1">
                          Phone
                        </h5>
                        <p className="text-gray-800">
                          {selectedMessage.phone || "Not provided"}
                        </p>
                      </div>

                      <div>
                        <h5 className="text-xs uppercase text-gray-500 font-semibold mb-1">
                          Message
                        </h5>
                        <div className="bg-gray-50 rounded-lg p-3 mt-1">
                          <p className="text-gray-700 whitespace-pre-line">
                            {selectedMessage.message}
                          </p>
                        </div>
                      </div>

                      {selectedMessage.date && (
                        <div>
                          <h5 className="text-xs uppercase text-gray-500 font-semibold mb-1">
                            Received
                          </h5>
                          <p className="text-gray-800">
                            {formatDate(selectedMessage.date)}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="mt-6 pt-5 border-t border-gray-200 flex justify-end">
                      <button
                        onClick={handleCloseDetails}
                        className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 text-sm font-medium"
                      >
                        Close Details
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    <p className="mt-3 text-gray-500">
                      Select a message to view details
                    </p>
                  </div>
                )}
              </div>

              {/* Stats Summary */}
              <div className="mt-4 bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-4">
                <h4 className="font-semibold text-gray-800 mb-3">Summary</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <p className="text-sm text-gray-600">Total Messages</p>
                    <p className="text-xl font-bold text-gray-900">
                      {data.length}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <p className="text-sm text-gray-600">Unread</p>
                    <p className="text-xl font-bold text-blue-600">
                      {data.filter((item) => !item.read).length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

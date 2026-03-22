"use client";
import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
interface User {
  _id: string;
  username: string;
  email: string;
  status: string;
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("/api/admin/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handeleStatusUpdate = async (id: string) => {
    const res = await fetch(`/api/admin/users/edit/${id}`, {
      method: "PUT",
    });

    if (res.ok) {
      const data = await res.json();
      toast.success("Status Update Successfully");
      // UI update without reload
      setUsers((prev) =>
        prev.map((user) =>
          user._id === id ? { ...user, status: data.data.status } : user,
        ),
      );
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">User List</h2>

      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="p-3">{user.username}</td>
                <td className="p-3">{user.email}</td>
                <td className="flex items-center space-x-2 p-3">
                  <span
                    className={
                      user.status === "pending"
                        ? "text-yellow-600"
                        : user.status === "active"
                          ? "text-green-500"
                          : "text-red-500"
                    }
                  >
                    {user.status === "pending"
                      ? "Pending"
                      : user.status === "active"
                        ? "Activate"
                        : "Block"}
                  </span>

                  <button
                    onClick={() => handeleStatusUpdate(user._id)}
                    className="cursor-pointer"
                  >
                    <Edit size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

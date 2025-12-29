"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchStudents, deleteStudent, updateStudent } from "@/lib/api1";

export default function StudentList() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({ 
    queryKey: ["students"],
    queryFn: fetchStudents 
  });

  const deleteMutation = useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["students"] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, name, email }: { id: string; name: string; email: string }) =>
      updateStudent(id, { name, email }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["students"] }),
  });

  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  const startEdit = (student: { _id: string; name: string; email: string }) => {
    setEditId(student._id);
    setEditName(student.name);
    setEditEmail(student.email);
  };

  const submitEdit = (id: string) => {
    updateMutation.mutate({ id, name: editName, email: editEmail });
    setEditId(null);
  };

  if (isLoading) return <p>Loading students...</p>;
  if (isError) return <p>Something went wrong</p>;

  return (
    <ul className="space-y-3">
      {data?.map((student) => (
        <li key={student._id} className="flex justify-between border p-3 rounded items-center">
          {editId === student._id ? (
            <>
              <input
                className="border p-1 rounded mr-2"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
              <input
                className="border p-1 rounded mr-2"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
              />
              <button
                className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                onClick={() => submitEdit(student._id)}
                disabled={updateMutation.isPending}
              >
                {updateMutation.isPending ? "Saving..." : "Save"}
              </button>
              <button
                className="bg-gray-400 text-white px-2 py-1 rounded"
                onClick={() => setEditId(null)}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <div>
                <p className="font-semibold">{student.name}</p>
                <p className="text-sm text-gray-500">{student.email}</p>
              </div>
              <div className="flex gap-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={() => startEdit(student)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => deleteMutation.mutate(student._id)}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStudent, updateStudent } from "@/lib/api1";
import { Student } from "@/app/page";

interface StudentFormProps {
  editingStudent: Student | null;
  onClear: () => void;
}

export default function StudentForm({ editingStudent, onClear }: StudentFormProps) {
  const queryClient = useQueryClient();

  // We use state to track the input values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // This effect ensures that the form fields are updated when editingStudent changes
  useEffect(() => {
    if (editingStudent) {
      setName(editingStudent.name);
      setEmail(editingStudent.email);
    } else {
      setName("");
      setEmail("");
    }
  }, [editingStudent]);

  const mutation = useMutation({
    mutationFn: (data: { name: string; email: string }) => {
      if (editingStudent) {
        return updateStudent(editingStudent._id, data);
      }
      return createStudent(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      setName("");
      setEmail("");
      onClear();
    },
  });

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    mutation.mutate({ name, email });
  };

  return (
    <form onSubmit={submitHandler} className="space-y-4 p-6 rounded-lg shadow-md border">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">
          {editingStudent ? "Edit Student" : "Add New Student"}
        </h2>
        {editingStudent && (
          <button
            type="button"
            onClick={onClear}
            className="text-lg text-red-500 hover:text-red-700 font-medium cursor-pointer"
          >
            ❌
          </button>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-semibold text-white">Name</label>
        <input
          className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Enter student name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-semibold text-white">Email</label>
        <input
          className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Enter student email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className={`w-full text-white font-bold py-2 rounded transition ${editingStudent ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
          } ${mutation.isPending ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {mutation.isPending ? "Saving..." : editingStudent ? "Update Student" : "Add Student"}
      </button>
    </form>
  );
}

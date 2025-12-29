"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStudent } from "@/lib/api";

export default function StudentForm() {
  const queryClient = useQueryClient();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const mutation = useMutation({
    mutationFn: createStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      setName("");
      setEmail("");
    },
  });

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ name, email });
  };

  return (
    <form onSubmit={submitHandler} className="space-y-4">
      <input
        className="w-full border p-2 rounded"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        disabled={mutation.isPending}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {mutation.isPending ? "Adding..." : "Add Student"}
      </button>
    </form>
  );
}

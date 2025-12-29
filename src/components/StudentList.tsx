"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchStudents, deleteStudent } from "@/lib/api";

export default function StudentList() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["students"],
    queryFn: fetchStudents,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });

  if (isLoading) return <p>Loading students...</p>;
  if (isError) return <p>Something went wrong</p>;

  return (
    <ul className="space-y-3">
      {data?.map((student) => (
        <li
          key={student._id}
          className="flex justify-between border p-3 rounded"
        >
          <div>
            <p className="font-semibold">{student.name}</p>
            <p className="text-sm text-gray-500">{student.email}</p>
          </div>

          <button
            onClick={() => deleteMutation.mutate(student._id)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchStudents, deleteStudent } from "@/lib/api1";
import { Student } from "@/app/page";

interface StudentListProps {
  onEdit: (student: Student) => void;
}

export default function StudentList({ onEdit }: StudentListProps) {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["students"],
    queryFn: fetchStudents
  });

  const deleteMutation = useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["students"] }),
  });

  if (isLoading) return <p className="text-yellow-600">Loading students...</p>;
  if (isError) return <p className="text-red-600 font-medium">Error loading students. Please try again.</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white">Registered Students</h2>
      <ul className="space-y-3">
        {data?.map((student: Student) => (
          <li
            key={student._id}
            className="flex justify-between items-center border p-4 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <div>
              <p className="font-bold text-white">{student.name}</p>
              <p className="text-sm text-white">{student.email}</p>
            </div>
            <div className="flex gap-2">
              <button
                className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-md hover:bg-blue-200 transition font-medium"
                onClick={() => onEdit(student)}
              >
                Edit
              </button>
              <button
                className="bg-red-100 text-red-700 px-4 py-1.5 rounded-md hover:bg-red-200 transition font-medium"
                onClick={() => {
                  if (window.confirm("Are you sure you want to delete this student?")) {
                    deleteMutation.mutate(student._id);
                  }
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
        {!data?.length && <li className="text-gray-400 text-center py-6 border-2 border-dashed rounded-lg">No students found.</li>}
      </ul>
    </div>
  );
}

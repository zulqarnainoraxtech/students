const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

if (!process.env.NEXT_PUBLIC_API_URL) {
  console.warn("NEXT_PUBLIC_API_URL is not defined");
}

export interface Student {
  _id: string;
  name: string;
  email: string;
}

export const fetchStudents = async (): Promise<Student[]> => {
  const res = await fetch(`${API_URL}/students`);
  if (!res.ok) throw new Error("Failed to fetch students");
  return res.json();
};

export const createStudent = async (data: {
  name: string;
  email: string;
}) => {
  const res = await fetch(`${API_URL}/students`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create student");
};

export const deleteStudent = async (id: string) => {
  const res = await fetch(`${API_URL}/students/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete student");
};

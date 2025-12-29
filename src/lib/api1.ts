import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

if (!process.env.NEXT_PUBLIC_API_URL) {
  console.warn("NEXT_PUBLIC_API_URL is not defined, using fallback");
}

export interface Student {
  _id: string;
  name: string;
  email: string;
}

/**
 * Axios instance (BEST PRACTICE)
 */
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * READ
 */
export const fetchStudents = async (): Promise<Student[]> => {
  const { data } = await api.get<Student[]>("/students");
  return data;
};

/**
 * CREATE
 */
export const createStudent = async (payload: {
  name: string;
  email: string;
}) => {
  await api.post("/students", payload);
};

/**
 * DELETE
 */
export const deleteStudent = async (id: string) => {
  await api.delete(`/students/${id}`);
};

/**
 * UPDATE
 */
export const updateStudent = async (id: string, payload: { name: string; email: string }) => {
  const { data } = await api.put(`/students/${id}`, payload);
  return data;
};
"use client";

import { useState } from "react";
import StudentForm from "@/components/StudentForm";
import StudentList from "@/components/StudentList";

export interface Student {
  _id: string;
  name: string;
  email: string;
}

export default function Home() {
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    // Smooth scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="max-w-2xl mx-auto p-4 sm:p-8 space-y-10 min-h-screen ">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-extrabold text-blue-600 tracking-tight">Student Hub</h1>
        <p className="text-gray-500 uppercase tracking-widest text-xs font-bold">Manage your records with ease</p>
      </div>

      <StudentForm
        editingStudent={editingStudent}
        onClear={() => setEditingStudent(null)}
      />

      <StudentList onEdit={handleEdit} />
    </main>
  );
}

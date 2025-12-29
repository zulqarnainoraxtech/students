"use client"
import StudentForm from "@/components/StudentForm";
import StudentList from "@/components/StudentList";

export default function Home() {
  return (
    <main className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Student Manager</h1>
      <StudentForm />
      <StudentList />
    </main>
  );
}

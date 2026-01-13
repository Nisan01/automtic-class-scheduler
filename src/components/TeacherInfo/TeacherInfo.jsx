import { React, useEffect, useState } from "react";
import { Button } from "../ui/Button";
import { Trash } from 'lucide-react';
import { Spinner } from "@/components/ui/spinner";
import EditTeacherModal from "@/components/EditTeacherModel/EditTeacherModel";

function TeacherInfo() {
  const [teacher, setTeacher] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  useEffect(() => {
    const getTeacherData = async () => {
      const res = await fetch("/api/teacher/getTeacher", { method: 'GET' });
      const data = await res.json();
      if (data.success) {
        setTeacher(data.teachers);
        setLoading(false);
      }
    };
    getTeacherData();
  }, []);

  const removeTeacherHandler = async (teacher_id) => {
    setDeletingId(teacher_id);
    try {
      const res = await fetch("/api/teacher/remove-teacher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teacher_id }),
      });
      const data = await res.json();
      if (data.success) {
        setDeletingId(null);
        setTeacher(prev => prev.filter(t => t.t_id !== teacher_id));
      }
    } catch (error) {
           toast.error("Error while removing teacher !")
           console.log(error);
    }
  };

  return (
    <div className="w-full">
      {loading && <div className="flex w-full h-100 items-center justify-center"><Spinner className="size-8   text-white" /></div>}
      {!loading && teacher.length === 0 && <p className="text-gray-500">No teacher data available.</p>}

      {!loading && teacher.length > 0 && (
        <div className="w-full p-6 bg-white rounded-lg shadow space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">👩‍🏫 Teacher List</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Max Load</th>
                  <th className="px-4 py-2 text-left">Expertise</th>
                  <th className="px-4 py-2 text-left">Available Days</th>
                  <th className="px-4 py-2 text-left">Remove</th>
                  <th className="px-4 py-2 text-left">Edit</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {teacher.map((teacher, idx) => (
                  <tr key={teacher.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-4 py-2">{teacher.t_id}</td>
                    <td className="px-4 py-2">{teacher.name}</td>
                    <td className=" py-2  px-10 ">{teacher.maxLoad}</td>
                    <td className="px-4 py-2">{(teacher.subjectExpertise || []).join(", ")}</td>
                    <td className="px-4 py-2">{(teacher.availableDays || []).join(", ")}</td>
                    <td className="py-2  px-8">
                      <div className="flex items-center justify-center w-6 h-6">
                        {deletingId === teacher.t_id ? (
                          <Spinner className="size-4 text-red-500" />
                        ) : (
                          <Trash
                            className="w-4 h-4 text-red-600 cursor-pointer hover:text-red-800 transition"
                            onClick={() => removeTeacherHandler(teacher.t_id)}
                          />
                        )}
                      </div>
                    </td>
                    <td className="px-2 py-2">
                      <Button
                        className="bg-green-600 text-white text-sm  rounded hover:bg-green-700"
                        onClick={() => {
                          setSelectedTeacher(teacher);
                          setEditOpen(true);
                        }}
                      >
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <EditTeacherModal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        teacher={selectedTeacher}
        onSave={async (updatedData) => {
          const res = await fetch("/api/teacher/update-teacher", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ t_id: selectedTeacher.t_id, ...updatedData }),
          });
          const data = await res.json();
          if (data.success) {
            setTeacher(prev => prev.map(t => t.t_id === selectedTeacher.t_id ? { ...t, ...updatedData } : t));
          }
          setEditOpen(false);
        }}
      />
    </div>
  );
}

export default TeacherInfo;

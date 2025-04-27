// src/components/StudentList.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function StudentList() {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    const res = await axios.get("https://student-management-system1-3huu.onrender.com/api/products");
    setStudents(res.data.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const deleteStudent = async (id) => {
    await axios.delete(`https://student-management-system1-3huu.onrender.com/api/products/${id}`);
    fetchStudents();
  };

  return (
    <div className="list-container">
      <Link to="/create" className="btn-add">Add New Student</Link>
      <table>
        <thead>
          <tr>
            <th>StudentID</th>
            <th>Name</th>
            <th>Email</th>
            <th>DOB</th>
            <th>Department</th>
            <th>Year</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.studentId}</td>
              <td>{student.firstName} {student.lastName}</td>
              <td>{student.email}</td>
              <td>{student.dob}</td>
              <td>{student.department}</td>
              <td>{student.enrollmentYear}</td>
              <td>{student.isActive ? "Yes" : "No"}</td>
              <td>
                <Link to={`/edit/${student._id}`} className="btn-add">Edit</Link>
                <button onClick={() => deleteStudent(student._id)} className="btn delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;

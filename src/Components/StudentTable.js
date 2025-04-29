import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function StudentTable() { 
  const [students, setStudents] = useState([]);

  const navigate=useNavigate();

  const DisplayDetails =(id) => {
   navigate("/student/view/" + id);
  }


  const EditDetails =(id) => {
    navigate("/student/edit/" + id); 
   }

   const DeleteDetails=(id) => {
    if(window.confirm("Are you sure deleted ?")){
      fetch('http://localhost:8010/students/' + id, {
        method: 'DELETE', 
    })
    .then((res) => {
        alert('Student Data Deleted successfully!');
       window.location.reload(); 
    })
    .catch((err) => console.log(err.message));
    }
   }

  useEffect(() => {
    fetch('http://localhost:8010/students')
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.log(err.message));
  }, []);
  

  return (
    <div className="container">
      <h2 align="center">Student Record</h2>
      <div className="table-container">
        <Link to="/student/create" align="center">Add New Student</Link>
        <table align="center" cellPadding={10} cellSpacing={10} border={10}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Place</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students && students.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.place}</td>
                <td>{item.phoneno}</td>
                <td>
                  <button onClick={() =>(DisplayDetails(item.id))}>View</button>
                  <button onClick={() =>{EditDetails(item.id)}}>Edit</button>
                  <button onClick={() =>{DeleteDetails(item.id)}}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentTable;

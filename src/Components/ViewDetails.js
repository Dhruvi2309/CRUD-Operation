import React, { useEffect ,useState} from 'react'
import { Link, useParams } from 'react-router-dom'

function ViewDetails() {
  
  const {studentid}=useParams();
  const [studentData, setStudentData] = useState({});

useEffect(() => {
  fetch("http://localhost:8010/students/" + studentid)
    .then((res) => res.json())
    .then((data) => setStudentData(data))
    .catch((err) => console.log(err.message));
}, [studentid]);


 
  
  return (
    <div className='container'>
      <h1> Student Details</h1>
      <div className='details'>
      <p><strong>ID :</strong>{studentData.id}</p>
      <p><strong>Name :</strong>{studentData.name}</p>
      <p><strong>Place :</strong>{studentData.place}</p>
      <p><strong>Phone No:</strong>{studentData.phoneno}</p>

      </div>
      <Link to="/">Back</Link>

    </div>
    
  )
}

export default ViewDetails;

import React ,{useEffect,useState} from 'react';
import { useNavigate, useParams  , Link} from 'react-router-dom';

function EditStudent() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [validation, setValidation]=useState(false);

  const navigate = useNavigate(); 
  const {studentid}=useParams();
  // const [studentData, setStudentData] = useState({});

useEffect(() => {
  fetch("http://localhost:8005/students/" + studentid)
    .then((res) => res.json())
    .then((data) => {
            setId(data.id);
            setName(data.name);
            setPlace(data.place);
            setPhoneno(data.phoneno);
     
    })
    .catch((err) => console.log(err.message));
}, [studentid]);

const handleSubmit = (e) => {
      e.preventDefault();
          if (id.length === 0 || name.length === 0 || place.length === 0 || phoneno.length === 0) {
              setValidation(true); 
              alert("Please fill all fields");
              return; 
          }
      const studentData = { id, name, place, phoneno };
      console.log(studentData);
      
      fetch('http://localhost:8005/students/' + studentid, {
          method: 'PUT', 
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(studentData)
      })
      .then((res) => {
          alert('Student Data Updated successfully!');
          navigate('/'); 
      })
      .catch((err) => console.log(err.message));
  }
  return (
    <div className="container">
    <h2>Update Student</h2>
    <form onSubmit={handleSubmit}>

        <div className="mb-3" >
        <label htmlFor="id" className="form-label">ID :</label>
        <input type="text" className="form-control" name="id" value={id} onChange={e => setId(e.target.value)}  onMouseDown={() =>setValidation(true)} />
        </div>

        <div className="mb-3">
        <label htmlFor="name" className="form-label">Name :</label>
        <input type="text" className="form-control" name="name" value={name} onChange={e => setName(e.target.value)} onMouseDown={() =>setValidation(true)} />
        </div>

        <div className="mb-3">
        <label htmlFor="place" className="form-label">Place :</label>
        <input type="text" className="form-control" name="place" value={place} onChange={e => setPlace(e.target.value)} onMouseDown={() =>setValidation(true)}/>
        </div>

        <div className="mb-3">
        <label htmlFor="pno" className="form-label">Phone no:</label>
        <input type="number" className="form-control" name="pno" value={phoneno} onChange={e => setPhoneno(e.target.value)}onMouseDown={() =>setValidation(true)}/>
        </div>

        <div>
            <button type="submit" className='btn btn-primary'>Update</button> 
            <Link to="/" className='btn btn-danger'>Back</Link>
        </div>
    </form>
</div>
  )
}

export default EditStudent;

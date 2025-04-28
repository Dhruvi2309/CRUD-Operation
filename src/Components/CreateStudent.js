import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function CreateStudent() {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [place, setPlace] = useState("");
    const [phoneno, setPhoneno] = useState("");
    const [validation, setValidation]=useState(false);

    const navigate = useNavigate(); 

    const handleSubmit = (e) => {
        e.preventDefault();
            if (id.length === 0 || name.length === 0 || place.length === 0 || phoneno.length === 0) {
                setValidation(true); 
                alert("Please fill all fields");
                return; //
            }
        const studentData = { id, name, place, phoneno };
        console.log(studentData);
        
        fetch('http://localhost:8000/students', {
            method: 'POST', 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(studentData)
        })
        .then((res) => {
            alert('Student added successfully!');
            navigate('/'); 
        })
        .catch((err) => console.log(err.message));
    }

    return (
        
        <div className="container">
            <h2>Add New Student</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3" >
                <label htmlFor="id"  className="form-label">ID :</label>
                <input type="text"  className="form-control"name="id" value={id} onChange={e => setId(e.target.value)}  onMouseDown={() =>setValidation(true)} />
                </div>

                <div className="mb-3">
                <label htmlFor="name" className="form-label">Name :</label>
                <input type="text" className="form-control" name="name" value={name} onChange={e => setName(e.target.value)} onMouseDown={() =>setValidation(true)} />
                </div>

                <div className="mb-3">
                <label htmlFor="place"  className="form-label">Place :</label>
                <input type="text"  className="form-control" name="place" value={place} onChange={e => setPlace(e.target.value)} onMouseDown={() =>setValidation(true)}/>
                </div>

                <div className="mb-3">
                <label htmlFor="pno"  className="form-label">Phone no:</label>
                <input type="text"   className="form-control" name="pno" value={phoneno} onChange={e => setPhoneno(e.target.value)} onMouseDown={() =>setValidation(true)}/>
                </div>

                <div>
                    <button type="submit" className='btn btn-primary'> Save</button>
                    <Link to="/" className='btn btn-danger'>Back</Link>
                </div>
            </form>
        </div>
    );
}

export default CreateStudent;

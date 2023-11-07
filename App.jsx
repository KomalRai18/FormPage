import { useState } from "react";
import React from "react";
import axios from "axios";


export default function App() {
 
  const[fname, setFname] = useState("");
  const[lname, setLname] = useState("");
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[phone, setPhone] = useState("");
  const[gender, setGender] = useState("");
  const[suffix, setSuffix] = useState("")
  const[selectedFiles, setFiles] = useState(null)
 
  const handleEvent = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    // const reponse = await fetch("http://localhost:8080/app", {method: form.method, body: JSON.stringify(formData), headers:{
    //   'Content-type': 'application/json'
    // }});
    // const data = await reponse.json();
    axios.post('/api', formData)
    .then((response)=>{console.log(response)})
    .catch((err)=>{err})
    formData.append("cnic", selectedFiles)
    const formJSON = Object.fromEntries(formData.entries())
    console.log(formJSON);
  }
  return(
    <div className="my-3 container justify-items-center">
      <div className="text-center h-screen py-3 rounded" style={{backgroundColor: "lightskyblue"}}>
      <h2>REGISTRATION FORM</h2>
    </div>
    <form method="post" onSubmit={handleEvent}>
        <div className="container my-3 bg-light rounded">
        <div className="row my-3 pt-3">
                <div className="col-md-6">
                    <label htmlFor="suffix" className="form-label">Choose the Suffix</label>
                    <select name="suffix" id="suffix" className="form-select" value={suffix} onChange={(e) => setSuffix(e.target.value)}>
                        <option value="ms">Ms.</option>
                        <option value="mrs">Mrs.</option>
                        <option value="mr">Mr.</option>
                    </select>
                </div>
            </div>
            <div className="row g-3 my-3">
                <div className="col-md-6">
                    <label htmlFor="firstname" className="form-label">First Name</label>
                    <input type="text" className="form-control" name="fname" id="firstname" value={fname} onChange={(e)=> setFname(e.target.value)}/>
                </div>
                <div className="col-md-6">
                    <label htmlFor="lastname" className="form-label">Last Name</label>
                    <input type="text" id="lastname" className="form-control" name="lname" required value={lname} onChange={(e) => setLname(e.target.value)}/>
                </div>
        </div>
            
            <div className="row g-3 my-3">
                <div className="col-md-6">
                    <label htmlFor="Country" className="form-label">Country</label>
                    <input type="text" id="Country" className="form-control" readOnly value="Pakistan" />
                </div>
                <div className="col-md-6">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <div className="d-flex input-group">
                    <span id="code" className="input-group-text">+92</span>
                    <input type="tel" className="form-control" id="phone" name="phone" placeholder="3545345345" required size={14} pattern="[0-9]{10}" aria-describedby="code" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                </div>
            </div>
            <div className="row g-3 my-3">
                <div className="col-md-6">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" required placeholder="example@example.com" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                </div>
                <div className="col-md-6">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" required value={password}  onChange={(e) => setPassword(e.target.value)}/>
                    <small>Password must be between 8-12 characters.</small>
                </div>
            </div>
            <div className="row g-3 my-3">
              <div className="col-md-6">
                <div className="pb-2">Gender</div>
                  <div className="form-check form-check-inline">
                    <input type="radio" className="form-check-input" name="gender" id="male" value="male" checked= {gender==="male"} onChange={(e) => setGender(e.target.value)}/>
                    <label htmlFor="male" className="form-check-label">Male</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input type="radio" className="form-check-input" name="gender" id="female" value="female" checked= {gender==="female"} onChange={(e) => setGender(e.target.value)}/>
                    <label htmlFor="female" className="form-check-label">Female</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input type="radio" className="form-check-input" name="gender" id="other" value="other" checked= {gender==="other"} onChange={(e) => setGender(e.target.value)}/>
                    <label htmlFor="other" className="form-check-label">Other</label>
                  </div>
              </div>
              <div className="col-md-6">
                <label htmlFor="cnic" className="form-label">Upload CNIC</label>

                <input type="file" name="cnic" required id="cnic" className="form-control" onChange={(e) => setFiles(e.target.files[0])} />

              </div>
            </div>
            <span><button type="submit" className="btn btn-primary p-2">Submit</button></span>
      </div>
    </form>
    </div>
      
  )
}
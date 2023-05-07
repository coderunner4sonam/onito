import { firestore } from "../firebase";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

const usersRef = firestore.collection("users");
const initialFormData={
  name: "",
  age: "",
  sex: "",
  mobile: "",
  emergencyContact: "",
  address: "",
  state: "",
  city: "",
  pincode: "",
  country: "",
  occupation: "",
  religion: "",
  maritalStatus: "",
  bloodGroup: "",
  nationality: "",
  govtIdType: "",
  govtId: "",
  email: "",
  guardianName: "",
  guardiandetails: "",
}

function Form() {
  const [formData, setFormData] = useState(initialFormData);

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let errors = {};
    if (!formData.name) {
      errors.name = "Name is required";
    }
    if (!formData.age) {
      errors.age = "Age";
    }
    if (!formData.sex) {
      errors.sex = "Sex is required";
    }
    if (!formData.pincode) {
      errors.pincode = "pincode is required";
    }
    if (!formData.emergencyContact) {
      errors.emergencyContact = "Emergency contact number is required";
    } else if (!/^[6789]\d{9}$/.test(formData.emergencyContact)) {
      errors.emergencyContact = "Invalid emergency contact number";
    }
    if (formData.govtIdType === "aadhar") {
      if (!formData.govtId) {
        errors.govtId = "Aadhar number is required";
      } else if (!/^\d{12}$/.test(formData.govtId)) {
        errors.govtId = "Invalid Aadhar number";
      }
    } else if (formData.govtIdType === "pan") {
      if (!formData.govtId) {
        errors.govtId = "PAN number is required";
      } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.govtId)) {
        errors.govtId = "Invalid PAN number";
      }
    } else {
      errors.govtIdType = "Please select id";
    }
    if (formData.guardiandetails === "father") {
      if (!formData.guardianName) {
        errors.guardianName = "Father name is required";
      }
    } else if (formData.guardiandetails === "mother") {
      if (!formData.guardianName) {
        errors.guardianName = "Mother name is required";
      }
    } else {
      errors.guardiandetails = "Please select guardian name";
    }
    if (!formData.mobile) {
      errors.mobile = "Mobile number is required";
    } else if (!/^[6789]\d{9}$/.test(formData.mobile)) {
      errors.mobile = "Invalid mobile number";
    }
    if (formData.guardianMobile) {
      if (!/^[6789]\d{9}$/.test(formData.guardianMobile)) {
        errors.guardianMobile = "Invalid guardian mobile number";
      }
    }
    if (formData.email) {
      if (
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/.test(formData.email)
      ) {
        errors.email = "Invalid email address";
      }
    }
    setErrors(errors);
    return Object.keys(errors).length === 0; // Return true if there are no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      usersRef
        .add(formData)
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
        
          navigate("/tables");
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    } else {
      console.log("NotValidate", formData);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-inner-child">
        <h2> Personal Details</h2>
        <div className="form-inner-child-input">
          <div className="inner-child-input-indidiual">
            <label htmlFor="name">
              Name<span style={{ color: "red" }}>*</span>{" "}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span>{errors.name}</span>}
          </div>

          <div className="inner-child-input-indidiual">
            <label htmlFor="age">
              Date of Birth or Age<span style={{ color: "red" }}>*</span>{" "}
            </label>

            <input
              placeholder="DD/MM/YY or Age in Years"
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
            {errors.age && <span>{errors.age}</span>}
          </div>

          <div className="inner-child-input-indidiual">
            <label htmlFor="sex">
              Sex<span style={{ color: "red" }}>*</span> {"  "}{" "}
            </label>
            <select
              id="sex"
              name="sex"
              value={formData.sex}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.sex && <span>{errors.sex}</span>}
          </div>

          <div className="inner-child-input-indidiual">
            <label htmlFor="mobile">Mobile Number</label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
            />
            {errors.mobile && <span>{errors.mobile}</span>}
          </div>

          <div className="inner-child-input-indidiual">
            <label htmlFor="govtIdType">Govt Issued ID</label>
            <select
              id="govtIdType"
              name="govtIdType"
              value={formData.govtIdType}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="aadhar">Aadhar Card</option>
              <option value="pan">PAN Card</option>
            </select>
            {errors.govtIdType && <span>{errors.govtIdType}</span>}
          </div>
          <div className="inner-child-input-indidiual">
            <input
              type="text"
              id="govtId"
              name="govtId"
              value={formData.govtId}
              onChange={handleChange}
              placeholder="enter govt id"
            />
            {errors.govtId && <span>{errors.govtId}</span>}
          </div>
        </div>
      </div>
      <div className="form-inner-child">
        <h2> Address Details</h2>
        <div className="form-inner-child-input">
          <div className="inner-child-input-indidiual">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            {errors.address && <span>{errors.address}</span>}
          </div>

          <div className="inner-child-input-indidiual">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
            {errors.city && <span>{errors.city}</span>}
          </div>

          <div className="inner-child-input-indidiual">
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
            {errors.state && <span>{errors.state}</span>}
          </div>

          <div className="inner-child-input-indidiual">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
            {errors.country && <span>{errors.country}</span>}
          </div>

          <div className="inner-child-input-indidiual">
            <label htmlFor="pincode">Pin Code</label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
            />
            {errors.pincode && <span>{errors.pincode}</span>}
          </div>
        </div>
      </div>
      <div className="form-inner-child">
        <h2> Contact Details</h2>
        <div className="form-inner-child-input">
          <div className="inner-child-input-indidiual">
            <label htmlFor="guardiandetails">Guardian Details</label>
            <select
              id="guardiandetails"
              name="guardiandetails"
              value={formData.guardiandetails}
              onChange={handleChange}
            >
              <option value="">Enter Label</option>
              <option value="father">Father</option>
              <option value="mother">Mother</option>
            </select>
            {errors.guardiandetails && <span>{errors.guardiandetails}</span>}
          </div>
          <div className="inner-child-input-indidiual">
            <input
              type="text"
              id="guardianName"
              name="guardianName"
              value={formData.guardianName}
              onChange={handleChange}
            />
            {errors.guardianName && <span>{errors.guardianName}</span>}
          </div>
          <div className="inner-child-input-indidiual">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span>{errors.email}</span>}
          </div>
          <div className="inner-child-input-indidiual">
            <label htmlFor="mobile">Emergency Contact Number</label>
            <input
              type="text"
              id="emergencyContact"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleChange}
            />
            {errors.emergencyContact && <span>{errors.emergencyContact}</span>}
          </div>
        </div>
      </div>

      <div className="form-inner-child">
        <h2> Other Details</h2>
        <div className="form-inner-child-input">
          <div className="inner-child-input-indidiual">
            <label htmlFor="occupation">Occupation</label>
            <input
              type="text"
              id="occupation"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
            />
            {errors.occupation && <span>{errors.occupation}</span>}
          </div>

          <div className="inner-child-input-indidiual">
            <label htmlFor="religion">Religion</label>
            <input
              type="text"
              id="religion"
              name="religion"
              value={formData.religion}
              onChange={handleChange}
            />
            {errors.religion && <span>{errors.religion}</span>}
          </div>

          <div className="inner-child-input-indidiual">
            <label htmlFor="maritalStatus">Marital Status</label>
            <select
              id="maritalStatus"
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
            </select>
            {errors.maritalStatus && <span>{errors.maritalStatus}</span>}
          </div>

          <div className="inner-child-input-indidiual">
            <label htmlFor="bloodGroup">Blood Group</label>
            <input
              type="text"
              id="bloodGroup"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
            />
            {errors.bloodGroup && <span>{errors.bloodGroup}</span>}
          </div>

          <div className="inner-child-input-indidiual">
            <label htmlFor="nationality">Nationality</label>
            <input
              type="text"
              id="nationality"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
            />

            {errors.nationality && <span>{errors.nationality}</span>}
          </div>
        </div>
      </div>
      <div className="btn">
        <button onClick={()=>setFormData(initialFormData)}>
          Cancel
          <br />
          <span>(FSC)</span>
        </button>
        <button type="submit">
          Submit
          <br />
          <span>(X S)</span>
        </button>
      </div>
    </form>
  );
}

export default Form;

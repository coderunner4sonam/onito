import { firestore } from "../firebase.js";
import React, { useEffect, useState } from "react";
import "../App.css";

function Tables() {
  const [data, setData] = useState([]);

  useEffect(() => {
    firestore
      .collection("users")
      .get()
      .then((querySnapshot) => {
        const docsData = querySnapshot.docs.map((doc) => doc.data());
        setData(docsData);
      })
      .catch((error) => {
        console.log("Error getting documents:", error);
      });
  }, []);
  
  return (
    <table style={{border:"1px solid black"}}>
      <thead style={{backgroundColor:"green",color:"white"}}>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Sex</th>
          <th>Mobile</th>
          <th>Emergency Contact</th>
          <th>Address</th>
          <th>State</th>
          <th>City</th>
          <th>Pincode</th>
          <th>Country</th>
          <th>Occupation</th>
          <th>Religion</th>
          <th>Marital Status</th>
          <th>Blood Group</th>
          <th>Nationality</th>
          <th>Govt ID Type</th>
          <th>Govt ID</th>
          <th>Email</th>
          <th>Guardian Name</th>
          <th>Guardian Details</th>
        </tr>
      </thead>
      <tbody style={{border:"1px solid black"}}>
        {data?.map((formData, index) => (
          <tr key={index}>
            <td>{formData.name}</td>
            <td>{formData.age}</td>
            <td>{formData.sex}</td>
            <td>{formData.mobile}</td>
            <td>{formData.emergencyContact}</td>
            <td>{formData.address}</td>
            <td>{formData.state}</td>
            <td>{formData.city}</td>
            <td>{formData.pincode}</td>
            <td>{formData.country}</td>
            <td>{formData.occupation}</td>
            <td>{formData.religion}</td>
            <td>{formData.maritalStatus}</td>
            <td>{formData.bloodGroup}</td>
            <td>{formData.nationality}</td>
            <td>{formData.govtIdType}</td>
            <td>{formData.govtId}</td>
            <td>{formData.email}</td>
            <td>{formData.guardianName}</td>
            <td>{formData.guardiandetails}</td>
          </tr>
        ))}
      </tbody>

    </table>
  );
}

export default Tables;

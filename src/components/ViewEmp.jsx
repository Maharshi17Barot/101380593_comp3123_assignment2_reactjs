// ViewEmp.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ViewEmp.css";

const ViewEmp = () => {
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://assignment1-node-deplopy-720bef4c7571.herokuapp.com/api/v1/emp/employees/${employeeId}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setEmployee(data.get_employee);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchData();
  }, [employeeId]);

  const handleCloseClick = () => {
    navigate("/empscreen");
  };

  return (
    <div className="view-modal">
      <h3>Employee Details</h3>
      {employee ? (
        <>
          <p>
            <strong>First Name:</strong> {employee.first_name}
          </p>
          <p>
            <strong>Last Name:</strong> {employee.last_name}
          </p>
          <p>
            <strong>Email:</strong> {employee.email}
          </p>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <button className="close-btn" onClick={handleCloseClick}>
        Close
      </button>
    </div>
  );
};

export default ViewEmp;

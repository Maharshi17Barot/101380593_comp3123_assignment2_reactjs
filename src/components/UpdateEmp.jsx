import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/UpdateEmp.css";

const ViewEmp = ({ onClose }) => {
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    salary: "",
  });
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
        setFormData(data.get_employee);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchData();
  }, [employeeId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateClick = async () => {
    try {
      const response = await fetch(
        `https://assignment1-node-deplopy-720bef4c7571.herokuapp.com/api/v1/emp/employees/${employeeId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setEmployee(formData);

      onClose();
    } catch (error) {
      console.error("Error updating employee data:", error);
    }
  };

  const handleCloseClick = () => {
    navigate("/empscreen");
  };

  return (
    <div className="view-modal">
        <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form>
        <h3>Employee Details</h3>
        <div>
          <label htmlFor="first_name">First Name:</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="last_name">Last Name:</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="salary">Salary:</label>
          <input
            type="number"
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleInputChange}
          />
        </div>
        <button className="upt-btn" onClick={handleUpdateClick}>
          Update
        </button>
        <button className="cls-btn" onClick={handleCloseClick}>
          Close
        </button>
      </form>
    </div>
  );
};

export default ViewEmp;

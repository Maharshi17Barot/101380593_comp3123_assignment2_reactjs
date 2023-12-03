import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEmp = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://assignment1-node-deplopy-720bef4c7571.herokuapp.com/api/v1/emp/employees",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name,
            last_name,
            email,
            salary,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      window.alert("Employee Added successful");
      console.log("Employee Added successful");
      navigate("/empscreen");
    } catch (error) {
      window.alert("Error during Adding Employee");
      console.error("Error during Adding Employee:", error);
    }
  };

  const handleCancelClick = () => {
    navigate("/empscreen");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Add Employee</h3>

        <label htmlFor="first_name">First Name:</label>
        <input
          type="text"
          placeholder="First Name"
          id="first_name"
          name="first_name"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label htmlFor="last_name">Last name:</label>
        <input
          type="text"
          placeholder="Last Name"
          id="last_name"
          name="last_name"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
        />
        <label htmlFor="emp_email">Email:</label>
        <input
          type="email"
          placeholder="Email"
          id="emp_email"
          name="emp_email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="emp_salary">Salary</label>
        <input
          type="number"
          placeholder="100.00"
          id="emp_salary"
          name="emp_salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />
        <button
          type="submit"
          onClick={handleSubmit}
          id="button-desgin"
          className="button-desgin"
        >
          Add Employee
        </button>
        <button
          type="button"
          onClick={handleCancelClick}
          id="button-desgin"
          className="button-desgin"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddEmp;

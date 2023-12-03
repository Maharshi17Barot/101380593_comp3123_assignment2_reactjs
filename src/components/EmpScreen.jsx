import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/EmpScreen.css";

const DeleteConfirmationModal = ({ employee, onClose, onDelete }) => {
  const handleDelete = () => {
    onDelete(employee._id);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="delete-modal">
      <p>Are you sure you want to delete {employee.first_name}?</p>
      <button className="dlt-yes" onClick={handleDelete}>
        Yes
      </button>
      <button className="dlt-no" onClick={handleCancel}>
        No
      </button>
    </div>
  );
};

const EmpScreen = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://assignment1-node-deplopy-720bef4c7571.herokuapp.com/api/v1/emp/employees"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchData();
  }, []);

  const handleLogoutClick = () => {
    navigate("/login");
  };

  const handleAddEmp = () => {
    navigate("/addemp");
  };

  const handleDeleteClick = (employee) => {
    setSelectedEmployee(employee);
    setDeleteModalOpen(true);
  };

  const handleDelete = async (employeeId) => {
    try {
      const response = await fetch(
        `https://assignment1-node-deplopy-720bef4c7571.herokuapp.com/api/v1/emp/employees/${employeeId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Update the employee list after deletion
      const updatedEmployees = employees.filter(
        (employee) => employee._id !== employeeId
      );
      setEmployees(updatedEmployees);
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleViewClick = (employee) => {
    navigate(`/viewemp/${employee._id}`);
  };

  const handleUpdate = (employee) => {
    navigate(`/updateemp/${employee._id}`);
  };

  const handleCloseModal = () => {
    setDeleteModalOpen(false);
    setSelectedEmployee(null);
  };

  return (
    <div>
      <h3>List of Employees</h3>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={employee._id || index}>
              <td>{employee.first_name}</td>
              <td>{employee.last_name}</td>
              <td>{employee.email}</td>
              <td>
                <button
                  className="update"
                  key={`update-${employee._id || index}`}
                  onClick={() => handleUpdate(employee)}
                >
                  Update
                </button>
                <button
                  className="delete"
                  key={`delete-${employee._id || index}`}
                  onClick={() => handleDeleteClick(employee)}
                >
                  Delete
                </button>
                <button
                  className="view"
                  key={`view-${employee._id || index}`}
                  onClick={() => handleViewClick(employee)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="addEmp" onClick={handleAddEmp}>
        Add Employee
      </button>
      <button className="logout" onClick={handleLogoutClick}>
        Logout
      </button>

      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          employee={selectedEmployee}
          onClose={handleCloseModal}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default EmpScreen;

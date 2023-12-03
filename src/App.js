import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import EmpScreen from "./components/EmpScreen";
import AddEmp from "./components/AddEmp";
import ViewEmp from "./components/ViewEmp";
import UpdateEmp from "./components/UpdateEmp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/empscreen" element={<EmpScreen />} />
        <Route path="/addemp" element={<AddEmp />} />
        <Route path="/viewemp/:employeeId" element={<ViewEmp />} />
        <Route path="/updateemp/:employeeId" element={<UpdateEmp />} />
      </Routes>
    </Router>
  );
}

export default App;

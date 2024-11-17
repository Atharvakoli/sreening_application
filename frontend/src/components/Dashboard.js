import React, { useState } from "react";
import "../styles/Dashboard.css";
import { seedData } from "../api/apiService";

const Dashboard = () => {
  const [seedDb, setSeedDb] = useState(false);
  const [error, setError] = useState("");

  const seedData = async () => {
    try {
      await seedData();
    } catch (err) {
      setError(error);
    }
  };
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>{error}</div>
        <h1>Dashboard Overview</h1>
        <button onClick={() => seedData()}>seedDB</button>
      </header>
      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Users</h3>
          <p>1</p>
        </div>
        <div className="card">
          <h3>New Signups</h3>
          <p>1</p>
        </div>
        <div className="card">
          <h3>Active Users</h3>
          <p>1</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

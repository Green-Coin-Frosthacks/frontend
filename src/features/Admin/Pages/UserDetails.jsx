import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useUserModification from '../hooks/useUserModification';
import WaveChart from '../components/WaveChart';
import '../styles/UserDetails.style.scss';
import { Bar } from 'recharts';
import Barchart from '../components/Barchart';
function formatWeight(weightInGrams) {
  if (weightInGrams < 1000) {
    return `${weightInGrams.toFixed(2)} g`;
  } else {
    const kg = weightInGrams / 1000;
    return `${kg.toFixed(2)} kg`;
  }
}

function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { student, analytics, isStudentLoading, isAnalyticsLoading, isStudentError } = useUserModification(id);

  const formattedAnalytics = useMemo(() => {
    if (!analytics || analytics.length === 0) return [];
    
    // Create an array for the last 7 days including today
    const labels = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      labels.push(d.toISOString().split('T')[0]);
    }

    return labels.map(dateStr => {
      const dayData = analytics.find(item => item._id === dateStr);
      // Convert weight to kg for display if it's stored in grams, assuming grams context.
      // If it's already kg or raw points, just use totalWaste
      const rawValue = dayData ? dayData.totalWaste : 0;
      return {
        name: dateStr.substring(8, 10), // just the day number for chart
        waste: rawValue,
        fullDate: dateStr
      };
    });
  }, [analytics]);

  if (isStudentLoading || isAnalyticsLoading) return <div className="loading">Loading user data...</div>;
  if (isStudentError || !student) return <div className="error">Error loading user or user not found.</div>;

  return (
    <div className='user-details-page'>
      <button className="back-btn" onClick={() => navigate('/user-management')}>
        &larr; Back to Users
      </button>

      <div className="profile-section">
        <div className="avatar-large">
          {student.name?.charAt(0).toUpperCase()}
        </div>
        <div className="info-grid">
          <div className="info-card">
            <span className="label">Profile Name</span>
            <span className="value">{student.name}</span>
          </div>
          <div className="info-card">
            <span className="label">Roll Number</span>
            <span className="value">{student.rollNo || "N/A"}</span>
          </div>
          <div className="info-card">
            <span className="label">Role</span>
            <span className={`role-badge ${student.role}`}>{student.role}</span>
          </div>
          <div className="info-card">
            <span className="label">RFID UID</span>
            <span className="value">{student.uid || "Not Assigned"}</span>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <div className="stat-card">
          <h4>Waste Dropped Today</h4>
          <p className="stat-value">{formatWeight(student.wasteDroppedToday) || "0 g"}</p>
        </div>
        <div className="stat-card">
          <h4>Points Earned Today</h4>
          <p className="stat-value">{student.pointsEarnedToday || 0}</p>
        </div>
        <div className="stat-card">
          <h4>Total Points</h4>
          <p className="stat-value">{student.points || 0}</p>
        </div>
      </div>

      <div className="chart-section">
        <h3>Weekly Activity Overview</h3>
        <p className="chart-subtitle">Waste dropped over the last 7 days (grams)</p>
        <div className="chart-container">
          <Barchart 
            data={formattedAnalytics} 
            dataKey="waste" 
            yAxisLabel="Waste (g)" 
          />
        </div>
      </div>
    </div>
  );
}

export default UserDetails;

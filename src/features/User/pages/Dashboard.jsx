import React from 'react';
import useUser from '../hooks/useUser';
import useAuth from '../../Auth/hooks/useAuth';
import Barchart from '../../Admin/components/Barchart';
import '../styles/dashboard.style.scss';

const Dashboard = () => {
    const { user } = useAuth();
    const { weeklyAnalytics, isLoading, isError } = useUser();
    console.log(user);
    if (isLoading) {
        return (
            <div className="user-dashboard">
                <div className="dashboard-header">
                    <h1>Loading your dashboard...</h1>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="user-dashboard">
                <div className="dashboard-header">
                    <h1>Oops!</h1>
                    <p>There was an error loading your dashboard data.</p>
                </div>
            </div>
        );
    }

    // Process weekly analytics
    const analyticsData = weeklyAnalytics || [];

    // Attempt to match dates properly
    const today = new Date();
    // Use local date string formatted as YYYY-MM-DD
    const localDateString = today.toLocaleDateString('en-CA');

    const todayData = analyticsData.find(item => item._id === localDateString) || { totalWaste: 0 };
    const todayWaste = todayData.totalWaste;

    // Conversion rate: assuming some points calculation logic, like 1 GC per 10g of waste or similar.
    // If waste is stored in Grams, and 1 Kg is 10 points -> 1000g = 10 pts -> 1 pt = 100g.
    const todayPoints = Math.floor(todayWaste / 100);

    const chartData = analyticsData.map(d => ({
        name: d._id.substring(5), // Just show MM-DD
        value: d.totalWaste
    }));
    console.log(user);
    return (
        <div className="user-dashboard">
            <div className="dashboard-header">
                <h1>Welcome back, {user?.name || 'User'}!</h1>
                <p>Here is your recent waste drop activity.</p>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <span className="stat-title">Today's Waste Drop</span>
                    <span className="stat-value highlight">
                        {user.wasteDroppedToday >= 1000 ? (user.wasteDroppedToday / 1000).toFixed(2) + ' kg' : user.wasteDroppedToday + ' g'}
                    </span>
                </div>
                <div className="stat-card">
                    <span className="stat-title">Today's Earned Points</span>
                    <span className="stat-value accent">
                        {user.pointsEarnedToday}
                    </span>
                </div>
            </div>

            <div className="chart-section">
                <h2>Weekly Waste Drop Analytics (Grams)</h2>
                {chartData.length > 0 ? (
                    <Barchart
                        data={chartData}
                        dataKey="value"
                        yAxisLabel="Waste (g)"
                    />
                ) : (
                    <p>No waste dropped this week.</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;

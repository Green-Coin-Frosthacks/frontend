import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import './layout.styles.scss';

const MainLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className={`content-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      {/* Overlay for mobile when sidebar is active */}
      <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="content-wrapper">
        <Navbar toggleSidebar={toggleSidebar} />
        <section className="main-content">
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default MainLayout;
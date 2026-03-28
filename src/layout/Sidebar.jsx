import React from 'react';
import { LayoutDashboard, Users, Trash2, BarChart3, FileText, Settings, History, X, LogOut, TicketSlash } from 'lucide-react';
import useAuth from '../features/Auth/hooks/useAuth';
import logo from "../assets/images (2).png"
import { useLocation, useNavigate } from 'react-router-dom';
const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { user, handleLogout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "User Management",
      path: "/user-management",
      icon: <Users size={20} />,
    },
    {
      name: "Bin Configuration",
      path: "/bin",
      icon: <Trash2 size={20} />,
    },
    {
      name: "Leaderboard",
      path: "/leaderboard",
      icon: <BarChart3 size={20} />,
    },
    {
      name: "Marketplace",
      path: "/marketplace",
      icon: <TicketSlash size={20} />,
    },
    {
      name: "Transactions",
      path: "/transactions",
      icon: <History size={20} />,
    },
  ];

  const menueItemsUser = [
    {
      name: "Dashboard",
      path: "/users",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Leaderboard",
      path: "/leaderboard",
      icon: <BarChart3 size={20} />,
    },
    {
      name: "Marketplace",
      path: "/users/marketplace",
      icon: <TicketSlash size={20} />,
    },
    // {
    //   name: "My Orders",
    //   path: "/users/orders",
    //   icon: <FileText size={20} />,
    // },
    {
      name: "Transactions",
      path: "/users/transactions",
      icon: <History size={20} />,
    },
    {
      name: "Profile",
      path: "/users/profile",
      icon: <Users size={20} />,
    }
  ]

  return (
    <aside className={`sidebar ${isOpen ? 'show' : ''}`}>
      <div className="sidebar-header">
        <div className="logo-section">
          <div className="logo-icon">
            <img src={logo} alt="GreenCoin Logo" />
          </div>
          <div>
            <h3>Green Coin</h3>
            <p>CAMPUS ECO SYSTEM</p>
          </div>
        </div>
        <button className="mobile-close" onClick={toggleSidebar}>
          <X size={24} />
        </button>
      </div>

      <nav className="nav-menu">
        <span className="menu-label">{user?.role == "admin" ? 'ADMIN' : 'USER'}</span>
        {user.role === "admin" &&
          menuItems.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item.path)}
              className={`nav-item ${location.pathname === item.path ? "active" : ""
                }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </div>
          ))}
        {user.role === "user" &&
          menueItemsUser.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item.path)}
              className={`nav-item ${location.pathname === item.path ? "active" : ""
                }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </div>
          ))}
        <div className="divider" />
        {/* <div className="nav-item"><History size={20} /><span>History</span></div>
        <div className="nav-item"><Settings size={20} /><span>Settings</span></div> */}
        <div className="nav-item" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Logout</span>
        </div>
      </nav>

      {user?.role == "user" && (
        <div className="balance-card">
          <p>GREENCOIN POINT</p>
          <h2>{user?.points || 0}</h2>
          <span>SYSTEM REVENUES</span>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
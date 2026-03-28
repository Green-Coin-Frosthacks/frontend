import { Menu, Bell } from 'lucide-react';
import useAuth from '../features/Auth/hooks/useAuth';
import useAdmin from '../features/Admin/hooks/useAdmin';
import { useState, useEffect, useRef } from 'react';

const Navbar = ({ toggleSidebar }) => {
  const { user } = useAuth();
  const { notifications } = useAdmin();
  const [showNotifications, setShowNotifications] = useState(false);
  const [hasNew, setHasNew] = useState(false);
  const [prevNotifCount, setPrevNotifCount] = useState(0);
  const popupRef = useRef(null);

  useEffect(() => {
    // Frontend validation: check if new notifications came
    if (notifications && notifications.length > prevNotifCount) {
      setHasNew(true);
      setPrevNotifCount(notifications.length);
    }
  }, [notifications, prevNotifCount]);

  useEffect(() => {
    // Close popup if clicked outside
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) setHasNew(false); // Clear dot when opening
  };

  return (
    <header className="navbar" style={{ position: 'relative' }}>
      <div className="nav-left">
        <button className="menu-toggle" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
        <h2 className="page-title">{user.role === 'admin' ? 'Admin Dashboard' : 'User Dashboard'}</h2>
      </div>
      
      <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {user?.role === 'admin' && (
          <div style={{ position: 'relative' }}>
            <button 
              onClick={handleToggleNotifications} 
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '5px' }}
            >
              <Bell size={24} color="#555" />
              {hasNew && (
                <span style={{
                  position: 'absolute', top: '5px', right: '5px',
                  width: '10px', height: '10px', backgroundColor: 'red',
                  borderRadius: '50%', display: 'block'
                }}></span>
              )}
            </button>
            
            {showNotifications && (
              <div ref={popupRef} style={{
                position: 'absolute',
                top: '50px', right: '0',
                width: '50vw', maxWidth: '400px',
                maxHeight: '400px', overflowY: 'auto',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '12px',
                padding: '16px', zIndex: 1000,
                border: '1px solid rgba(255, 255, 255, 0.18)'
              }}>
                <h3 style={{ margin: '0 0 16px 0', borderBottom: '1px solid #eee', paddingBottom: '8px', fontSize: '1.2rem', color: '#333' }}>Notifications</h3>
                {!notifications || notifications.length === 0 ? (
                  <p style={{ color: '#777', textAlign: 'center' }}>No new notifications.</p>
                ) : (
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {notifications.map((notif) => (
                      <li key={notif._id || notif.id || Math.random()} style={{
                        padding: '12px', background: '#f9f9f9', borderRadius: '8px',
                        borderLeft: '4px solid #4CAF50', display: 'flex', flexDirection: 'column', gap: '6px'
                      }}>
                        <span style={{ fontSize: '0.9rem', color: '#444', lineHeight: '1.4' }}>
                          {notif.message}
                        </span>
                        {notif.createdAt && (
                          <span style={{ fontSize: '0.75rem', color: '#888' }}>
                            {new Date(notif.createdAt).toLocaleString(undefined, {
                              year: 'numeric', month: 'short', day: 'numeric', 
                              hour: '2-digit', minute: '2-digit'
                            })}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        )}
        <div style={{paddingBottom: "3px", cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '35px', height: '35px', borderRadius: '50%', backgroundColor: '#4CAF50', color: '#fff', fontWeight: 'bold'}} className="profile-avatar">
          { user?.name?.charAt(0)?.toUpperCase() || 'U' }
        </div>
      </div>
    </header>
  );
};

export default Navbar;
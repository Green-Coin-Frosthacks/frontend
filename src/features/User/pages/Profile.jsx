import React from 'react';
import useAuth from '../../Auth/hooks/useAuth';
import useUser from '../hooks/useUser';
import '../styles/profile.style.scss';

const Profile = () => {
    const { user } = useAuth();
    const { walletBalance, isLoading } = useUser();

    if (!user) {
        return <div className="user-profile">Loading profile...</div>;
    }

    // Get first letter of name for avatar placeholder
    const firstLetter = user.name ? user.name.charAt(0).toUpperCase() : 'U';

    return (
        <div className="user-profile">
            <div className="profile-header">
                <div className="profile-avatar" title="Update Profile Picture (Coming Soon)">
                    <div className="avatar-placeholder">
                        {firstLetter}
                    </div>
                </div>
                <div className="profile-title">
                    <h1>My Profile</h1>
                    <p>Manage your account details and view your wallet balance.</p>
                </div>
            </div>

            <div className="profile-card">
                <div className="wallet-section">
                    <div className="wallet-info">
                        <span className="wallet-label">Green Coin Balance</span>
                        <span className="wallet-amount">
                            {isLoading ? '...' : (walletBalance?.balance || '0.00')}
                            <span style={{ fontSize: '1rem', marginLeft: '8px', color: 'var(--text-secondary)' }}>
                                {walletBalance?.symbol || 'GC'}
                            </span>
                        </span>
                    </div>
                </div>

                <div className="details-grid">
                    <div className="detail-item">
                        <span className="detail-label">Name</span>
                        <span className="detail-value">{user.name}</span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">Email</span>
                        <span className="detail-value">{user.email}</span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">Roll Number</span>
                        <span className="detail-value">{user.rollNo || 'N/A'}</span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">UID (RFID)</span>
                        <span className="detail-value">{user.uid || 'N/A'}</span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">Role</span>
                        <span className="detail-value" style={{ textTransform: 'capitalize' }}>{user.role}</span>
                    </div>
                    <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                        <span className="detail-label">Wallet Address</span>
                        <span className="detail-value" style={{ fontSize: '0.9rem', color: 'var(--color-primary-600)' }}>
                            {user.walletAddress || 'N/A'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

import React from 'react'
import useAdmin from '../hooks/useAdmin'
import "../styles/leaderboard.style.scss"

function LeaderBoard() {
  const { leaderboard, isLoading } = useAdmin()

  if (isLoading) return <div className="loading-state">Loading leaderboard...</div>

  // Make sure we have enough data or fallback
  const top3 = leaderboard.slice(0, 3);
  const others = leaderboard.slice(3);

  // Helper to safely get user at index
  const rank1 = top3.length > 0 ? top3[0] : null;
  const rank2 = top3.length > 1 ? top3[1] : null;
  const rank3 = top3.length > 2 ? top3[2] : null;

  return (
    <div className='leaderboard-page'>
      <div className="leaderboard-header">
        <div className="title-section">
          <h2>Platform</h2>
          <h2 className="highlight">Leaderboard.</h2>
        </div>
        <div className="contributors-card">
          <p className="label">Eco Achivers</p>
          <p className="count">{leaderboard.length}</p>
        </div>
      </div>

      <div className="podium-section">
        {/* Rank 2 */}
        {rank2 && (
          <div className="podium-card rank-2-card">
            <div className="avatar-wrapper">
              <div className="avatar silver-border">{rank2.name.charAt(0).toUpperCase()}</div>
              <span className="rank-badge">RANK #2</span>
            </div>
            <p className="user-name">{rank2.name}</p>
            <div className="podium-box silver-bg">
              <h3 className="points">{rank2.points}</h3>
              <p className="pts-label">PTS</p>
            </div>
          </div>
        )}

        {/* Rank 1 */}
        {rank1 && (
          <div className="podium-card rank-1-card">
            <div className="crown-icon">👑</div>
            <div className="avatar-wrapper">
              <div className="avatar gold-border">{rank1.name.charAt(0).toUpperCase()}</div>
              <span className="rank-badge">RANK #1</span>
            </div>
            <p className="user-name">{rank1.name}</p>
            <div className="podium-box gold-bg">
              <h3 className="points">{rank1.points}</h3>
              <p className="pts-label">PTS</p>
            </div>
          </div>
        )}

        {/* Rank 3 */}
        {rank3 && (
          <div className="podium-card rank-3-card">
            <div className="avatar-wrapper">
              <div className="avatar bronze-border">{rank3.name.charAt(0).toUpperCase()}</div>
              <span className="rank-badge">RANK #3</span>
            </div>
            <p className="user-name">{rank3.name}</p>
            <div className="podium-box bronze-bg">
              <h3 className="points">{rank3.points}</h3>
              <p className="pts-label">PTS</p>
            </div>
          </div>
        )}
      </div>

      <div className='leaderboard-list'>
        {others.map((user) => (
          <div className="list-row" key={user._id}>
            <div className='rank-number'>
              {String(user.rank).padStart(2, '0')}
            </div>

            <div className="user-info">
              <div className='avatar-small'>
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className='name'>{user.name}</span>
            </div>

            <div className='score-info'>
              <div className="stat">
                <span className="stat-label">SCORE</span>
                <span className="stat-value">{user.points}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LeaderBoard

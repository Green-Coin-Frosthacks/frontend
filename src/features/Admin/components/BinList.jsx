import React from 'react'
import BinCard from './BinCard.jsx'
import { Activity } from 'lucide-react';

function BinList({ dustbins }) {
  const activeBins = dustbins.filter(bin => bin.status !== 'offline').length;

  return (
    <div className='bin-list'>
      <div className="list-header">
        <div className="flex items-center gap-2">
          <Activity size={20} style={{ color: 'var(--color-primary-500)' }} />
          <h3>Live Bin Status</h3>
        </div>
        <div className="status-badge">
          {activeBins} Active Bins
        </div>
      </div>

      <div className="cards-container">
        {dustbins.length > 0 ? (
          dustbins.map(bin => (
            <BinCard key={bin._id} bin={bin} />
          ))
        ) : (
          <p className="text-center py-8" style={{ color: 'var(--text-muted)' }}>No bins found. Create one to get started!</p>
        )}
      </div>
    </div>
  )
}

export default BinList
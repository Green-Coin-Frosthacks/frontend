import React from 'react'
import { Trash2, TrendingUp, TrendingDown, Minus } from 'lucide-react';

function BinCard({ bin }) {
  const percentage = ((bin.currentFillLevel / bin.capacity) * 100).toFixed(1);

  const getColor = () => {
    if (percentage > 85) return "red"
    if (percentage > 50) return "orange"
    return "green"
  }

  const getStatusIcon = () => {
    if (percentage > 85) return <TrendingUp size={16} style={{ color: '#ef4444' }} />
    if (percentage > 50) return <Minus size={16} style={{ color: 'var(--color-accent-500)' }} />
    return <TrendingDown size={16} style={{ color: 'var(--color-primary-500)' }} />
  }

  return (
    <div className='bin-card'>
      <div className='bin-left'>
        <div className='icon-wrapper'>
          <Trash2 size={24} />
        </div>

        <div className='bin-info'>
          <p className='bin-name'>{bin.name}</p>
          <p className='bin-capacity'>
            Max Capacity: {bin.capacity / 1000}kg
          </p>
          <p className='bin-capacity'>
            Waste Type: {bin.wasteType}
          </p>
        </div>
      </div>

      <div className='bin-right'>
        <div className="percentage-container">
          <span className="label">Fill Level</span>
          <div className="flex items-center gap-1">
            {getStatusIcon()}
            <span className={`percentage ${getColor()}`}>
              {percentage}%
            </span>
          </div>
        </div>

        <div className='progress-bar'>
          <div
            className={`fill ${getColor()}`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      </div>
    </div>
  )
}

export default BinCard

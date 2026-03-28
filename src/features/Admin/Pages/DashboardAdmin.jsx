import React from 'react'
import BasicdataCard from '../components/BasicdataCard'
import { Recycle, Trash, Trash2, User } from 'lucide-react'
import useAdmin from '../hooks/useAdmin'
import "../styles/dashboard.style.scss"
import WaveChart from '../components/WaveChart'
function DashboardAdmin() {
  const {students ,isLoading , dustbins , totalWaste ,weeklyAnalytics } = useAdmin();
  if(isLoading) return <div>Loading...</div>;
  const formattedData = weeklyAnalytics.map(item => ({
    name: item._id,
    value: Number(item.totalWaste.toFixed(2))
  }));
  console.log(weeklyAnalytics);
  return (
    <div className='dashboard-admin'>
      <div className='basic-data'>
        <BasicdataCard icon={<User size={30} />} title="Total Users" value={students.length} text="Number of students in the system" />
        <BasicdataCard color={"yellow"} icon={<Recycle size={30} />} title="Total Waste Deposited" value={totalWaste.totalWasteKG + " kg"} text="Total amount of waste deposited" />
        <BasicdataCard color={"green"} icon={<Trash size={30} />} title="Active Dustbins" value={dustbins.length} text="Number of dustbins in the system" />
      </div>
      <div className='analytics-data'>
        <div className='analytics-chart'>
          <WaveChart
            data={formattedData}
            dataKey="value"
            yAxisLabel="Waste (g)"
          />
        </div>
        <div className='analytics-dustbins'>
          <h3>Live Bin Status</h3>

          <div className='dustbin-list'>
            {dustbins.map((bin) => {
              const percentage = ((bin.currentFillLevel / bin.capacity) * 100).toFixed(2);

              return (
                <div className='dustbin-item' key={bin._id}>
                  
                  {/* Icon */}
                  <div className='bin-icon'><Trash2 size={20} /></div>

                  {/* Info */}
                  <div className='bin-info'>
                    <p className='bin-name'>{bin.name}</p>
                  </div>

                  {/* Status */}
                  <div className='bin-status'>
                    <p>{percentage}% Full</p>
                    <div className='bars'>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={i < Math.ceil(percentage / 20) ? "active" : ""}
                        />
                      ))}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardAdmin
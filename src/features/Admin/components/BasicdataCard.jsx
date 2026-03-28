import "../styles/datacard.style.scss"
function BasicdataCard({ title, value , icon , text , color  }) {
  return (
    <div className='basic-data-card'>
      <div className={`${color}`}>
        {icon}
      </div>
      <div>
        <h3>{title}</h3>
        <p>{value}</p>
        <p>{text}</p>
      </div>
    </div>
  )
}

export default BasicdataCard
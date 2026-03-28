import logo from '../../../assets/images (2).png'
import { useLocation } from 'react-router-dom'
function Brand() {
  const location = useLocation();
  return (
    <div style={{
        top: location.pathname === "/login" ? "10%" : "5%",
    }} className='brand'>
        <div className='top'>
            <img src={logo} alt="Logo" />
        </div>
        <div className='bottom'>
            <h2>
                Green <span>Coin</span>
            </h2>
            <p>Campus eco system</p>
        </div>
    </div>
  )
}

export default Brand
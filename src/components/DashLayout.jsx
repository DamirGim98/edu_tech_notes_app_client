import { Outlet } from 'react-router-dom'
import DashHeader from './DashHeader'

function DashLayout() {
  return (
    <div className="dash-wrapper">
      <DashHeader />
      <div className="dash-container">
        <Outlet />
      </div>
    </div>
  )
}

export default DashLayout

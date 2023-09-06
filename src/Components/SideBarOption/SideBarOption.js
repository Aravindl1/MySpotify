import React from 'react'
import './SideBarOption.css'

const SideBarOption = ({title='Home', Icon}) => {
  return (
    <div className='sidebarOption'>
        <div className="sidebarOption">
      {Icon && <Icon className="sidebarOption__icon" />}
      {Icon ? <h4>{title}</h4> : <p>{title}</p>}
    </div>
    </div>
  )
}

export default SideBarOption
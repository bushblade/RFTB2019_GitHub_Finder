import React, { useContext } from 'react'
import AlertContext from '../../context/alert/alertContext'

const Alert = () => {
  const { alert } = useContext(AlertContext)
  return (
    alert && (
      <div className={`alert alert-${alert.type}`}>
        <i className='fas fa-info-circle'> {alert.msg}</i>
      </div>
    )
  )
}
export default Alert

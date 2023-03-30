import React, { useState } from 'react'
import AppointmentBanner from '../AppointmentBanner/AppointmentBanner'
import AvailableAppointments from '../AvailableAppointments/AvailableAppointments'


const Appointment = () => {
  const [selectedData,setSelectedData] = useState(new Date())
  
  return (
    <div>
        <AppointmentBanner selectedData={selectedData} setSelectedData={setSelectedData}/>
        <AvailableAppointments selectedDate={selectedData} />
        
    </div>
  )
}

export default Appointment
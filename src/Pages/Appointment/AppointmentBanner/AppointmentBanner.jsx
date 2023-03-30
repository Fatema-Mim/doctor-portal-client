import { format } from 'date-fns'
import React from 'react'
import { DayPicker } from 'react-day-picker'
import chair from '../../../assets/images/chair.png'

const AppointmentBanner = ({selectedData,setSelectedData}) => {
  
  return (
    <div className="hero ">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <img src={chair} className="max-w-sm rounded-lg shadow-2xl"  alt='chair' />
    <div>
      <DayPicker
        mode='single'
        selected={selectedData}
        onSelect={setSelectedData}
      />
      <p>{format(selectedData, 'PP')}</p>
    </div>
  </div>
</div>
  )
}

export default AppointmentBanner
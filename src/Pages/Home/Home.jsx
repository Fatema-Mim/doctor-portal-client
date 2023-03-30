import React from 'react'
import Banner from './Banner'
import Contact from './Contact'
import InfoCards from './InfoCards/InfoCards'
import MakeAppointment from './MakeAppointment'
import Services from './Services/Services'
import Testimonial from './Testimonial/Testimonial'

const Home = () => {
  return (
    <div className="mx-5">
        <Banner/>
        <InfoCards/>
        <Services/>
        <MakeAppointment/>
        <Testimonial/>
        <Contact/>
    </div>
  )
}

export default Home
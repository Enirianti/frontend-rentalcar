import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import { getAllCars } from '../redux/actions/carsAction'
import Spinner from '../components/Spinner'
import { Col, Row, Divider, DatePicker, Checkbox, Modal } from 'antd'
import moment from 'moment'
import { bookCar } from '../redux/actions/bookingAction'
import StripeCheckout from 'react-stripe-checkout';
import AOS from 'aos';
import { useParams } from 'react-router-dom'
import 'aos/dist/aos.css';
const {RangePicker} = DatePicker
function Booking() {
  const {cars} = useSelector(state=>state.carReducer)
  const {loading} = useSelector(state=>state.alertsReducer)
  const[car, setcar] = useState({})
  const dispatch = useDispatch()
  const[from, setFrom] = useState()
  const[to, setTo] = useState()
  const[totalHours, setTotalHours] = useState(0)
  const[driver, setdriver] = useState(false)
  const[totalAmount, setTotalAmount]=useState(0)
  const[showModal, setShowModal] = useState(false)
  const { carid } = useParams()

  useEffect(() => {
    if(cars.length==0) {
      dispatch(getAllCars())
    }
    else
    {
      setcar(cars.find(o=>o.id===carid))
    }
  },[cars])

  useEffect(() => {
    setTotalAmount((totalHours * car.rentPerHour))
    if(driver) {
      setTotalAmount(totalAmount + (30*totalHours))
    }
  }, [driver, totalHours])

  function selectTimeSlots(values) {
    setFrom(values[0].format('MMM-DD-YYYY HH:mm'))
    setTo(values[1].format('MMM-DD-YYYY HH:mm'))

    setTotalHours(values[1].diff(values[0] , 'hours'))
  }

  // function bookNow() {
  //   const reqObj = {
  //     user : JSON.parse(localStorage.getItem('user')).id,
  //     car : car.id,
  //     totalHours,
  //     totalAmount,
  //     driverRequire: driver,
  //     bookedTimeSlots: {
  //       from,
  //       to
  //     }
  //   }
  //   dispatch(bookCar(reqObj))
  // }

  function onToken(token){
     const reqObj = {
      token,
      user : JSON.parse(localStorage.getItem('user')).id,
      car : car.id,
      totalHours,
      totalAmount,
      driverRequire: driver,
      bookedTimeSlots: {
        from,
        to
      }
    }
    dispatch(bookCar(reqObj))
  }

  return (
    <DefaultLayout>
        {loading && (<Spinner/>)}
        <Row justify='center' className='d-flex align-items-center' style={{minHeight:'90vh'}}>
          <Col lg={10} sm={24} xs={24} className='p-3'>
            <img src={car.image} className='carimg2 bs1 w-100' data-aos='flip-left' data-aos-duration='1500'/>
          </Col>

           <Col lg={10} sm={24} xs={24} className='text-right'>
            <Divider type='horizontal' dashed>Car Info</Divider>
            <div style={{textAlign: 'right'}}>
              <p>{car.name}</p>
              <p>{car.rentPerHour}Rent Per hour /-</p>
              <p>Fuel Type : {car.fuelType}</p>
              <p>Max Persons : {car.capacity}</p>
            </div>

            <Divider type='horizontal' dashed>Select Time Slots</Divider>
            <RangePicker showTime={{format: 'HH:mm'}} format='MM-DD-YYYY HH:mm' onChange={selectTimeSlots}/>
            <br />
            <button className='btn1 mt-2' onClick={()=>{setShowModal(true)}}>See Booked Slots</button>
            {from && to && (
            <div>
              <p>Total Hours: <b>{totalHours}</b></p>
              <p>Rent Per Hour: <b>{car.rentPerHour}</b></p>
              <Checkbox onChange={(e)=>{
                if(e.target.checked) {
                  setdriver(true);
                } else {
                  setdriver(false)
                }
              }}>Driver Required</Checkbox>
              <h3>Total Amount: {totalAmount}</h3>

              <StripeCheckout
              shippingAddress
        token={onToken}
        amount={totalAmount * 100}
        stripeKey="my_PUBLISHABLE_stripekey"
      >
        <button className='btn1'>Book Now</button> 
      </StripeCheckout>
            </div> )}
          </Col>
           {car.name && (
            <Modal visible={showModal} closable={false} footer={false} title='Booked time slots'>
                <div className='p-2'>
                  {car.bookedTimeSlots?.map(slot=>{
                    return <button className='btn1 mt-2'>{slot.from} - {slot.to}</button>
                  })}
                  <div className='text-right mt-5'>
                    <button className='btn1' onClick={()=>{setShowModal(false)}}>CLOSE</button>
                  </div>
              </div>
        </Modal>
           )}
        </Row>
    </DefaultLayout>
  )
}

export default Booking
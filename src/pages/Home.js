import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCars } from '../redux/actions/carsAction'
import { Button, Col, DatePicker, Row } from 'antd';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import moment from 'moment';
const { RangePicker } = DatePicker
function Home() {
  const {cars} = useSelector(state=>state.carReducer)
  const {loading} = useSelector(state=>state.alertsReducer)
  const [totalCars, setTotalcars] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllCars())
  },[])

  useEffect(() => {
     setTotalcars(cars)
  },[cars])

  function setFilter(values) {
  const selectedFrom = values[0];
  const selectedTo = values[1];

  let temp = [];

  for (const car of cars) {
    if (car.bookedTimeSlots.length === 0) {
      temp.push(car);
    } else {
      let isAvailable = true;

      for (const booking of car.bookedTimeSlots) {
        const bookingFrom = moment(booking.from);
        const bookingTo = moment(booking.to);

        if (
         selectedFrom.isBefore(bookingTo) &&
        selectedTo.isAfter(bookingFrom)
        ) {
          isAvailable = false;
          break;
        }
      }

      if (isAvailable) {
        temp.push(car);
      }
    }
  }

  setTotalcars(temp);
}


  return (
    <DefaultLayout>
    <Row className='mt-3' justify='center'>
        <Col lg={20} sm={24} className='d-flex justify-content-left'>
          <RangePicker showTime={{format: 'HH:mm'}} format='MM-DD-YYYY HH:mm' onChange={setFilter}/>
        </Col>
    </Row>
      {loading === true && (<Spinner/>)}
        <Row justify='center' gutter={16}>
          {totalCars.map(car=>{
            return<Col lg={5} sm={24} xs={24}>
                <div className='car p-2 bs1'>
                  <img src={car.image} className='carimg'/>
                  <div className='car-content d-flex align-items-center justify-content-between'>
                    <div className='text-left-pl-2'>
                        <p>{car.name}</p>
                        <p>Rent Per Hour {car.rentPerHour} /-</p>
                    </div>
                    <div>
                      <button className='btn1 mr-2'><Link to={`/booking/${car.id}`}>Book Now</Link></button>
                    </div>
                  </div>
                </div>
            </Col>
          })}

        </Row>
    </DefaultLayout>
  )
}

export default Home
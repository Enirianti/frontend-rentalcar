import React, { useState, useEffect } from "react";
import DefaulLayout from "../components/DefaultLayout";
import { Col, Row, Form, Input } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { addCar, editCar, getAllCars } from "../redux/actions/carsAction";
import Spinner from "../components/Spinner";
function EditCar(match) {
    const {cars} = useSelector(state=>state.carReducer)
    const dispatch = useDispatch()
    const { loading } = useSelector(state=>state.alertsReducer)
    const[car, setcar] = useState()
    const[totalCars, setTotalcars] = useState([])

     useEffect(() => {
       if(cars.length==0) {
             dispatch(getAllCars())
           }
           else
           {
             setTotalcars(cars)
             setcar(cars.find(o=>o.id==match.params.carid))
             console.log(car)
           }
      },[cars])

    function onFinish(values){
        values._id=car._id
        dispatch(editCar(values))
        console.log(values)
    }
    return (
        <DefaulLayout>
            {loading && (<Spinner />)}
            <Row justify='center mt-5'>
                <Col lg={12} sm={24} xs={24} className='p-2'>
                {totalCars.length>0 &&(<Form initialValues={car} className="bs1 p-2" layout="vertical" onFinish={onFinish}>
                    <h3>Edit Car</h3>
                    <hr />
                <Form.Item name='name' label='Car name' rules={[{required: true}]}>
                    <Input/>
                </Form.Item>
                 <Form.Item name='image' label='Image Url' rules={[{required: true}]}>
                    <Input/>
                </Form.Item>
                 <Form.Item name='rentPerHour' label='Rent Per Hour' rules={[{required: true}]}>
                    <Input/>
                </Form.Item>
                  <Form.Item name='capacity' label='Capacity' rules={[{required: true}]}>
                    <Input/>
                </Form.Item>
                  <Form.Item name='fueltype' label='Fuel Type' rules={[{required: true}]}>
                    <Input/>
                </Form.Item>
                <div className="text-right">
                <button className="btn1">Edit Car</button>
                </div>
                </Form>)}
                </Col>
            </Row>
        </DefaulLayout>
    )
}

export default EditCar
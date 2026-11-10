import React from "react";
import DefaulLayout from "../components/DefaultLayout";
import { Col, Row, Form, Input } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { addCar } from "../redux/actions/carsAction";
import Spinner from "../components/Spinner";
function AddCar() {
    const dispatch = useDispatch()
    const { loading } = useSelector(state=>state.alertsReducer)
    function onFinish(values){
        values.bookedTimeSlots=[]
        dispatch(addCar(values))
        console.log(values)
    }
    return (
        <DefaulLayout>
            {loading && (<Spinner />)}
            <Row justify='center mt-5'>
                <Col lg={12} sm={24} xs={24} className='p-2'>
                <Form className="bs1 p-2" layout="vertical" onFinish={onFinish}>
                    <h3>Add New Car</h3>
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
                <button className="btn1">Add Car</button>
                </div>
                </Form>
                </Col>
            </Row>
        </DefaulLayout>
    )
}

export default AddCar
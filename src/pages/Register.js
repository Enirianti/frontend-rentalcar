import React from 'react'
import {Row, Col, Form, Input} from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from '../redux/actions/userAction';
import AOS from 'aos';
import Spinner from '../components/Spinner';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();
function Register() {
  const dispatch = useDispatch()
  const {loading} = useSelector(state=>state.alertsReducer)
  function onFinish(values) {
    dispatch(userRegister(values))
    console.log(values)
  }

  return (
    <div className='login'>
        {loading && (<Spinner />)}
        <Row gutter={16} className='d-flex-align-items-center'>
            <Col lg={16} style={{position: "relative"}} >
              <img 
              data-aos = 'slide-left'
              data-aos-duration='1500'
              src= "https://images.unsplash.com/photo-1614687154052-e05046c3feec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3Dhttps://images.unsplash.com/photo-1614687154052-e05046c3feec?q=80&w=808&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
              <h1 className='login-logo'>Rental Car</h1>
            </Col>
            <Col lg={8} className='text-left p-5'>
            <Form layout='vertical' className='login-form p-5' onFinish={onFinish}>
              <h1>Register</h1>
              <hr/>
              <Form.Item name='username' label='Username' rules={[{required: true}]}>
                <Input/>
              </Form.Item>
              <Form.Item name='password' label='Password' rules={[{required: true}]}>
                <Input/>
              </Form.Item>
              <Form.Item name='cpassword' label='Confirm Password' rules={[{required: true}]}>
                <Input/>
              </Form.Item>
              <button className='btn1 mt-2 mb-3'>Register</button>
              <br />
              <Link to="/login">Click here to Login</Link>
            </Form>
            </Col>
        </Row>
    </div>
  )
}

export default Register
import React from 'react'
import { Button, Dropdown, Row, Col } from 'antd';
import { Link } from 'react-router-dom';

function DefaulLayout(props) {
  const user = JSON.parse(localStorage.getItem('user'))
  const items = [
     {
    key: '1',
    label: (
      <a  href="/">
        Home
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a  href="/userbooking">
        Booking
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a  href="/admin">
        Admin
      </a>
    ),
  },
  {
    key: '4',
    label: (
      <li onClick={() => {
        localStorage.removeItem('user');
        window.location.href='/login'
      }} style={{color:'orangered'}}>Logout</li>
    ),
  },
];
  return (
    <div>
        <div className='header bs1'>
          <Row gutter={16} justify='center'>
            <Col lg = {20} sm = {24} xs = {24}>
             <div className='d-flex justify-content-between'>
                <h1><b><Link to= '/' style={{color: 'black'}}>Rental Car</Link></b></h1>
                       
          <Dropdown
            menu={{
              items,
            }}
            placement="bottom"
          >
            <Button>{user.username}</Button>
          </Dropdown>
            </div>
            </Col>
          </Row>
           
            </div>
            <div className='content'>
                {props.children}
            </div>
            <div className='footer text-center'>
              <hr />
              <p>Rental Car @2026</p>
            </div>
    </div>
  )
}

export default DefaulLayout
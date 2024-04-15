import React from 'react';
import { Col, DatePicker, Form, Input, Row, Select, message } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { showLoading, hideLoading } from '../../redux/slice';
import TextArea from 'antd/es/input/TextArea';

const { Option } = Select;

const IncomeForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post('/user/income', {
        ...values
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.success);
        navigate('/');
      } else {
        message.error(res.data.success);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error('Something went wrong');
    }
  };

  return (
    <>
    <h1 className='text-left p-4 '>Income</h1>
    <div className='p-1 text-center'>
      <h3>Total Income $</h3>
    </div>
    <div className='transaction p-4 '>
     
      <Form layout='vertical' onFinish={handleFinish} className='m-3'>
        <Row gutter={20}>
            <Col xs={24} md={12} lg={8}>
            <Form.Item
            
              name='description'
              rules={[{ required: true, message: 'Please enter description' }]}
            >
              <Input type='text' placeholder='Income title' />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
            <Col xs={24} md={12} lg={8}>
            <Form.Item
              
              name='amount'
              rules={[{ required: true, message: 'Please enter amount' }]}
            >
              <Input type='text' pattern="[0-9]*" title="Please enter only numeric digits" placeholder='Income amount' />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
            <Col xs={24} md={12} lg={8}>
            <Form.Item
              
              name='category'
              rules={[{ required: true, message: 'Please select category' }]}
            >
              <Select placeholder='Select category'>
                <Option value='salary'>Salary</Option>
                <Option value='freelancing'>Freelancing</Option>
                <Option value='stocks'>Stocks</Option>
                <Option value='bitcoin'>Bitcoin</Option>
                <Option value='youtube'>Youtube</Option>
                <Option value='marketing'>Marketing</Option>
                <Option value='other'>Others</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      
        <Row gutter={20}>
            <Col xs={24} md={12} lg={8}>
            <Form.Item
              
              name='date'
              rules={[{ required: true, message: 'Please select date' }]}
            >
             <DatePicker placeholder='Select date' />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col xs={24} md={12} lg={8}>
        
              <Form.Item
             
                name='reference'
                rules={[{ required: true, message: 'Please enter reference' }]}
              >
                 <TextArea rows={4} placeholder='Enter reference' />
              </Form.Item>
          
          </Col>
        </Row>
        <div className='text-left'>
          <button className='btn btn-primary' type='submit'>
            Submit
          </button>
        </div>
      </Form>
    </div>
    </>
  );
};

export default IncomeForm;

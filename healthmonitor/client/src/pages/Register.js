import React from 'react'
import {Form,Input, message} from 'antd';
import '../styles/Register.css'
import  axios from "axios";
import { Link,useNavigate } from 'react-router-dom'
import { hideLoading, showLoading } from '../redux/feature/slice';
import { useDispatch } from 'react-redux';

const Register = () => {

  const navigate=useNavigate();
  const dispatch=useDispatch()
  const onFinishHandler =async(values) => {
    try{
      dispatch(showLoading())
      const res=await axios.post('/user/register', values);
      dispatch(hideLoading())
      if(res.data.success){
        message.success('Register successfully');
        navigate('/login')
      }
      else{
        message.error(res.data.message);
      }
    } 
    catch(err){
      console.log(err);
      dispatch(hideLoading())
      message.error(err.message || "Something went wrong")
    } 
}

return (
    <>
        <div className='form-container'>
            <Form layout='vertical' onFinish={onFinishHandler} className='register-form'>
                <h2 className='text-center'>Register form</h2>
                <Form.Item label="Name" name="name">
                    <Input required type='text' />
                </Form.Item>
                <Form.Item label="Email" name="email">
                    <Input required type='email' />
                </Form.Item>
                <Form.Item label="Password" name="password">
                    <Input required type='password' />
                    </Form.Item>
                    <Link to="/login" className='ms-2'>Already a user login here</Link><br /><br />
                    <button className='btn btn-primary' type='submit'>
                        Register
                    </button>
                
            </Form>
        </div>
    </>
)};
export default Register
import React from 'react'
import {Form,Input, message,Image} from 'antd';
import '../styles/Register.css'
import  axios from "axios";
import { Link,useNavigate } from 'react-router-dom'
import { hideLoading, showLoading } from '../redux/slice';
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
            <Image src='https://static.theprint.in/wp-content/uploads/2022/09/ANI-20220907045837.jpg' 
     alt='connect to internet'
     crossOrigin="anonymous" 
        width={300}
        height={100}></Image>

                <h2 className='text-center'>Register form</h2><br></br>
                <Form.Item label="Username" name="username">
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
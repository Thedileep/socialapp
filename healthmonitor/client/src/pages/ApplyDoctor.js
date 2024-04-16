import Layout from '../components/Layout'
import React from 'react'
import {Col, Form, Input, Row, TimePicker,message} from 'antd'
import {useDispatch,useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {showLoading,hideLoading} from '../redux/feature/slice'
import moment from 'moment'

const ApplyDoctor = () => {

	const {user}=useSelector(state=>state.user)
	const navigate=useNavigate()
	const dispatch=useDispatch()

	const handleFinish=async(values)=>{
		try{
			dispatch(showLoading())
			const res=await axios.post('/user/apply-doctor',
			{
				...values,
				 userId:user._id,
				 timing: [
					moment(values.timing[0]).format("HH:mm"),
					moment(values.timing[1]).format("HH:mm"),
				  ],
				},
			{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
			dispatch(hideLoading())
			if(res.data.success){
				message.success(res.data.success);
				navigate('/')
			}
			else{
				message.error(res.data.success)
			}
		}
		catch(error){
			dispatch(hideLoading())
			console.log(error);
			message.error('something went wrong')
		}
	}

  return (
	<Layout>
	<h1 className='text-center'>Apply Doctor</h1>
	<Form layout='vertical' onFinish={handleFinish} className='m-3'>
		<h4>Personal Detials</h4>
		<Row gutter={20}>
			<Col xs={24} md={24} lg={8}>
				<Form.Item 
				label="First Name:" name="firstName"
				 required rules={[{required:true}]}>
					<Input type='text' placeholder='enter first name' />
				</Form.Item>
			</Col>
			<Col xs={24} md={24} lg={8}>
				<Form.Item 
				label="Last Name:" name="lastName"
				 required rules={[{required:true}]}>
					<Input type='text' placeholder='enter last name' />
				</Form.Item>
			</Col>
			<Col xs={24} md={24} lg={8}>
				<Form.Item 
				label="Phone:" name="phone"
				 required rules={[{required:true}]}>
					<Input type='text' placeholder='enter phone number' />
				</Form.Item>
			</Col>
			<Col xs={24} md={24} lg={8}>
				<Form.Item 
				label="Email:" name="email"
				 required rules={[{required:true}]}>
					<Input type='email' placeholder='email' />
				</Form.Item>
			</Col>
			<Col xs={24} md={24} lg={8}>
				<Form.Item 
				label="Website:" name="website"
				 required rules={[{required:true}]}>
					<Input type='text' placeholder='website name' />
				</Form.Item>
			</Col>

			<Col xs={24} md={24} lg={8}>
				<Form.Item 
				label="Address:" name="address"
				 required rules={[{required:true}]}>
					<Input type='text' placeholder='address name' />
				</Form.Item>
			</Col>
        
		</Row>
		<h4>Professional Detials:</h4>
		<Row gutter={20}>
			<Col xs={24} md={24} lg={8}>
				<Form.Item 
				label="Speacilization:" name="speacilization"
				 required rules={[{required:true}]}>
					<Input type='text' placeholder='speacilization' />
				</Form.Item>
			</Col>
			<Col xs={24} md={24} lg={8}>
				<Form.Item 
				label="Experiance:" name="experiance"
				 required rules={[{required:true}]}>
					<Input type='text' placeholder='enter experiance' />
				</Form.Item>
			</Col>
			<Col xs={24} md={24} lg={8}>
				<Form.Item 
				label="Fees Per Cunsaltation:" name="feesPerCunsaltation"
				 required rules={[{required:true}]}>
					<Input type='number' placeholder='enter fees' />
				</Form.Item>
			</Col>
			<Col xs={24} md={24} lg={8}>
				<Form.Item 
				label="Timing:" name="timing"
				 required >
					<TimePicker.RangePicker format="HH:mm"/>
				</Form.Item>
			</Col>
			<Col xs={24} md={24} lg={8}></Col>
			<Col xs={24} md={24} lg={8}>
			<button className="btn btn-primary form-btn" type='submit'>Submit</button>
			</Col>
		</Row>
		
		</Form>
	</Layout>
  )
}

export default ApplyDoctor
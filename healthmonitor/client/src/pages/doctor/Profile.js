import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { useParams } from 'react-router-dom';
import { Col, Form, Input, Row, TimePicker, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { showLoading, hideLoading } from '../../redux/feature/slice';
import moment from  'moment'

const Profile = () => {
    const { user } = useSelector((state) => state.user);
    const [doctor, setDoctor] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const handleFinish = async (values) => {
      try {
        dispatch(showLoading());
        const res = await axios.post(
          "/user/updateProfile",
          {
            ...values,
            userId: user._id,
            timing: [
              moment(values.timing[0]).format("HH:mm"),
              moment(values.timing[1]).format("HH:mm"),
            ],
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch(hideLoading());
        if (res.data.success) {
          message.success(res.data.message);
          navigate("/");
        } else {
          message.error(res.data.message);
        }
      } catch (error) {
        dispatch(hideLoading());
        console.log(error);
        message.error("Somthing Went Wrrong ");
      }
    };
   
    const getDoctorInfo = async () => {
      try {
        const res = await axios.post(
          "/user/getDoctorInfo",
          { userId: params.id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (res.data.success) {
          setDoctor(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      getDoctorInfo();
      //eslint-disable-next-line
    }, []);
    return (
      <Layout>
        <h1>Manage Profile</h1>
        {doctor && (
          <Form
            layout="vertical"
            onFinish={handleFinish}
            className="m-3"
            initialValues={{
              ...doctor,
              timing:[
                moment(doctor.timing[0], "HH:mm"),
                moment(doctor.timing[1], "HH:mm"),
              ] 
            }}
          >
            <h4 className="">Personal Details : </h4>
            <Row gutter={20}>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="First Name"
                  name="firstName"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="your first name" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="your last name" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Phone No"
                  name="phone"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="your contact no" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Email"
                  name="email"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="email" placeholder="your email address" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item label="Website" name="website">
                  <Input type="text" placeholder="your website" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Address"
                  name="address"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="your clinic address" />
                </Form.Item>
              </Col>
            </Row>
            <h4>Professional Details :</h4>
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
                  label="Fees Per Cunsaltation"
                  name="feesPerCunsaltation"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="your contact no" />
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
                <button className="btn btn-primary form-btn" type="submit">
                  Update
                </button>
              </Col>
            </Row>
          </Form>
        )}
      </Layout>
    );
  };
  
  export default Profile;
  
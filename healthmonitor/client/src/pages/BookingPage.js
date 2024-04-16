import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import {useParams} from 'react-router-dom'
import {DatePicker,TimePicker,message} from 'antd'
import moment from 'moment'
import { hideLoading, showLoading } from '../redux/feature/slice';
import { useDispatch, useSelector } from "react-redux";

  
  const BookingPage = () =>  {

  const { user } = useSelector((state) => state.user);
  const params=useParams();
  const [doctors,setDoctor]=useState([])
  const [date,setDate]=useState()
  const [time,setTime]=useState();
  const dispatch=useDispatch()
  const [isAvailable,setIsAvailable]=useState(false)

  // eslint-disable-next-line
  const getUserData=async()=>{
    try{
      // eslint-disable-next-line
      const res=await axios.post('/user/getDoctorById',
      {
        doctorId:params.doctorId
    },
    {
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      
      })
      if(res.data.success){
        setDoctor(res.data.data)
      }
    }
    catch(err){
      console.log(err)
    }
  }

  const handleAvailability = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/user/booking-availbility",
        { doctorId: params.doctorId, date, time },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        setIsAvailable(true);
        console.log(isAvailable);
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  const handleBooking = async () => {
    try {
      setIsAvailable(true);
      if (!date && !time) {
        return alert("Date & Time Required");
      }
      dispatch(showLoading());
      const res = await axios.post(
        "/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctors,
          userInfo: user,
          date: date,
          time: time,
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
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(()=>{
    getUserData();
    // eslint-disable-next-line
  },[]);

	return (
	 <Layout>
        <h1 className='p-3 text-warning'>Booking Page</h1>
        <div className="container m-2">
            {doctors && (
            <div>
            <h4>
            Dr. {doctors.firstName} {doctors.lastName}
            </h4>
            <h4>Fees: {doctors.feesPerCunsaltation}</h4>
            <h4>
            Timings: {doctors.timing && doctors.timing.length === 2 ? 
            `${doctors.timing[0]} - ${doctors.timing[1]}` : 'Not available'}
            </h4>

            <div className="d-flex flex-column">
            <DatePicker
                aria-required={"true"}
                className="m-2"
                format="DD-MM-YYYY"
                onChange={(value) => {
                  setDate(moment(value).format("DD-MM-YYYY"));
                }}
              />
              <TimePicker
                aria-required={"true"}
                format="HH:mm"
                className="mt-3"
                onChange={(value) => {
                  setTime(moment(value).format("HH:mm"));
                }}
              />

              <button
                className="btn btn-primary mt-2"
                onClick={handleAvailability}
              >
                Check Availability
              </button>

              <button className="btn btn-dark mt-2" onClick={handleBooking}>
                Book Now
              </button>
            </div>
            </div>
            )}
        </div>
	  </Layout>
	);
  }
  
  export default BookingPage;
  
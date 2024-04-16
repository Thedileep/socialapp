import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import Layout from '../components/Layout'
import DoctorList from '../components/DoctorList'
import {Row} from 'antd'

const HomePage = () => {

  const [doctor,setDoctor]=useState([])

  // eslint-disable-next-line
  const getUserData=async()=>{
    try{
      // eslint-disable-next-line
      const res=await axios.get('/user/getALlDoctors',{
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

  useEffect(()=>{
    getUserData();
  },[]);

  return (
    <Layout>
    <h3 className='text-center'>HomePage</h3> 
    <Row>
      {doctor && doctor.map(doctor=>(
        <DoctorList doctor={doctor}/>
      ))}
    </Row>
    </Layout>
  )
}

export default HomePage
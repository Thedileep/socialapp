import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import { Table,message } from 'antd';


const Doctors = () => {

	const [doctors,setDoctors]=useState([]);

    const getDoctors=async()=>{
      try{
        const res=await axios.get('/user/getAllDoctors',{
          headers:{
            Authorization: "Bearer "+localStorage.getItem('token')
          }
        })

        if(res.data.success){
          setDoctors(res.data.data)
        }

      }
      catch(error){
        console.log(error)
      }
    }

    useEffect(()=>{
      getDoctors()
    },[])

	const handleStatus=async(record,status)=>{
			try{
				const res=await axios.post('/user/status',{
					doctorId:record._id,
					userId:record.userId,
					status:status
				},
				{
					headers:{
						Authorization: "Bearer "+ localStorage.getItem("token")
					}
				})

			if(res.data.success){
				message.success(res.data.message)
				window.location.reload();
			}

			}
			catch(error){
				console.log(error)
				message.error('something went wrong')
			}
	}

	const columns=[
		{
			title:'Name',
			dataIndex:'name',
			render: (text, record) => (
				<span>{record.firstName} {record.lastName}</span>
			  )
		},
		{
			title:'Email',
			dataIndex:'email'
		  },
		  {
			title:'Status',
			dataIndex:'status'
		  },
		  {
			title:'Phone',
			dataIndex:'phone'
		  },
		  {
			title: "Actions",
			dataIndex: "actions",
			render: (text, record) => (
			<div className="d-flex">
			{record.status === "pending" ? (
			<button className="btn btn-success" onClick={()=>{handleStatus(record,'approved')}}>Approve</button>
			) : (
			<button className="btn btn-danger">Reject</button>
			 )}
			</div>
			)
			},
	]


  return (
	<Layout>
		<h4>Doctors Page</h4>
		<Table columns={columns} dataSource={doctors} />
	</Layout>
  )
}

export default Doctors
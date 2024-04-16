import React, { useEffect } from "react";
import { Navigate } from 'react-router-dom'
import axios  from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading, showLoading } from '../redux/feature/slice';
import { setUser } from "../redux/feature/userSlice";

export default function Protected({ children }) {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);

     // eslint-disable-next-line 
    const getUser =async () => {
        try {
            dispatch(showLoading());
            const res=await axios.post('/user/getUserData',
            {
                token:localStorage.getItem('token')
            },
            {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            dispatch(hideLoading())
            if(res.data.success){
                dispatch(setUser(res.data.data))
            }
            else{
                localStorage.removeItem('token');
                return <Navigate to="/login"/>
                
            }           
          
        } catch (err) {
            dispatch(hideLoading(err));
            localStorage.removeItem('token');
            console.error("Error while fetching user data:", err.message);
        }
    };

    useEffect(() => {
        if(!user) {
            getUser();
        }
    }, [user, getUser]);

    if (localStorage.getItem('token')) {
        return children;
    } else {
        return <Navigate to="/login" />;
    }
}

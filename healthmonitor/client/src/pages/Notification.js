import React from 'react';
import Layout from '../components/Layout';
import { Tabs, message, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../redux/feature/slice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Notification = () => {
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post('/user/notification', { userId: user._id }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      dispatch(hideLoading());
      if (res.data.data) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error('Something went wrong');
    }
  };

  const handleDeleteRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post('/user/delete-notification', { userId: user._id }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      dispatch(hideLoading());
      if (res.data.data) {
        message.success(res.data.message);
        window.location.reload();
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error('Something went wrong');
    }
  };

  return (
    <Layout>
      <h4 className='p-3 text-center'>Notification Page</h4>
      <Tabs>
        <Tabs.TabPane tab='Unread' key={0}>
          <div className='d-flex justify-content-end'>
            <Button type='primary' className='p-2' onClick={handleRead}>Mark All Read</Button>
          </div>
          {user?.notification.map((notificationMsg) => (
            <div className='card' style={{ cursor: 'pointer' }} >
              <div className='card-text' onClick={() => navigate(notificationMsg.onClickPath)}>{notificationMsg.message}
              </div>
            </div>
          ))}
        </Tabs.TabPane>

        <Tabs.TabPane tab='Read' key={1}>
          <div className='d-flex justify-content-end'>
            <Button type='primary' className='p-2' style={{ cursor: 'pointer' }} onClick={handleDeleteRead}>Delete All Read</Button>
          </div>
          {user?.seennotification.map((notificationMsg) => (
            <div className='card' style={{ cursor: 'pointer' }} >
              <div className='card-text' onClick={() => navigate(notificationMsg.onClickPath)}>{notificationMsg.message}
              </div>
            </div>
          ))}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
};

export default Notification;

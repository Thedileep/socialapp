import React from 'react';
import '../styles/Layout.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { message } from 'antd';

const Layout = ({ children }) => {
  const { user } = useSelector(state => state.user);
  //console.log(user)
  const location = useLocation();
  const navigate = useNavigate();

  const adminMenu = [
    {
      name: 'Home',
      path: '/',
      icon: 'fa-solid fa-house'
    },
    {
      name: 'Users',
      path: '/users',
      icon: 'fa-solid fa-users'
    },
   
  ];

  const userMenu = [
    {
      name: 'Dashboard',
      path: '/',
      icon: 'fa-solid fa-chart-line'
    },
    {
      name: 'Expense ',
      path: '/expense-tracking',
      icon: 'fa-solid fa-circle-dollar-to-slot'
    },
    {
      name: 'Income ',
      path: '/income-management',
      icon: 'fa-solid fa-wallet'
    },

  ];

  const sidebarMenu = user?.isAdmin ? adminMenu : userMenu;

  const handleLogout = () => {
    localStorage.removeItem('token');
    message.success('Logout successful');
    navigate('/login');
  };

  return (
    <div className='main'>
      <div className='layout'>
        <div className='sidebar'>
          <div className='logo'>
            <h6>Personal Finance</h6>
            <hr />
          </div>
          <div className='menu'>
            {sidebarMenu.map(menu => (
              <div className={`menu-item ${location.pathname === menu.path ? 'active' : ''}`} key={menu.path}>
                <i className={menu.icon}></i>
                <Link to={menu.path}>{menu.name}</Link>
              </div>
            ))}
          </div><br></br>
          <div className={`menu-item`} onClick={handleLogout}>
            <i className='fa-solid fa-right-from-bracket'></i>
            <Link to="/login">Logout</Link>
          </div>
        </div>
        <div className='content'>
          <div className="header">
            <div className="header-content" style={{ cursor: 'pointer' }}>
              
             <h4 className='text-secondary'>Username: <Link to={`/profile/${user?._id}`}>{user?.username}</Link></h4>
            </div>
          </div>
          <div className='body'>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;

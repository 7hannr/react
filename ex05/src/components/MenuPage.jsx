import React from 'react'
import { Link,Route,Routes } from 'react-router-dom'
import HomePage from './HomePage';
import BBSRouter from './router/BBSRouter';
import UserRouter from './router/UserRouter';
import MessagePage from './message/MessagePage';

const MenuPage = () => {
  const photo=sessionStorage.getItem('photo') && 
  `/display?file=${sessionStorage.getItem('photo')}`;
  const uid=sessionStorage.getItem('uid');
  const uname=sessionStorage.getItem('uname');

  const onLogout=(e)=>{
    e.preventDefault();
    if(!window.confirm("로그아웃하실래요?"))return;
    sessionStorage.clear();
    window.location.href='/';
  }

  return (
    <div>
        <Link to="/" className='me-3'>Home</Link>
        <Link to="/bbs/list" className='me-3'>게시판</Link>
        {uid ?
         <>
         <Link to="/message" className='me-3'>메세지</Link>
          <Link to="/users/read" className='me-3'>
          <img src={photo || 'http://via.placeholder.com'} width="30px"/>
          {uname} ({uid})님</Link>
          <Link to="#" onClick={onLogout}>로그아웃</Link>
         </>
         :
         <>
         <Link to="/users/login">로그인</Link>
         </>
        }  
        <hr/>
        <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/bbs/*" element={<BBSRouter/>}/>
        <Route path="/users/*" element={<UserRouter/>}/>
        <Route path="/message/*" element={<MessagePage/>}/>
    </Routes>
    </div>
  )
}

export default MenuPage
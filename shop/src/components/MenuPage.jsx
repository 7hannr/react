import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import RouterPage from './RouterPage';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { FaCartShopping } from "react-icons/fa6";
import { Badge } from 'react-bootstrap';
import { CountContext } from './CountContext';
import AdminRouter from './admin/AdminRouter';

const MenuPage = () => {
  const {count,setCount}=useContext(CountContext);
  const navi=useNavigate();
  const uid=sessionStorage.getItem("uid");
  const[user,setUser]=useState('');

  const callAPI=async()=>{
    const url=`/users/read/${uid}`;
    const res=await axios.get(url);
    setUser(res.data);
  }

  useEffect(()=>{
    if(uid) callAPI();
  },[uid]);

  const onClickLogout =(e)=>{
    e.preventDefault();
    if(window.confirm("정말로 로그아웃하실래요?")){
      sessionStorage.clear();
      navi('/');
    }
  }
    return (
      <>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container fluid>
            <Navbar.Brand href="/">LOGO</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav className="me-auto my-2 my-lg-0">
                {uid ==='admin'&&
                <>
                <Nav.Link href="/books/search" className='active'>도서검색</Nav.Link>
                <Nav.Link href="/books/list" className='active'>도서목록</Nav.Link>
                <Nav.Link href="/admin/orders" className='active'>주문관리</Nav.Link>
                <Nav.Link href="/users/test" className='active'>스포츠</Nav.Link>
                </>
              }
              {uid && uid!=='admin' &&
              <Nav.Link href="/orders/list" className='active'>주문목록</Nav.Link>
              }
              </Nav>
              {uid ? 
              <>
              <Nav>
                <Nav.Link href="/orders/cart" className='active'>
                  {count===0 ?
                  <FaCartShopping style={{fontSize:'25px'}}/>
                  :
                <>
                  <FaCartShopping style={{fontSize:'25px',position:'absolute'}}/>
                  <Badge bg="danger" style={{position:'relative',top:'-15px',left:'-10px'}} >
                    {count}
                  </Badge>
                </>
                  }
                </Nav.Link>
              </Nav>
               <Nav>
                <Nav.Link href="/users/mypage" className='active'>
                 <span> {user.uname}님</span>
                 </Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link href="#" onClick={onClickLogout}>로그아웃</Nav.Link>
              </Nav>
              </>
              :
              <Nav>
                <Nav.Link href="/users/login">로그인</Nav.Link>
              </Nav>
              }
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <RouterPage/>
        <AdminRouter/>
        </>
      );
}

export default MenuPage
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Row, Col, Card, Button, Tab, Tabs } from 'react-bootstrap'
import { useLocation, useParams } from 'react-router-dom'
import { FaHeart, FaRegHeart } from "react-icons/fa";
import ReviewPage from './ReviewPage';
import { CountContext } from '../CountContext';

const ReadPage = () => {
  const {setCount,count}=useContext(CountContext);
  const { bid } = useParams();
  const { pathname } = useLocation();
  //console.log(pathname);

  const uid = sessionStorage.getItem('uid');
  const [book, setBook] = useState({
    bid: '',
    author: '',
    title: '',
    bigimage: '',
    contents: '',
    isbn: '',
    fmtdate: '',
    fmtprice: '',
    publisher: '',
    lcnt: '',
    ucnt: ''
  });
  const { author, title, bigimage, contents, isbn, fmtdate,
    lcnt, ucnt, fmtprice, publisher } = book;

  const callAPI = async () => {
    const res = await axios.get(`/books/read/${bid}?uid=${uid}`);
    console.log(res.data);
    setBook(res.data);
  }

  useEffect(() => {
    callAPI();
  }, []);

  const onLikeInsert = async (bid) => {
    if (uid) {
      //좋아요저장
      const res = await axios.post('/books/likes/insert', { bid, uid });
      if (res.data.result === 1) {
        callAPI();
      }
    } else {
      sessionStorage.setItem('target', pathname);
      window.location.href = '/users/login'
    }
  }

  const onLikeCancel = async (bid) => {
    const res = await axios.post('/books/likes/delete', { bid, uid });
    if (res.data.result === 1) {
      callAPI();
    }
  }
  const onClickCart=async()=>{
    if(!sessionStorage.getItem('uid')){
      sessionStorage.setItem('target',pathname);
      window.location.href='/users/login';
    }
    //장바구니넣기
    const res=await axios.post('/cart/insert',{uid:sessionStorage.getItem('uid'),bid});
    let message="";
    if(res.data.result==1){
      message="장바구니에 등록되었습니다";
      setCount(count+1);
    }else{
      message="이미 존재합니다!";
    }
    if(window.confirm(`${message} 쇼핑을 계속하실래요?`)){
      window.location.href='/';
    }else{
      window.location.href='/orders/cart';
    }
  };
  return (
    <Row className='my-5 justify-content-center'>
      <Col xs={12} md={10} lg={8}>
        <Card>
          <Card.Body>
            <Row>
              <Col md={6} className='text-center'>
                <img src={bigimage || "http://via.placeholder.com/120x170"} width="90%" />
              </Col>
              <Col className='my-3 align-self-center'>
                <div>
                  <span className='me-2'>[{bid}]{title}</span>
                  {ucnt === 0 ?
                    <FaHeart onClick={() => onLikeInsert(bid)} className='heart' />
                    :
                    <>
                      <FaRegHeart onClick={() => onLikeCancel(bid)} className='heart' />
                      <span style={{ fontSize: '12px' }}>{lcnt}</span>
                    </>
                  }
                </div>
                <hr />
                <div>저자: {author}</div>
                <div>출판사: {publisher}</div>
                <div>ISBN: {isbn}</div>
                <div>가격: {fmtprice}원</div>
                <div>수정일: {fmtdate}</div>
                <div className='text-center mt-3'>
                  <Button onClick={onClickCart}className='me-2' variant='light'>장바구니</Button>
                  <Button variant='light'>바로구매</Button>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
      <Row className='my-5 justify-content-center'>
        <Col xs={12} md={10} lg={8}>
          <Tabs
            defaultActiveKey="home"
            id="fill-tab-example"
            className="mb-3">
            <Tab eventKey="home" title="리뷰">
             <ReviewPage bid={bid} />
            </Tab>
            <Tab eventKey="profile" title="상세설명">
              <div style={{whiteSpace:'pre-wrap'}}>{contents}</div>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Row>
  )
}

export default ReadPage
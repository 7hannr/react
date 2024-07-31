import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table, Button, Row, Col, Form, InputGroup, Alert, Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import ModalImage from './ModalImage';

const UpdatePage = () => {
  const [form,setForm]=useState({
    bid:'bid',
    title:'',
    contents:'',
    author:'',
    image:'',
    fmtdate:'',
    price:'',
    bigimage:''
  });
  const {title,contents,author,image,fmtdate,price,bigimage}=form;

  const {bid}=useParams();

  const callAPI=async()=>{
    const res=await axios.get(`/books/read/${bid}`);
    console.log(res.data);
    setForm(res.data);
  }

  useEffect(()=>{
    callAPI();
  },[]);

    const onChangeForm=(e)=>{
      setForm({...form,[e.target.name]:e.target.value});
    }
    const onUpdate =async()=>{
      if(!window.confirm("수정된 정보를 저장하실래요?")) return;
      //수정하기
      const res= await axios.post('/books/update',form);
      if(res.data.result===1){
        alert("정보수정완료!");
        callAPI();
      }
    }

    const onChangePrice = (e) => {
      const result=e.target.value.replace(/[^0-9]/g,'');
      setForm({...form,price:result});
    } 

    return (
    <Row className='my-5 justify-content-center'>
      <Col xs={12} md={10} lg={8}>
        <Card>
          <Card.Header>
            <h3 className='text-center'>[{bid}] 도서정보 수정</h3>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={3} className='mb-2 text-center pt-2'>
                <ModalImage bigimage={bigimage} callAPI={callAPI} />
              </Col>
              <Col className='my-2'>
              {fmtdate &&
                <div className='text-end'>수정일:{fmtdate}</div>
              }
                <InputGroup className='mb-2'>
                  <InputGroup.Text>도서제목</InputGroup.Text>
                  <Form.Control onChange={onChangeForm} name="title" value={title}/>
                </InputGroup>
                <InputGroup className='mb-2'>
                  <InputGroup.Text>도서가격</InputGroup.Text>
                  <Form.Control onChange={onChangePrice} name="price" value={price}/>
                </InputGroup>
                <InputGroup className='mb-2'>
                  <InputGroup.Text>도서저자</InputGroup.Text>
                  <Form.Control onChange={onChangeForm} name="author" value={author}/>
                </InputGroup>
              </Col>
              <div>
                <Form.Control onChange={onChangeForm} name="contents" value={contents} as="textarea" rows={10} />
              </div>
              <div className='text-end mt-3'>
                <Button onClick={callAPI} className='me-2' variant='light'>수정취소</Button>
                <Button onClick={onUpdate}variant='light'>정보수정</Button>
              </div>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default UpdatePage
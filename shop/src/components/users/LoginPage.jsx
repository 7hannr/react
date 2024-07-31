import axios from 'axios';
import React, { useContext, useState } from 'react'
import { InputGroup,Form,Button,Card,Col,Row, CardBody } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { CountContext } from '../CountContext';

const LoginPage = () => {
  const {callAPICount} =useContext(CountContext);
  const navi=useNavigate();
 const[form,setForm]=useState({
  uid:'admin',
  upass:'pass'
 });
 const {uid,upass}=form;
 const onChangeForm=(e)=>{
  setForm({...form,[e.target.name]:e.target.value});
 }
 const onSubmit =async(e)=>{
  e.preventDefault();
  if(uid===""||upass===""){
    alert("아이디 또는 비밀번호를 입력하세요!");
    return;
  }
  //로그인체크
  const res=await axios.post("/users/login",form);
  //console.log(res.data.result);
  const result=parseInt(res.data.result);
  if(result===0){
    alert("아이디가 존재하지 않습니다!");
  }else if(result===2){
    alert("비밀번호가 일치하지 않습니다!");
  }else if(result===1){
    sessionStorage.setItem('uid', uid);
    callAPICount();
    if(sessionStorage.getItem('target')){
      navi(sessionStorage.getItem('target'));
    }else{
      navi('/');
    }
  }
}
  return (
    <Row className='justify-content-center my-5 userLogin'>
      <Col xs={8} md={6} lg={4}>
        <Card>
          <Card.Header><h3 className='text-center'>로그인</h3></Card.Header>
            <CardBody>
              <form onSubmit={onSubmit}>
                <InputGroup className='mb-2'>
                  <InputGroup.Text className='title justify-center'>아이디</InputGroup.Text>
                  <Form.Control name="uid" value={uid} onChange={onChangeForm}/>
                </InputGroup>
                <InputGroup className='mb-3'>
                  <InputGroup.Text className='title justify-center'>패스워드</InputGroup.Text>
                  <Form.Control type="password"
                    name="upass" value={upass} onChange={onChangeForm}/>
                </InputGroup>
                <Button variant='light' className='w-100' type="submit">로그인</Button>
              </form>
            </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

export default LoginPage
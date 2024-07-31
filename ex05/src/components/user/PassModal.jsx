import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Row, Card, InputGroup, Form } from 'react-bootstrap'
import axios from 'axios';

const PassModal = () => {
    const [form,setForm]=useState({
      upass:'pass',
      npass:'1234',
      cpass:'1234'
    });

    const {upass,npass,cpass}=form;
    const onChangeForm=(e)=>{
      setForm({...form,[e.target.name]:e.target.value});
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onClickSave=async()=>{
      //현재 비번일치체크
      const res=await axios.get(`/users/${sessionStorage.getItem('uid')}`);
      if(res.data.upass!= upass){
        alert("현재 비밀번호가 일치하지 않습니다!");
        return;
      }
      //새 비번 = 비번확인
      if(npass != cpass){
        alert("새 비밀번호가 일치하지않습니다!");
        return;
      }
      if(npass===upass){
        alert("새비밀번호가 현재비밀번호와 일치합니다!");
        return;
      }
      
      //비번업데이트
      if(!window.confirm('비밀번호를 변경하실래요?')) return;
      await axios.post(`/users/update/pass`,
        {uid:sessionStorage.getItem('uid'),upass:npass});
        alert("비밀번호 변경 완료!");
        sessionStorage.clear();
        window.location.href='/users/login';
    }
  
  return (
    <>
      <Button variant="light" onClick={handleShow}>
        비밀번호변경
      </Button>

      <Modal style={{top:'30%'}}
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>비밀번호변경</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className='mb-2'>
            <InputGroup.Text>현재비밀번호</InputGroup.Text>
            <Form.Control onChange={onChangeForm}
            name="upass" value={upass} type="password"/>
          </InputGroup>
          <InputGroup className='mb-2'>
            <InputGroup.Text>새비밀번호</InputGroup.Text>
            <Form.Control onChange={onChangeForm}
            name="cpass" value={cpass} type="password"/>
          </InputGroup>
          <InputGroup className='mb-2'>
            <InputGroup.Text>비밀번호 확인</InputGroup.Text>
            <Form.Control onChange={onChangeForm}
            name="npass" value={npass} type="password"/>
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>
           취소
          </Button>
          <Button onClick={onClickSave}
          variant="light">변경</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PassModal
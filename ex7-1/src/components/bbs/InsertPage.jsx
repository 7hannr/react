import axios from 'axios';
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const InsertPage = () => {
  const navi = useNavigate();
  const [form, setForm] = useState({
    writer:'blue',
    title:'',
    contents:''
  });
  const {writer, title, contents} = form;
  const onChangeForm = (e) => {
    setForm({...form, [e.target.name]:e.target.value});
  }
  const onSubmit = async(e) => {
    e.preventDefault();
    if(title==="") {
      alert("제목을 입력하세요.");
      return;
    }
    const result = await axios.post("/bbs/", form)
    if(result.data ==='success') {
      navi('/bbs/');
    }else{
      alert("글쓰기실패");
    }
  }

  return (
    <div className='my-5'>
      <h1 className='text-center mb-5'>글쓰기</h1>
      <form onSubmit={onSubmit}>
        <Form.Control 
          value={title}
          name="title"
          onChange={onChangeForm}
          className='mb-2'
          placeholder='제목'/>
        <Form.Control 
          value={contents}
          name="contents"
          onChange={onChangeForm}
          className='mb-2'
          rows={10} as="textarea" 
          placeholder='내용'/>
        <div className='text-center'>
          <Button type="submit" className='me-2'>저장</Button>
          <Button className='me-2' >취소</Button>
        </div>  
      </form>
    </div>
  )
}

export default InsertPage
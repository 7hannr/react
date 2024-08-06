import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useParams,useNavigate } from 'react-router-dom'

const UpdatePage = () => {
  const navi = useNavigate();
  const [form, setForm] = useState('');
  
  const {bid} = useParams();
  const callAPI = async() => {
    const res= await axios.get(`/bbs/${bid}`);
    setForm(res.data);
  }
  useEffect(()=>{
    callAPI();
  }, []);

  const {writer, title, contents} = form;
  const onChangeForm = (e) => {
    setForm({...form, [e.target.name]:e.target.value});
  }

  const onSubmit = async(e) => {
    e.preventDefault();
    if(!window.confirm(`${bid}번 게시글을 수정하실래요?`)) return;
    const res=await axios.put('/bbs/', form);
    console.log(form);
    if(res.data === 'success'){
      alert('수정완료!');
      navi(`/bbs/${bid}`)
    }else{
      alert('수정실패!'); 
    }
  }

  return (
    <div className='my-5'>
      <h1 className='text-center mb-5'>수정</h1>
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
          <Button type="submit" className='me-2'>수정</Button>
          <Button className='me-2' >취소</Button>
        </div>  
      </form>
    </div>
  )
}

export default UpdatePage
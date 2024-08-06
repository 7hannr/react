import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom'

const ReadPage = () => {
  const navi=useNavigate()
  const[bbs,setBbs]=useState('');
  const {bid}=useParams()
  const callAPI=async()=>{
    const res=await axios.get(`/bbs/${bid}`)
    console.log(res.data)
    setBbs(res.data)
  }

  useEffect(()=>{
    callAPI()
  },[])

  const onDelete = async()=>{
    if(!window.confirm(`${bid}번 게시글삭제?`)) return;
    const res=await axios.delete(`/bbs/${bid}`)
    if(res.data==='success'){
      alert("success")
      navi('/bbs')
    }else{
      alert("fail")
    }
  }

  const onUpdate =()=>{
    navi(`/bbs/update/${bid}`)
  }

  return (
    <div>
        <h1 className='text-center my-5'>게시글정보</h1>
        <div className='text-end'>
          <Button onClick={onUpdate} className='me-2'>수정</Button>
          <Button onClick={onDelete}>삭제</Button>
        </div>
        <div>
          <h5>[{bid}] {bbs.title} | {bbs.writer} | {bbs.fmtDate} </h5>
          <hr/>
          <div>{bbs.contents}</div>
        </div>
    </div>
  )
}

export default ReadPage
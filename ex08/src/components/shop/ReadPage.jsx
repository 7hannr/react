import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { app } from '../../firebaseinit'
import { Form, Button, InputGroup, FormControl, Row, Col,Table } from 'react-bootstrap'
import { deleteDoc,doc,getFirestore,addDoc,collection, orderBy, onSnapshot,query, getDoc } from 'firebase/firestore'

const ReadPage = () => {
  const[shop,setShop]=useState('')
  const {id}=useParams();
  const db=getFirestore(app);

  const callAPI=async()=>{
    const snap=await getDoc(doc(db,'shop',id));
    //console.log(snap.data())
    setShop(snap.data())
  }

  useEffect(()=>{
    callAPI();
  },[])

  return (
    <div>
      <h1 className='text-center my-5'>상품정보</h1>
      <Row className='justify-content-center'>
        <Col md={8} lg={10}>
          <div><img src={shop.image} width="100"/></div>
          <hr/>
          <h3>{shop.title}</h3> 
          <h5>{shop.price}</h5>
          <h5>{shop.address}</h5>
        </Col>
      </Row>
    </div>
  )
}

export default ReadPage
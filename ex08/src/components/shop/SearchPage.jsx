import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Form, Button, InputGroup, FormControl, Row, Col,Table } from 'react-bootstrap'
import { app } from '../../firebaseinit'
import { getFirestore,addDoc,collection } from 'firebase/firestore'
import moment from 'moment'

const SearchPage = () => {
  const db=getFirestore(app)
  const[list,setList]=useState([]);
  const[loading,setLoading]=useState(false);
  const[query,setQuery]=useState("")

  const onInsert =async(shop)=>{
    if(!window.confirm(`"${shop.title}"저장?`))return;
    const date = moment(new Date()).format('YYYY-MM-DD')
    await addDoc(collection(db,'shop'),{date,...shop,writer:sessionStorage.getItem('email')});
    alert('상품등록 완료!');
  }

  const callAPI=async()=>{
    setLoading(true)
    const res= await axios.get(`/shop/search.json?query=${query}`);
    //console.log(res.data)
    setList(res.data);
    setLoading(false)
  }

  useEffect(()=>{
   // callAPI();
  },[])

  const onSubmit=(e)=>{
    e.preventDefault();
    if(query===""){
      alert("검색어를 입력하세요!");
      return
    }
    callAPI();
  }

  if(loading) return <h1 className='text-center my-5'>loading....</h1>

  return (
    <div>
      <h1 className='text-center my-5'>상품검색</h1>
      <Row>
        <Col xs={8} md={6} lg={4}>
          <form onSubmit={onSubmit}>
            <InputGroup>
              <FormControl 
              value={query}
              onChange={(e)=>setQuery(e.target.value)}/>
              <Button type='submit' variant='dark'>검색</Button>
            </InputGroup>
          </form>
        </Col>
      </Row>
      <Table>
        <tbody>
          {list.map((shop)=>
            <tr key={shop.no}>
              <td><img src={shop.image} width={100}></img></td>
              <td>{shop.title}</td>
              <td>{shop.address}</td>
              <td className='text-end'>{shop.price}</td>
              <td>
                {sessionStorage.getItem('email') && 
                <Button onClick={()=>onInsert(shop)} variant='dark'>등록</Button>
                }
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default SearchPage
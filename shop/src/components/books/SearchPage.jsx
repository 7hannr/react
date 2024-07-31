import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import {Row, Col, Card, InputGroup, Form, Button} from 'react-bootstrap'

const SearchPage = () => {
  const [chk,setChk]=useState(0);
  const [count,setCount]=useState(0);
  const [isEnd, setIsEnd] = useState(false);

  const[page,setPage]=useState(1);
  const[size,setSize]=useState(5);
  const[query,setQuery]=useState('리액트');
  const [loading,setLoading]=useState(false);
   const [books,setBooks]=useState([]);
  
  useEffect(()=>{
    let count=0;
    books.forEach(book=>book.checked&&count++);
    setChk(count);
  },[books]);

    const callAPI =async()=>{
      const url=`https://dapi.kakao.com/v3/search/book?target=title&query=${query}&size=${size}&page=${page}`;
      const config={
        "headers":{"Authorization": "KakaoAK 54b6688221dead45827042df7e297c2d"}
      }

      setLoading(true);
      const res =await axios.get(url,config);
      console.log(res.data);
      const documents=res.data.documents;
      setBooks(documents.map(book=>book&&{...book,checked:false}));
      setCount(res.data.meta.pageable_count);
      setIsEnd(res.data.meta.is_end);
      setLoading(false);
    }
    useEffect(()=>{
      callAPI();
    },[page]);

    const onSubmit = (e) => {
      e.preventDefault();
      if(query===""){
          alert("검색어를 입력하세요!");
      }else{
          setPage(1);
          callAPI();
      }
  }
  const onInsert =async(book)=>{
    if(!window.confirm(`"${book.title}" 도서를 등록하실래요?`))return;
    //도서등록
    console.log(book);
    const data={...book,authors:book.authors.join(',')}
    const res=await axios.post('/books/insert',data);
    if(res.data.result==1){
      alert("도서등록완료!");
    }else{
      alert("이미 등록된 도서입니다!");
    }
  }

  const onChangeAll=(e)=>{
    setBooks(books.map(book=>book &&{...book,checked:e.target.checked}));
  }

  const onChangeSingle=(e,isbn)=>{
    setBooks(books.map(book=>book.isbn===isbn ? {...book,checked:e.target.checked}:book));
  }

  const onInsertChecked =()=>{
    if(chk==0){
      alert("저장할 도서를 선택하세요!");
      return;
    }
    if(!window.confirm(`${chk}개 도서를 저장하실래요?`)) return;

    //선택한도서저장
    let count=0;
    let inserted=0;
  books.forEach(async book=>{
    if(book.checked){
      const data={...book,authors:book.authors.join(',')}
      const res=await axios.post('/books/insert',data);
      count++;
      if(res.data.result===1) inserted++;
      if(count===chk) {
        alert(`${inserted}개 도서가 저장되었습니다!`);
        setBooks(books.map(book=>book&&{...book,checked:false}));
      }
    }
  });
}

  if(loading) return <h1 className='text-center my-5'>loading....</h1>
  return (
    <div className='my-5'>
        <h1 className='text-center mb-5'>도서검색</h1>
        <Row className='mb-2'>
            <Col xs={8} md={6} lg={4}>
              <form onSubmit={onSubmit}>
                <InputGroup>
                <Form.Control 
                  value={query} onChange={(e)=>setQuery(e.target.value)} placeholder='검색어'/>
                  <Button variant='light'>검색</Button>
                </InputGroup>
              </form>
            </Col>
            <Col>
              <div className='mt-2'>검색수:{count}권</div>
            </Col>
            <Col className='text-end' >
              <Button onClick={onInsertChecked} size='sm' variant='light'>선택도서 저장</Button>
            </Col>
          </Row>
        <Table>
          <thead>
            <tr>
              <td><input onChange={onChangeAll} checked={chk===books.length} type="checkbox"/></td>
              <td>Isbn</td>
              <td colSpan={2}>Title</td>
              <td>price</td>
              <td>Authors</td>
              <td>등록</td>
            </tr>
          </thead>
          <tbody>
            {books.map(book=>
              <tr key={book.isbn}>
                <td><input onChange={(e)=>onChangeSingle(e,book.isbn)} checked={book.checked}type="checkbox"/></td>
                <td>{book.isbn}</td>
                <td><img src={book.thumbnail || 'http://via.placeholder.com/120x170'} width="60px"/></td>
                <td>{book.title}</td>
                <td>{book.price}</td>
                <td>{book.authors}</td>
                <td><Button onClick={()=>onInsert(book)} variant='light'>등록</Button></td>
              </tr>
            )}
          </tbody>
        </Table>
          <div className='text-center my-3'>
             <Button onClick={()=>setPage(page-1)} disabled={page===1} variant='light'>이전</Button>
              <span className='mx-3'>{page}</span>
             <Button onClick={()=>setPage(page+1)} disabled={isEnd} variant='light'>다음</Button>
           </div>
    </div>
  )
}

export default SearchPage
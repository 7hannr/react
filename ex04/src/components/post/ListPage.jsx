import React, { useEffect, useState } from 'react'
import { Button,Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { app } from '../../firebaseInit';
import { getFirestore,collection,onSnapshot,orderBy,query } from 'firebase/firestore';
import Pagination from 'react-js-pagination';

const ListPage = () => {
  const [total,setTotal]=useState(0);
  const[page,setPage]=useState(1);
  const[size,setSize]=useState(5);
  const [loading,setLoading]=useState(false);
  const [posts,setPosts]=useState([]);
  const db=getFirestore(app);
  const email=sessionStorage.getItem("email");
  const navi =useNavigate();

  const callAPI = ()=>{
    setLoading(true);
    const q=query(collection(db,'posts'),orderBy('date','desc'));
    let count=0;
    onSnapshot(q,res=>{
      let rows=[];
      res.forEach(row=>{
        count++;
        rows.push({seq:total-count+1,no:count,id:row.id,...row.data()})
      });
      //console.log(rows);
      setTotal(count);
      const start=(page-1) * size +1;
      const end=(page*size);
      const data=rows.filter(row=>row.no>=start && row.no<=end);
      setPosts(data);
      setLoading(false);
    });
  }
  useEffect(()=>{
    callAPI();
  },[page]);

  if(loading) return <h1 className='my-5 text-center'>loading...</h1>
 
  return (
    <div className='my-5'>
        <h1 className='text-center'>게시판</h1>
        {email &&
        <div className='text-end'> 
          <Button variant="secondary" onClick={()=>navi('/post/insert')}className='my-2 btn-sm'>글쓰기</Button>
        </div>
        }
        <Table>
          <thead>
            <tr className='text-center table-info'>
              <td>No.</td>
              <td>제목</td>
              <td>작성자</td>
              <td>작성일</td>
            </tr>
          </thead>
          <tbody>
          {posts.map(post=>
            <tr>
              <td width="50">{post.seq}</td>
              <td><a href={`/post/read/${post.id}`}>{post.title}</a></td>
              <td width="200">{post.email}</td>
              <td width="200">{post.date}</td>
            </tr>
            )}
          </tbody>
        </Table>
        <Pagination
            activePage={page}
            itemsCountPerPage={size}
            totalItemsCount={total}
            pageRangeDisplayed={5}
            prevPageText={"‹"}
            nextPageText={"›"}
            onChange={(e)=>setPage(e)}/>
    </div>
  )
}

export default ListPage
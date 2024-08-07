import axios from "axios";
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

const Chart1 = () => {
  const [data,setData]=useState('');

    const callAPI =async()=>{
        const res=await axios.get('/avg/lcode');
        console.log(res.data);
        let array=[];
        array.push(['과목명','점수']);
        res.data.forEach(row=>
          array.push([row.lname, parseFloat(row.avg)])
        );
        setData(array);
    }

    useEffect(()=>{
        callAPI();
    },[]);

      const options = {
        chart: {
          title: "과목별 평균성적",
        },
      };
      return (
        <Chart
          chartType="BarChart"
          width="100%"
          height="400px"
          data={data}
          options={options}
        />
      );
    }

export default Chart1
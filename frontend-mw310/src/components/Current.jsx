import React from 'react'
import Navbar from './Navbar'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart, Bar, Rectangle, } from 'recharts';



function Current() {
    const[data, setData] = useState([]);
    const[sales, setSales] = useState([]);
    const[sumSales, setSumSales] = useState([]);
    const[productFilter, setProductFilter] = useState([]);
    const[selectedProduct, setSelectedProduct] = useState("Limes");

   
    const getData = async () => {
        const { data } = await axios.get(`http://localhost:8000/transactions_grouped?product_name=${selectedProduct}`);
        console.log(data)

        setData(data);
      };

    useEffect(() => {
    getData();
    }, [selectedProduct]);

    const getFilter = async () => {
        const { data } = await axios.get('http://localhost:8000/transactions/product_filter');
        console.log(data)
        setProductFilter(data);
    }

    useEffect(() => {
      getFilter();
      }, []);

      const onOptionChangeHandler = (event) => {
        const without_blankspace = event.target.value.replace(/\s/g, "%20")
        setSelectedProduct(without_blankspace);
        console.log(
            "User Selected Value - ",
            without_blankspace
        );
    };

    const get_sales_for_week = async () => {
      const { data } = await axios.get('http://localhost:8000/sales_for_week');
      console.log(data)
      setSales(data);
  }

  useEffect(() => {
    get_sales_for_week();
    }, []);

    const get_sales_sum_for_week = async () => {
      const { data } = await axios.get('http://localhost:8000/sum_sales_for_week');
      console.log(data)
      setSumSales(data);
  }

  useEffect(() => {
    get_sales_sum_for_week();
    }, []);

  return (
    <div>
        <Navbar />
        <div class="dashboard-container">
          <div class="Dashboard1">
            <ResponsiveContainer width="100%" height="100%">

          <BarChart
          width={500}
          height={300}
          data={sumSales}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="product_name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="sum_quantity" fill="#5F9EA0" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        </BarChart>
        </ResponsiveContainer>
          </div>
          <div class="Dashboard2">
          <ResponsiveContainer width="100%" height="100%">

          <BarChart
          width={500}
          height={300}
          data={sales}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day_of_week" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Bag of Organic Bananas" fill="#6b3e26" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          <Bar dataKey="Limes" fill="#ffe097" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          <Bar dataKey="Organic D'Anjou Pears" fill="#5f9ea0" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          <Bar dataKey="Organic Gala Apples" fill="#9581a9" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          <Bar dataKey="Seedless Red Grapes" fill="#a8cca0" activeBar={<Rectangle fill="pink" stroke="blue" />} />

        </BarChart>
        </ResponsiveContainer>
          </div>
          <div class="Dashboard3"></div>
          <div class="Dashboard4"><ResponsiveContainer width="100%" height="100%">
          <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="quantity" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer></div>
        </div>
        <select onChange={(event) => onOptionChangeHandler(event)}>
          <option value="" disabled selected>Select your option</option>

          {
            productFilter.map(product => (
              <option value={product}>{product}</option>
            ))
          }
        </select>
        <input type="date" min="2021-11-23" max="2021-11-30"/>
    </div>
  )
}

export default Current
import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';


function OtherPage() {
    const data = [{name: 'Limes', quantity: 25, timestamp: '2023-11-26T08:00:00'}, {name: 'Limes', quantity: 30, timestamp: '2023-11-26T09:00:00'}, {name: 'Limes', quantity: 50, timestamp: '2023-11-26T10:00:00'},{name: 'Limes', quantity: 25, timestamp: '2023-11-26T11:00:00'}];
  return (
    <div>
        <h1>OtherPage</h1>
        <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="quantity" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="Product" />
            <YAxis />
            <Tooltip />
  </LineChart>
    </div>
  )
}

export default OtherPage
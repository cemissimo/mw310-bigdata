import React from 'react'
import Navbar from './Navbar'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Dashboard() {
    const bar_options = [
        {"dataKey": "Bag of Organic Bananas", "fill": "#6b3e26"}, 
        {"dataKey": "Limes", "fill": "#ffe097"},
        {"dataKey": "Organic D'Anjou Pears", "fill": "#5f9ea0"},
        {"dataKey": "Organic Gala Apples", "fill": "#9581a9"},
        {"dataKey": "Seedless Red Grapes", "fill": "#a8cca0"},
    ]
  return (
    <div>
        <Navbar></Navbar>
        <div className='miau'>
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
    </div>
  )
}

export default Dashboard
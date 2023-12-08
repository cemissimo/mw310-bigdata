import React from 'react'
import Navbar from './Navbar'

function MainPage() {
  return (
    <div className='main-container'>
        <Navbar />
        <div>
            <div className='transaction-entries-container'>
                {
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(val => (
                        <div className='entry-container'>
                            <p>Order ID</p>
                            <p>Timestamp</p>
                            <p>Product Name</p>
                            <p>Sale Quantity</p>
                        </div>
                    ))
                }
                
            </div>
        </div>
    </div>
  )
}

export default MainPage
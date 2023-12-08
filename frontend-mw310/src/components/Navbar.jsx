import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='nav-container'>
        <Link to="/transactions"><div>Transaktion</div></Link>
        <Link to="/stores"><div>Store Übersicht</div></Link>
        <Link to="/coupons"><div>Coupons</div></Link>
    </div>
  )
}

export default Navbar
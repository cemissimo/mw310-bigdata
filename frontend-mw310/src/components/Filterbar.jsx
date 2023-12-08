import React from 'react'
import { useState } from 'react';

function Filterbar({storeList, filterStores}) {

    const [storeText, setStoreText] = useState("")
    const [storeFilter, setStoreFilter] = useState("");


    const handleFilterSubmit = (e) => {
        e.preventDefault();
        
        console.log(storeText);
        filterStores(storeText);
    }

  return (
    <div className='filterbar-container'>
        <div>
            <form action="" onSubmit={(e) => handleFilterSubmit(e)}>
                <input type="text" placeholder="Suche nach Store..." onChange={(e) => setStoreText(e.target.value)}/>
            </form>

        </div>
    </div>
  )
}

export default Filterbar
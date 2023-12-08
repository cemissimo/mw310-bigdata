import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function StoreSelection() {
  /**
   * Komponente die ein Eingabefeld rendert in der die Store ID eingegeben werden kann.
   */
  
  const [storeId, setStoreId] = useState('');
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    /**
     * Beim eingeben der Store ID wird eine Weiterleitung zur Seite des Stores initiiert.
     */
    console.log("miau")
    e.preventDefault();
    navigate(`/store/${storeId}`);
  };

  return (
    <div className="store-selection-container" style={{"height": "100vh"}}>
        <form onSubmit={handleFormSubmit}>
            <div style={{"backgroundColor": "cadetblue", "padding": "2em", "borderRadius": "15px"}} className="store-selection-container">
                <h2 style={{"color": "white"}}>Select your Store</h2>
                <input value={storeId} onChange={(e) => setStoreId(e.target.value)} style={{"borderRadius": "15px", "border": "none", "textAlign": "center", "padding": "4px 8px"}} type="text" placeholder='Type in your Store ID'/>
                <button type='submit' style={{"borderRadius": "15px", "border": "none", "padding": "4px 8px"}}>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default StoreSelection
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Navbar from './Navbar'
import axios from "axios";


function Transactions() {
    const[productFilter, setProductFilter] = useState([]);
    const[selectedProduct, setSelectedProduct] = useState();

    const getFilter = async () => {
        const { data } = await axios.get('http://localhost:8000/transactions/product_filter');
        console.log(data)
        setProductFilter(data);
    }

    useEffect(() => {
      getFilter();
      }, []);     
      
        const [file, setFile] = useState(null);
      
        const handleFileChange = (e) => {
          // Aktualisiere den Datei-Zustand mit der ausgewählten Datei
          setFile(e.target.files[0]);
        }

        const handleUpload = () => {
            if (file) {
                console.log(file);
              const formData = new FormData();
              formData.append('file', file);
        
              // Hier die URL deines Backend-Endpunkts einfügen
              const uploadUrl = 'http://localhost:8000/upload_csv';
        
              // Verwende Axios für den POST-Request
              axios.post(uploadUrl, formData)
                .then(response => {
                  // Handle die Antwort des Servers hier
                  console.log('Server Response:', response.data);
                })
                .catch(error => {
                  console.error('Upload Error:', error);
                });
            }
        }
    
  return (
    <div>
        <Navbar />
        <div className='transaction-input-container'>
            <p style={{"fontSize": "24px"}}>Produkt in DB eintragen</p>
            <p>Produkt</p>
            <select onChange={(event) => onOptionChangeHandler(event)}>
                <option value="" disabled selected>Select your option</option>
                {
                    productFilter.map(product => (
                    <option value={product}>{product}</option>
                    ))
                }
            </select>
            <p>Datum</p>
            <input type="date" />
            <p>Anzahl</p>
            <input type="text" style={{"textAlign": "center"}}/>
            <p className='oder-text'>Oder</p>
            <p>Hochladen einer CSV</p>
            <div>
                <input type="file" accept='.csv' onChange={handleFileChange} />
                <button onClick={handleUpload}>Datei hochladen</button>
            </div>
        </div>
    </div>
  )
            }
export default Transactions
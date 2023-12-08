import React from 'react'
import Navbar from './Navbar'
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import Details from './Details';
import Filterbar from './Filterbar';

function Stores() {

    const[storeLimit, setStoreLimit] = useState(10);
    const[storeList, setStoreList] = useState([]);
    const[clickedStore, setClickedStore] = useState();
    const[showDetails, setShowDetails] = useState(false);
    const[filteredStores, setFilteredStores] = useState([]);
    
    const get_sales_sum_for_week = async () => {
        const { data } = await axios.get('http://localhost:8000/summed_sales_for_stores');
        console.log(data)
        setSumSales(data);
    }

    let options = {
        method: 'GET',
        url: 'http://localhost:8000/summed_sales_for_stores',
        params: {

        },
    };

    const get_stores = async () => {
        try {
            const response = await axios.request(options);
            console.log(response.data);
            setStoreList(response.data)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        get_stores();
        }, [storeLimit]);

    const handleLimitchange = () => {

    }

    const handleClick = (store) => {
        console.log(store);
        setClickedStore(store);
        let miau = !showDetails
        console.log(miau)
        setShowDetails(miau)
    }

    const filterStores = (storeText) => {
        console.log("miau")
        const filteredStores = storeList.filter(store => store.store_id == storeText);
        console.log(filteredStores);
        setStoreList(filteredStores);
    }

  return (
    <div>
        <Navbar></Navbar>
        <Filterbar storeList={storeList} filterStores={filterStores}></Filterbar>
        <div>
            {showDetails == true?<Details store={clickedStore} setShowDetails={setShowDetails} ></Details>: ""}
            <ListGroup style={{"margin": "4em"}}>
                { storeList?.map(store => (
                    <ListGroup.Item key={store.store_id} onClick={() =>handleClick(store)}>
                        <div>Store {store.store_id}</div>
                    </ListGroup.Item>))
                }
            </ListGroup>

        </div>
    </div>
  )
}

export default Stores
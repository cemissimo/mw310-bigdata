import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Coupon from './Coupon';
import Loading from './Loading';

function Store() {
    const { storeId } = useParams();
    const [products, setProducts] = useState([]);
    const [isShowCoupon, setIsShowCoupon] = useState(false);
    const [recipe, setRecipe] = useState();
    const [isLoading, setIsLoading] = useState(true);

    let options = {
        method: 'GET',
        url: 'http://localhost:8000/coupons',
        params: {
            store_id: storeId
        },
    };

    const get_coupons_for_store = async () => {
        try {
            const response = await axios.request(options);
            setProducts(response.data)
            console.log(response.data)
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(
        () => {
            get_coupons_for_store();
        }, []
    )

    const closeCoupon = () => {
      setIsShowCoupon(false)
    }

    const handleClickCoupon = (recipe) => {
      setRecipe(recipe);
      setIsShowCoupon(true);
      console.log(recipe)
    }

  if(isLoading === true){
    return <Loading></Loading>
  }
  
  if(isShowCoupon === true){
    return <Coupon recipe={recipe} closeCoupon={closeCoupon}></Coupon>
  }

  return (
    <div>
        {/* <Navbar></Navbar> */}
        <div className="rezept-section">
            {
                  products?.map(product => (
                      <div class="rezept-container" onClick={() => handleClickCoupon(product)}>
                        <p>{product.recipe.title}</p>
                        
                        <div class="rezept-infos">
                          <img style={{"height": "150px"}} src={product.recipe.image_urls[0]}></img>  

                          <div className='rezept-text'>
                            <p>Zutaten:</p>
                            {product.recipe.ingredients?.map(zutat => (zutat.name + ", "))}
                          </div>
                        </div>
                      </div>
                  ))
              }
          </div>
          {/* <div className='rezept-section'>
            {
              überbestand?.map(produkt => (
                <div className="rezept-container">
                  <p>{produkt}</p>
                  <div class="rezept-infos">
                          <img style={{"height": "150px"}} src={price[produkt]['img_url']}></img>  

                          <div className='rezept-text'>
                            <p>{price[produkt]['text']}</p>
                            <p>für nur {parseFloat((price[produkt]['preis'] * 0.5).toFixed(2))} €</p>
                            <p>statt {price[produkt]['preis']} €</p>
                          </div>
                        </div>
                </div>
              ))
            }
          </div> */}
    </div>
  )
}

export default Store
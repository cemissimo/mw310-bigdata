import React from 'react'
import { useState } from 'react'
import axios from 'axios';

function Coupon({recipe, closeCoupon}) {
    const [isQRCode, setIsQRCode] = useState(false);
    const price = {
        "Aubergine": {
          "preis":1.49,
          "text": "Samtige Auberginen, reich an Geschmack und Textur",
          "img_url": "https://s.zentrum-der-gesundheit.de/img/auberginen",
        },
        "Banane": {
          "preis": 0.99,
          "text": "Sonnengereifte Bananen, die mit ihrer natürlichen Süße und cremigen Konsistenz perfekt als gesunder Snack dienen",
          "img_url": "https://www.onmeda.de/onmeda/bananen/bananen-gesund.jpg"
        } 
        ,
        "Limette": {
          "preis": 2.99,
          "text": "Erfrischende Limetten verleihen jedem Gericht oder Getränk einen spritzigen Kick",
          "img_url": "https://www.cosmoty.de/wp-content/uploads/2018/05/limette_AdobeStock.jpg"
        },
        "Tomate": {
          "preis": 1.99,
          "text": "Saftige Tomaten, voller frischem Aroma und intensivem Geschmack",
          "img_url": "https://media.gq-magazin.de/photos/5c9cd7814ca4339eb4b3d85d/4:3/w_1064,h_798,c_limit/tomate-neu-quer.jpg"
        },
        "Zucchini": {
          "preis": 1.79,
          "text": "Zarte Zucchinis, mit ihrem milden Geschmack und knackigen Biss",
          "img_url": "https://www.mein-schoener-garten.de/sites/default/files/styles/discover_4x3/public/2023-07/zucchini-682575312-getty-images.jpg?h=c029297a&itok=LfXzfn8T"
        }
      }

      const showQRCode = () => {
        setIsQRCode(true);
      }

      

      const handleCouponClick = async (coupon_id) => {
        // try {
          // Rufe die API-Route auf, um den Counter zu erhöhen
          console.log(coupon_id)

        //   await axios.post('http://localhost:8000/increment_coupon_counter', { coupon_id: coupon_id });
        //   console.log(recipe)
        //   // Führe hier ggf. weitere Aktionen nach einem erfolgreichen Klick aus
        // } catch (error) {
        //   console.error('Error:', error);
        //   // Handle Fehler entsprechend
        // }
        
      // };

      let options = {
        method: 'post',
        url: 'http://localhost:8000/increment_coupon_counter',
        params: {
            coupon_id: coupon_id
        },
      };

      console.log(options)

      try {
        const response = await axios.request(options);
        // setProducts(response.data)
        console.log(response.data)
        // setIsLoading(false);
    } catch (error) {
        console.error(error);
    }
      }

  return (
    <div>
      <div onClick={closeCoupon}>Close Coupon</div>
        <div className='rezept-section'>
                <div className="rezept-container" onClick={showQRCode}>
                  <p>{recipe.product_name}</p>
                  <div class="rezept-infos">
                          {isQRCode === false ? <img style={{"height": "150px"}} src={price[recipe.product_name]['img_url']}></img> : <img onClick={ () => handleCouponClick(recipe.coupon_id)} style={{"height": "150px", "borderRadius": "0"}} src={"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/444px-QR_code_for_mobile_English_Wikipedia.svg.png"}></img>}  
                          <div className='rezept-text'>
                            <p>{price[recipe.product_name]['text']}</p>
                            <p>für nur {parseFloat((price[recipe.product_name]['preis'] * 0.5).toFixed(2))} €</p>
                            <p>statt {price[recipe.product_name]['preis']} €</p>
                          </div>
                        </div>
                </div>
          </div>
    </div>
  )
}

export default Coupon
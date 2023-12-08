import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Rectangle, ReferenceLine } from 'recharts';
import axios from 'axios';

function Details({store, setShowDetails}) {
  
  const[storeList, setStoreList] = useState([]);
  const[recipes, setRecipes] = useState([]);
  const[salesThreshold, setSalesThreshold] = useState(2300)
  const [überbestand, setÜberbestand] = useState([]);

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

  const handleClick = () => {
    setÜberbestand([]);
    setShowDetails(false);
  }
  // const stores = [store]

  const createStoreList = async () => {
    const { store_id, ...productData } = store;

    const outputObjects = Object.entries(productData).map(([product_name, quantity]) => ({
      store_id,
      ['product_name']: product_name,
      ['quantity']: quantity
    }));
    console.log(outputObjects)
    setStoreList(outputObjects);
  }

  const check_sale_thresholds = () => {
    const unterSchwellenwert = [];
    for (const key in store) {
      if(key.includes("store")){
        
      }else{
        // console.log(key)
        const quantity = store[key];
        // console.log(quantity);
    
        // Überprüfen, ob die Verkaufszahl unter dem Schwellenwert liegt
        if (quantity < salesThreshold) {
          // setÜberbestand(prevList => [...prevList, key]);
          unterSchwellenwert.push(key);
          // console.log(überbestand)
      }
      }
      
    }
    return unterSchwellenwert;
  }

  useEffect(() => {
    createStoreList();
    const unterSchwellenwert =  check_sale_thresholds();
    setÜberbestand(prevList => {
      // Vermeide doppelte Elemente
      const uniqueList = [...new Set([...prevList, ...unterSchwellenwert])];
      console.log(uniqueList); // Aktualisierten Zustand ausgeben
      return uniqueList;});
    console.log(überbestand);

  }, [])

  useEffect(() =>{
    
  }, [])

  let options = {
    method: 'GET',
    url: 'https://gustar-io-deutsche-rezepte.p.rapidapi.com/search_api',
    params: {
        text: ''},
    headers: {
      'X-RapidAPI-Key': 'fa264fdff5mshaf102c64fb75600p12a728jsnce42ddceb0dd',
      'X-RapidAPI-Host': 'gustar-io-deutsche-rezepte.p.rapidapi.com'
    }
  };
  
  async function handleGenerateCoupon(e) {
    e.preventDefault();
    let recipeList = [];
    for(let i = 0; i < überbestand.length; i++){
        options.params.text = überbestand[i];
        console.log(options.params.text)
        try {
            const response = await axios.request(options);
            console.log(response.data);
            let limitThree = response.data.slice(0,1);
            recipeList = recipeList.concat(limitThree);
        } catch (error) {
            console.error(error);
        }
        console.log(recipeList)
        setRecipes(recipeList);
    }
}

  return (
    <div className='details-container'>
        <div onClick={handleClick} style={{"color": "white"}}>Close Btn</div>
        <div>
          <p style={{"textAlign": "center", "width": "500px"}}>Aufsummierte Lebensmittelverkäufe bis zum Mittwoch</p>
          <BarChart
          width={500}
          height={300}
          data={storeList}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="product_name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <ReferenceLine y={salesThreshold} label="MIN" stroke="red" strokeDasharray="3 3" />
          <Bar dataKey="quantity" fill="#5f9ea0" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        </BarChart>
        </div>
        <div>
          <button onClick={(e) => handleGenerateCoupon(e)}>Generiere Coupons und Rezepte</button>
          <div className="rezept-section">
            {
                  recipes?.map(recipe => (
                      <div class="rezept-container">
                        <p>{recipe.title}</p>
                        
                        <div class="rezept-infos">
                          <img style={{"height": "150px"}} src={recipe.image_urls[0]}></img>  

                          <div className='rezept-text'>
                            <p>Zutaten:</p>
                            {recipe.ingredients?.map(zutat => (zutat.name + ", "))}
                          </div>
                        </div>
                      </div>
                  ))
              }
          </div>
          <div className='rezept-section'>
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
          </div>
        </div>
    </div>
  )
}

export default Details
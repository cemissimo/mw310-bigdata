import React from 'react'
import Navbar from './Navbar'
import axios from 'axios';
import { useState } from 'react';

function Coupons() {

    const überbestand = ["Banane"]
    const[recipes, setRecipes] = useState([]);

    // const url = 'https://gustar-io-deutsche-rezepte.p.rapidapi.com/search_api?text=Avocado';
    // const options = {
    //     method: 'GET',
    //     headers: {
    //         'X-RapidAPI-Key': 'fa264fdff5mshaf102c64fb75600p12a728jsnce42ddceb0dd',
    //         'X-RapidAPI-Host': 'gustar-io-deutsche-rezepte.p.rapidapi.com'
    //     }
    // };

    let options = {
        method: 'GET',
        url: 'https://gustar-io-deutsche-rezepte.p.rapidapi.com/search_api',
        params: {
            text: '',
            ingLimit: '3'},
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
                recipeList = recipeList.concat(response.data)
            } catch (error) {
                console.error(error);
            }
            console.log(recipeList)
            setRecipes(recipeList);
        }
    }

  return (
    <div>
        <Navbar></Navbar>
        <div>
            <input type="submit" value="miau" onClick={(e) => handleGenerateCoupon(e)}></input>
            {
                recipes?.map(recipe => (
                    <div class="rezept-container">
                        <div class="Image"><img width="100%" src={recipe.image_urls[0]}></img></div>
                        <div class="Text">
                            <div class="rezept-titel">{recipe.title}</div>
                            <div class="rezept-zutaten"><p>Zutaten:</p>{recipe.ingredients?.map(zutat => (<p>{zutat.name}</p>))}</div>
                            <div class="rezept-preis">3.99€</div>
                        </div>
                    </div>
                ))
            }
            
        </div>
    </div>
  )
}

export default Coupons
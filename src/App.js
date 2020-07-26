import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";
import { v4 as uuidv4 } from "uuid";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import Recipe from "./components/Recipe";
import  'bootstrap/dist/css/bootstrap.min.css';
import { ButtonGroup, ToggleButton, Button, Modal } from 'react-bootstrap';

import { ToastContainer, toast, Slide, Zoom, Flip, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [query, setQuery] = useState("porridge");
  const [recipes, setRecipes] = useState([]);
  const [radioValue, setRadioValue] = useState('1');

  const radios = [
    { name: 'Chicken', value: 'chicken'},
    { name: 'Bread', value: 'bread' },
    { name: 'Fish', value: 'fish' },
    { name: 'Soup', value: 'soup' },
    { name: 'Rice', value: 'rice' },
    { name: 'Meat', value: 'meat' }
  ];

  // APP_KEY and APP_ID must not be declared in this manner
  // Try to use process.env
  const APP_ID = "4e9f05eb";
  const APP_KEY = "9b904d703fa0d46a88ce1ac63f29f498";

  const url = `https://cors-anywhere.herokuapp.com/https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=12`;

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    if (query !== "") {
      const result = await Axios.get(url)
      if (!result.data.more) {
        return toast.error('No such food', {
          autoClose: 2000
        }, setQuery(""))
      }
      setRecipes(result.data.hits);
      setQuery("");
    } else {
      toast.error('Please fill the form', {
        autoClose: 2000
      })
    }
  };

  const onChange = e => 
  {
    setQuery(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    getData();
  };

  /* See if you can make any changes over here as API is being called 2 times */
  /* Try to pass data to getData like the one above onSubmit... Target: API must be called only once */
  const handleChange = async (e) => {
    let checkValue = e.target.value;
      const result2 = await Axios.get(`https://cors-anywhere.herokuapp.com/https://api.edamam.com/search?q=${checkValue}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=12`);
      setRecipes(result2.data.hits);
  }

  return (
    <>
    <div className="App animated" >

     <div className="background">
    
     <h1>Search Your Favourite Food</h1>
     <br/>
     <form onSubmit={onSubmit} className="search-form">
       <input
         type="text"
         name="query"
         onChange={onChange}
         value={query}
         autoComplete="off"
         placeholder="Search Food"
       />
       <input type="submit" value="Search" />
       <br/>
     </form>

     {/* Button Value */}
     <ButtonGroup toggle style={{width:'100%'}}>
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            type="radio"
            active="true"
            variant="light"
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => {
              handleChange(e);
              setRadioValue(e.currentTarget.value);
            }}
            size="lg"
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
     {/* Button Value Ends */}
     </div>

      <div className="recipes">
        {recipes !== [] &&
          recipes.map(recipe => <Recipe key={uuidv4()} recipe={recipe} />)}
      </div>
    </div> 
    <ToastContainer transition={Bounce} 
    className = 'toast-background'/>
    </>
  );
}

export default App;

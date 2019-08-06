import React from 'react';
import axios from 'axios'
import './App.css';

class MealApp extends React.Component{
  state = {
    searchMealName : '',
    meals: []
  }

  handleTextChange = (e) => {
    this.setState({searchMealName:e.target.value})
  }

  handleSearch = () => {
    this.getmeal(this.state.searchMealName)
  }
  
  getmeal = (mealName) => {
    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`

    axios.get(url)
    // .then(respo => respo.json)
    .then(res => {
      let data = res.data.meals
      
      this.setState({meals:data})     
      
    })
  }

  componentDidMount() {
    this.getmeal()
  }
  render() {
    
    return (
      <div>
        <h1>Welcome to the meal search app</h1>
        <input
        onChange = {this.handleTextChange}
        value = {this.state.searchMealName}
        placeholder = 'enter meal name'
        type = 'text'
        name = 'text'
          />
        <button className='button' onClick = {this.handleSearch} > search </button> 
          {this.state.meals ? (
          <div id='meals-container'>
          {this.state.meals.map((meal, index) => (
          <div className='meal-class' key={index}>
          <h1>{meal.strMeal}</h1>
          <img src={meal.strMealThumb} alt="meal-thumbnail" />
          </div>
          ))}
          </div>
          ) : (
          <p>Try searching for a meal</p>
          )}
          
      </div>
       
    )
  }
}


export default MealApp;

import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props){
    super(props);
    this.state= {
      randomJoke: '',
      previousJokes: [],
      isFetchingJoke: false
    }
  }

  componentDidMount(){
    this._getRandomJoke()
  }

  _getRandomJoke(){
    this.setState({
      isFetchingJoke: true
    })
    //Make AJAX Call to get joke
    axios.get('https://api.icndb.com/jokes/random').then((data) => {
      let newJoke = data.data.value.joke
      this.setState({
        randomJoke: newJoke,
        isFetchingJoke: false
      })
      console.log(newJoke)

    })
  }

  _buttonClick(e){
    e.preventDefault();
    let oldJoke = this.state.randomJoke;
    let oldJokesArray= this.state.previousJokes;
    oldJokesArray.unshift(oldJoke);
    this.setState({
      previousJokes: oldJokesArray
    })
    this._getRandomJoke()
  }

  render() {
    return (
      <div className="main">
        <div className="container">
          <h1 className="title">Chuck Norris' Round House Joke Generator</h1>
        </div>
        <div className="container-2">
          <h2 className="joke">Here's Your Joke:</h2>
          <h2 className="newJoke">{this.state.isFetchingJoke ? 'Loading joke..' : this.state.randomJoke}</h2>
          <button className="button" onClick={(e) => this._buttonClick(e)}>Get Another Joke!</button>
        </div>
        <div className="previousJokes">
          <h2 className="previous">Previous Jokes</h2>
        </div>
        <ul className="list">
          {this.state.previousJokes.map((joke, i) => {
            return <li key={i}>{joke}</li>
          })}
        </ul>
      </div>
    );
  }
}

export default App;

/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable semi */
import React, { Component } from 'react';
import Form from './components/form.js'
import Roll from './components/roll.js'

import './App.css';

class App extends Component {
  constructor(props) {
    super(props)

    // State holds values returned from server
    this.state = {
      about: null,
      message: null,
      rolls: [],
    }
  }

  componentDidMount() {
    // Use Fetch to call API. The /test route returns a simple string
    // This call in componentDidMount will only be called once
    fetch('/about').then((res) => {
      // stream the response as JSON
      return res.json()
    }).then((json) => {
      console.log(json)
      const { about } = json // Get a value from JSON object
      this.setState({ about }) // Set a value on state with returned value
    }).catch((err) => {
      // Handle errors
      console.log(err.message)
    })

    // Let's call another API
    this.fetchMessage()
  }

  fetchMessage(url = "/random/n/99") {
    // Wrapping the API call in a function allow you to make calls to this
    // API as often as needed.

    // This calls a route and passes value in the query string.
    fetch(url).then(res => res.json()).then((json) => {
      console.log(">", json)
      this.setState({
        message: json.value,
      })
    }).catch((err) => {
      console.log(err.message)
    })
  }

  fetchRolls(url = "/random/dice/5/sides/6") {
    // Wrapping the API call in a function allow you to make calls to this
    // API as often as needed.

    // This calls a route and passes value in the query string.
    console.log(url)
    fetch(url).then(res => res.json()).then((json) => {
      console.log(json)
      this.setState({
        rolls: json.rolls,
      })
    }).catch((err) => {
      console.log(err.message)
    })
  }

  renderMessage() {
    // Used to conditionally render data from server.
    // Returns null if message is null otherwise returns
    // a populated JSX element.
    const { message } = this.state
    if (message === null) {
      return undefined
    }

    return <h1>{message}</h1>
  }

  renderRolls() {
    // Used to conditionally render data from server.
    // Returns null if message is null otherwise returns
    // a populated JSX element.
    console.log(this.state)
    const { rolls } = this.state
    if (rolls === null) {
      return undefined
    }

    console.log(rolls)
    return(<div>{

            rolls.map(item => (
              <Roll roll = {item}/>
            ))
          }</div>)
  }

  render() {
    const { about } = this.state

    return (
      <div className="App">
        <p>
          <strong>About:</strong>
          {about}
        </p>
        <div>{this.renderMessage()}</div>
        <p>
          <button
            type="button"
            onClick={() => {
              this.fetchMessage()
            }}
          >
          Random
          </button>
        </p>
        <Form
          submitForm = {(dice, sides) => {
            console.log(dice, sides)
            this.fetchRolls("/random/dice/" + dice + "/sides/" + sides)
          }}
        />
        <div>{this.renderRolls()}</div>
      </div>
    );
  }
}

export default App;

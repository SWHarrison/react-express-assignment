import React, { useState } from 'react'

function Form(props) {
  const [dice, setDice] = useState('')
  const [sides, setSides] = useState('')

  return (
    <div>
      <div className = "Number">
        # of Dice
        <input
          type="number"
          value={dice}
          onChange={(e) => {
            setDice(e.target.value)
          }}
        />
      </div>
      <div className = "Sides">
        # of Sides
        <input
          type="number"
          value={sides}
          onChange={(e) => {
            setSides(e.target.value)
          }}
        />
      </div>
      <button onClick={ () => {
          props.submitForm(dice,sides)
        }
      }>
        Submit
      </button>
    </div>
  )
}

export default Form

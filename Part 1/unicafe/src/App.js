import { useState } from 'react'


// Statistics components
const Statistics = ({good, neutral, bad}) => {
  let total = good + neutral + bad;
  let avg = [good + (neutral * 0) + (bad * -1)] / 3;
  let percentage_positve = [good / (good + neutral + bad)] * 100;
  percentage_positve = percentage_positve.toFixed(1)

if (good == 0 && bad == 0 && neutral == 0) return (
  <p>No feedback given</p>
)
return (
  <div>
  <h1>Statistics</h1>
  <StatisticLine text="good" value ={good} />
  <StatisticLine text="good" value ={good} />
  <StatisticLine text="neutral" value ={neutral} />
  <StatisticLine text="bad" value ={bad} />
  <StatisticLine text="all" value ={total} />
  <StatisticLine text="average" value ={avg} />
  <StatisticLine text="positive" value ={percentage_positve} />
  </div>
)
}

// statistic line component
const StatisticLine = ({text, value}) => {
  if (text === 'positive') return( <p>{text} {value}%</p>)
  return(
    <table>
      <tbody>
        <tr>
        <td>{text}</td>
        <td>{value}</td>
        </tr>
      </tbody>
    </table>
  )
}

// buton component
const Button = ({text, clickHandler}) => {
  return(
    <button onClick={clickHandler}>{text}</button>
  )
}

// App component
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  function handleGood() {
    setGood(good + 1)
  }

  function handleBad() {
    setBad(bad + 1)
  }

  function handleNeutral() {
    setNeutral(neutral + 1)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button  text='good' clickHandler={handleGood}/>
      <Button  text='neutral' clickHandler={handleNeutral}/>
      <Button  text='bad' clickHandler={handleBad}/>

    <Statistics  good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App
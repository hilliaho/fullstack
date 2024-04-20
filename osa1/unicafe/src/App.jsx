import { useState } from 'react'

const Statistics = ({ good, neutral, bad }) => {
  return (
    <div>
      <h1>STATISTICS</h1>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>average {(good + neutral + bad) / 3}</div>
      <div>positive {good / (good + neutral + bad) * 100}%</div>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>GIVE FEEDBACK</h1>
      <button onClick={() => setGood(good + 1)}>
        good
      </button>
      <button onClick={() => setNeutral(neutral + 1)}>
        neutral
      </button>
      <button onClick={() => setBad(bad + 1)}>
        bad
      </button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>

  )
}

export default App
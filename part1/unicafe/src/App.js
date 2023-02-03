import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({ text, value, unit }) => (
  <tr>
    <td>{text}</td>
    <td>{value}{unit}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad }) => {
  const calculateTotal = () => good + neutral + bad
  const calculateAverage = () => (good + -bad) / (good + neutral + bad) // good: 1, neutral: 0, bad: -1
  const calculatePositivePercentage = () => good / (good + neutral + bad) * 100

  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </>
    )
  }

  return (
    <>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="Total" value={calculateTotal()} />
          <StatisticLine text="Average" value={calculateAverage()} />
          <StatisticLine text="Positive" value={calculatePositivePercentage()} unit="%" />
        </tbody>
      </table>
    </>
  )
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClicked = () => setGood(good + 1)
  const handleNeutralClicked = () => setNeutral(neutral + 1)
  const handleBadClicked = () => setBad(bad + 1)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={handleGoodClicked} text="Good" />
      <Button onClick={handleNeutralClicked} text="Neutral" />
      <Button onClick={handleBadClicked} text="Bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
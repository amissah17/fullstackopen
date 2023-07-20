import { useState } from 'react'

const Button = ({ handleGenerator }) => {

  return (
    <button onClick={handleGenerator}>Next anecdotes</button>
  )
}

const Vote = ({ handleVotes }) => {

  return <button onClick={handleVotes}>Vote</button>
}

const App = () => {


  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]


  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0, 0])
  const [mostVote, setMostVote] = useState(0)
  let mV;

  
  

  function handleGenerator() {
    let ind = Math.floor(Math.random() * anecdotes.length)
    setSelected(ind)
  }

  function handleVotes() {
    let newVote = [...votes]
    newVote[selected] += 1
    setVotes(newVote);
    mV = Math.max(...votes)

votes.forEach((value, index) => {
  if (value === mV && mV != 0) {
    setMostVote(index)
      }
    })


  }

    
  
  return (
    <div>
      <div>
        <h2>Anecdotes of the day</h2>
        {anecdotes[selected]}<br />
        <p>has {votes[selected]} votes</p><br />
        <Vote handleVotes={handleVotes} />
        <Button handleGenerator={handleGenerator} /><br />
      </div>
      <div>
        <h2>Anecdotes with most votes</h2>
        <p>{anecdotes[mostVote]}</p>
      </div>



    </div>
  )
}

export default App;
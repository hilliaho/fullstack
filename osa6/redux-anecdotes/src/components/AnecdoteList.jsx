import { useDispatch, useSelector } from "react-redux"
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
  })
  
  const handleVote = (id) => {
    dispatch(vote(id))
    const anecdote = anecdotes.find(a => a.id === id)
    dispatch(setNotification(`you voted ${anecdote.content}`))
    setTimeout(() => {
      dispatch(setNotification(''))
    }, 5000)
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
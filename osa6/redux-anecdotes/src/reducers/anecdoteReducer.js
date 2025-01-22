/* eslint-disable no-case-declarations */
import { createSlice } from "@reduxjs/toolkit"

const anecdotesAtStart = []

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const compare = (anecdote1, anecdote2) => {
  if (anecdote1.votes < anecdote2.votes) {
    return 1
  } else if (anecdote1.votes > anecdote2.votes) {
    return -1
  }
  return 0
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload
      state.push({
        content,
        id: getId(),
        votes: 0
      })
    },
    vote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }

      const changedList = state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
      const sortedList = changedList.sort(compare)
      return sortedList
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { createAnecdote, vote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
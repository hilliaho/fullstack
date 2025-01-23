/* eslint-disable no-case-declarations */
import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdoteService"

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
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    vote(state, action) {
      const changedAnecdote = action.payload
      const changedList = state.map(anecdote => anecdote.id !== changedAnecdote.id ? anecdote : changedAnecdote)
      const sortedList = changedList.sort(compare)
      return sortedList
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { appendAnecdote, vote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const anecdoteToChange = {
      ...anecdote,
      votes: anecdote.votes+1
    }
    const updatedAnecdote = await anecdoteService.update(anecdoteToChange)
    dispatch(vote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer
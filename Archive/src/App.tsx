import { useEffect, useReducer } from 'react'
import './App.css'
import { EventList } from './components/EventList'
import { Filter } from './components/Filter'
import { AddEvent } from './components/AddEvent'
import { reducer } from './lib/reducer'
import { initialState } from './lib/initialState'
import { EventContext } from './lib/Context'
import { getAllEvents } from './lib/api'
import { ActionTypes } from './lib/types'

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    getAllEvents(state.currentFilter)
      .then(res => {
        dispatch({ type: ActionTypes.setEvents, payload: res })
      })
      .catch(error => {
        console.error('Error fetching events:', error)
      })
  }, [state.currentFilter])

  return (
    <EventContext.Provider value={{ state, dispatch }}>
      <Filter />
      <AddEvent />
      <EventList />
    </EventContext.Provider>
  )
}

export default App

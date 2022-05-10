// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = React.useState(() => {
    const item = window.localStorage.getItem(key)
    if (item) return JSON.parse(item)
    return initialValue
  })

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
    // I can do something, if key changes, but I don't
  }, [value, key])

  return [value, setValue]
}

function Greeting({initialName = ''}) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') ?? initialName
  // const [name, setName] = React.useState(
  //   window.localStorage.getItem('name') ?? initialName,
  // )

  // Extra #1
  // const [name, setName] = React.useState(
  //   () => window.localStorage.getItem('name') ?? initialName,
  // )

  // Extra #3 and #4
  const [name, setName] = useLocalStorage('name', initialName)

  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)

  // React.useEffect(() => {
  //   window.localStorage.setItem('name', name)
  // }, [name])

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App

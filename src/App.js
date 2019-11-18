import React, { Component } from 'react'

class App extends Component {
  render() {
    const name = 'John Doe'
    const loading = false
    const showName = true
    return (
      <div className='App'>
        {loading ? <h4>Loading...</h4> : <h1>Hello {showName && name}</h1>}
      </div>
    )
  }
}

export default App

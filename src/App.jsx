import React, { useState } from 'react'
import Keyboard from './components/Keyboard'
import KeyGenerator from './components/KeyGenerator'
import './App.css'

export default function App() {
  const [count, setCount] = useState(0)

  const keys = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
                'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';',
                'z', 'x', 'c', 'v', 'b', 'n', 'm'
  ]

  return (
    <div className="App">
      <KeyGenerator keys={keys} />
      <Keyboard keys={keys} />
    </div>
  )
}

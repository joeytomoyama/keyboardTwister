import React, { useState, useEffect } from 'react'

export default function KeyboardLayout({setKeys}) {
    let currentLayout
    const us = [
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
        'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
        'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';',
        'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/']
    
    const ger = [
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
        'q', 'w', 'e', 'r', 't', 'z', 'u', 'i', 'o', 'p',
        'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';',
        'y', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/']

  return (
    <div className='keyboardLayout'>
      <button onClick={() => {setKeys(us)}}>us</button>
      <button onClick={() => {setKeys(ger)}}>ger</button>
    </div>
  )
}

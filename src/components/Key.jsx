import React, { useState } from 'react'
import './Key.css'

export default function Key({letter, pressedKeys}) {

    return (
        <button className="key" onClick={() => console.log(pressedKeys)}>{letter}</button>
    )
}
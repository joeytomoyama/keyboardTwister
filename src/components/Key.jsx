import React, { useState } from 'react'

export default function Key({letter, pressedKeys}) {

    return (
        <button className="key" onClick={() => console.log(pressedKeys)}>{letter}</button>
    )
}
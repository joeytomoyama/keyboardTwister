import { useState, useEffect } from 'react'
import Key from './Key'

export default function Keyboard({keys, pressedKeys, keysToPress}) {
    const playerColors = ['blue', 'red', 'orange', 'green']

    function makeKeys() {
        return keys.map(key => {
            let keyColor = null
            keysToPress.forEach((userKeys, index) => {
                if (keysToPress[index].includes(key)) keyColor = playerColors[index]
            })
            const isPressed = pressedKeys.includes(key) ? keyColor : null
            // let isPressed = 'black'
            // if (keyColor) {
            //     isPressed = pressedKeys.includes(key) ? keyColor : null
            // }
            // const isPressed = pressedKeys.includes(key) ? 'key-pressed' : 'key' // inline: `${pressedKeys.includes(key) ? 'key-pressed' : 'key'}`
            return <div className={'key centerer'} key={key} style={{
                borderColor: keyColor,
                backgroundColor: isPressed
            }}>
                {key}
            </div>
        })
    }

    return (
        <div className='keyboard'>
            {makeKeys()}
        </div>
    )
}
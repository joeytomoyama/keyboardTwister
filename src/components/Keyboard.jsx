import { useState, useEffect } from 'react'
import Key from './Key'

export default function Keyboard({keys, pressedKeys, keysToPress}) {
    const playerColors = ['blue', 'red', 'orange', 'green']

    function makeKeys() {
        return keys.map(key => {
            let keyColor = 'black'
            keysToPress.forEach((subArray, index) => {
                if (subArray.includes(key)) keyColor = playerColors[index]
            })
            const keyBGColor = pressedKeys.includes(key) ? keyColor : null
            // const keyBGColor = pressedKeys.includes(key) ? 'key-pressed' : 'key' // inline: `${pressedKeys.includes(key) ? 'key-pressed' : 'key'}`
            return <div className={'key centerer'} key={key} style={{
                borderColor: keyColor,
                backgroundColor: keyBGColor
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
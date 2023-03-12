import { useState, useEffect } from 'react'
import Key from './Key'

export default function Keyboard({keys, pressedKeys, checkKeys}) {
    function makeKeys() {
        return keys.map(key => <button className={pressedKeys.includes(key) ? 'key-pressed' : 'key'}
        onClick={() => checkKeys()} key={key}>
            {key}
        </button>)
    }

    return (
        <div className='keyboard'>
            {makeKeys()}
        </div>
    )
}
import { useState, useEffect } from 'react'
import Key from './Key'
import './Keyboard.css'

export default function Keyboard({pressedKeys, keys}) {
    const makeKeys = () => {
        return keys.map(key => <button className={pressedKeys.includes(key) ? 'key-pressed' : 'key'}
        onClick={() => console.log(pressedKeys)} key={key}>
            {key}
            </button>)
    }

    return (
        <div className='keyboard'>
            {makeKeys()}
            {/* <button className="key">{keys.at(0)}</button>
            <button className="key">{keys.at(1)}</button>
            <button className="key">{keys.at(2)}</button>
            <button className="key">{keys.at(3)}</button>
            <button className="key">{keys.at(4)}</button>
            <button className="key">{keys.at(5)}</button>
            <button className="key">{keys.at(6)}</button>
            <button className="key">{keys.at(7)}</button>
            <button className="key">{keys.at(8)}</button>
            <button className="key">{keys.at(9)}</button>

            <button className="key">{keys.at(10)}</button>
            <button className="key">{keys.at(11)}</button>
            <button className="key">{keys.at(12)}</button>
            <button className="key">{keys.at(13)}</button>
            <button className="key">{keys.at(14)}</button>
            <button className="key">{keys.at(15)}</button>
            <button className="key">{keys.at(16)}</button>
            <button className="key">{keys.at(17)}</button>
            <button className="key">{keys.at(18)}</button>
            <button className="key">{keys.at(19)}</button>

            <button className="key">{keys.at(20)}</button>
            <button className="key">{keys.at(21)}</button>
            <button className="key">{keys.at(22)}</button>
            <button className="key">{keys.at(23)}</button>
            <button className="key">{keys.at(24)}</button>
            <button className="key">{keys.at(25)}</button>
            <button className="key">{keys.at(26)}</button> */}
        </div>
    )
}
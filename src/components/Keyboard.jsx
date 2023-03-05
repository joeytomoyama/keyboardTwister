import { useState, useEffect } from 'react'
import KeyGenerator from '../js/KeyGenerator'
import Key from './Key'
import './Keyboard.css'

export default function Keyboard() {
    let [pressedKeys, setPressedKeys] = useState([])

    const layout = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
                    'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';',
                    'z', 'x', 'c', 'v', 'b', 'n', 'm']
    const makeKeys = () => {
        // return layout.map(key => <Key letter={key} pressedKeys={pressedKeys} />)
        return layout.map(key => <button className={pressedKeys.includes(key) ? 'key-pressed' : 'key'}>{key}</button>)
    }

    const keyGenerator = new KeyGenerator(layout)

    useEffect(() => {
        const handleKeyDown = e => {
        if (!pressedKeys.includes(e.key)) pressedKeys.push(e.key)
            setPressedKeys(pressedKeys)
            console.log(pressedKeys)
        }
        const handleKeyUp = e => {
            pressedKeys = pressedKeys.filter(key => key !== e.key)
            setPressedKeys(pressedKeys)
            console.log(pressedKeys)
        }

        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [])

    return (
        <div className='keyboard'>
            {makeKeys()}
            {/* <button className="key">{layout.at(0)}</button>
            <button className="key">{layout.at(1)}</button>
            <button className="key">{layout.at(2)}</button>
            <button className="key">{layout.at(3)}</button>
            <button className="key">{layout.at(4)}</button>
            <button className="key">{layout.at(5)}</button>
            <button className="key">{layout.at(6)}</button>
            <button className="key">{layout.at(7)}</button>
            <button className="key">{layout.at(8)}</button>
            <button className="key">{layout.at(9)}</button>

            <button className="key">{layout.at(10)}</button>
            <button className="key">{layout.at(11)}</button>
            <button className="key">{layout.at(12)}</button>
            <button className="key">{layout.at(13)}</button>
            <button className="key">{layout.at(14)}</button>
            <button className="key">{layout.at(15)}</button>
            <button className="key">{layout.at(16)}</button>
            <button className="key">{layout.at(17)}</button>
            <button className="key">{layout.at(18)}</button>
            <button className="key">{layout.at(19)}</button>

            <button className="key">{layout.at(20)}</button>
            <button className="key">{layout.at(21)}</button>
            <button className="key">{layout.at(22)}</button>
            <button className="key">{layout.at(23)}</button>
            <button className="key">{layout.at(24)}</button>
            <button className="key">{layout.at(25)}</button>
            <button className="key">{layout.at(26)}</button> */}
        </div>
    )
}
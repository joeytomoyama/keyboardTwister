import Key from './Key'
import './Keyboard.css'

export default function Keyboard() {
    const layout = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
                    'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';',
                    'z', 'x', 'c', 'v', 'b', 'n', 'm']
    const makeKeys = () => {
        return layout.map(key => <Key letter={key} />)
    }
    console.log(makeKeys())

    return (
        <div className='keyboard'>
            {makeKeys()}
        </div>
    )
}
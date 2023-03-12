export default function Player({keys, pressedKeys, keysToPress}) {
    // const pressedKeysFormatted = pressedKeys.map(key => <li key={key}>{key}</li>)
    // const keysToPressFormatted = keysToPress.map(key => <li key={key}>{key}</li>)

    return (
        <>
            <ul>pressed keys: {pressedKeys}</ul>
            <ul>to be pressed: {keysToPress}</ul>
        </>
    )
}
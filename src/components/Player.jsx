export default function Player({keys, pressedKeys, toBePressedKeys}) {
    // const pressedKeysFormatted = pressedKeys.map(key => <li key={key}>{key}</li>)
    // const toBePressedKeysFormatted = toBePressedKeys.map(key => <li key={key}>{key}</li>)

    return (
        <>
            <ul>{pressedKeys}</ul>
            <ul>{toBePressedKeys}</ul>
        </>
    )
}
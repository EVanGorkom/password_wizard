import { useState, useEffect } from "react";

function SimplePassword() {
    const [password, setPassword] = useState("");

    // Mocked word bank (can be replaced by an API or local file)
    const wordBank = [
        "password",
        "example",
        "secure",
        "random",
        "simple",
        "user",
    ];

    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    const symbols = ["!","@","#","$","%","^","&","*","-","_","+","=","|",":","/","?"];

    function getRandomWord() {
        const randomIndex = Math.floor(Math.random() * wordBank.length);
        return wordBank[randomIndex];
    }

    function getRandomNumber() {
        return numbers[Math.floor(Math.random() * numbers.length)];
    }

    function getRandomSymbol() {
        return symbols[Math.floor(Math.random() * symbols.length)];
    }

    function randomUpcase(word: string) {
        const chars = word.split("");
        const randomIndex = Math.floor(Math.random() * chars.length);
        chars[randomIndex] = chars[randomIndex].toUpperCase();
        return chars.join("");
    }

    function addSymbolOrNumber(word: string) {
        const shouldAddToStart = Math.random() < 0.5; // 50% chance
        const isNumber = Math.random() < 0.5; // 50% chance for number or symbol
        const char = isNumber ? getRandomNumber() : getRandomSymbol();

        return shouldAddToStart ? `${char}${word}` : `${word}${char}`;
    }

    function generateSimplePassword() {
        const word1 = addSymbolOrNumber(randomUpcase(getRandomWord()));
        const word2 = addSymbolOrNumber(randomUpcase(getRandomWord()));

        const finalPassword = `${word1}${word2}`;
        setPassword(finalPassword);
    }

    useEffect(() => {
        generateSimplePassword();
    }, []); 

    return (
        <div className="simple-password">
        <h2>Your Simple Password</h2>
        <p className="password-output">{password}</p>
        <button
            onClick={generateSimplePassword}
            className="password-generate-button"
        >
            Generate
        </button>
        </div>
    );
}

export { SimplePassword };

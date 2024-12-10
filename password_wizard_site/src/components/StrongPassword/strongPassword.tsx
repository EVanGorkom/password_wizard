import { useState, useEffect } from "react";

function StrongPassword() {
    const [password, setPassword] = useState("");

    const letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    const symbols = ["!","@","#","$","%","^","&","*","-","_","+","=","|",":","/","?"];

    function getRandomLetter() {
        return letters[Math.floor(Math.random() * letters.length)];
    }

    function getRandomNumber() {
        return numbers[Math.floor(Math.random() * numbers.length)];
    }

    function getRandomSymbol() {
        return symbols[Math.floor(Math.random() * symbols.length)];
    }

    function randomUpcase(char: string) {
        return Math.random() < 0.5 ? char.toUpperCase() : char;
    }

    function generateStrongPassword() {
        const minLength = 8;
        const maxLength = 15;
        const passwordLength =
        Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

        const passwordComponents = [];

        // Ensure at least one letter, one number, and one symbol
        passwordComponents.push(randomUpcase(getRandomLetter()));
        passwordComponents.push(getRandomNumber());
        passwordComponents.push(getRandomSymbol());

        // Fill the remaining length with random characters
        while (passwordComponents.length < passwordLength) {
        const charType = Math.floor(Math.random() * 3); // 0 = letter, 1 = number, 2 = symbol
        if (charType === 0) {
            passwordComponents.push(randomUpcase(getRandomLetter()));
        } else if (charType === 1) {
            passwordComponents.push(getRandomNumber());
        } else {
            passwordComponents.push(getRandomSymbol());
        }
        }

        // Shuffle the password components to ensure randomness
        for (let i = passwordComponents.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [passwordComponents[i], passwordComponents[j]] = [
            passwordComponents[j],
            passwordComponents[i],
        ];
        }

        setPassword(passwordComponents.join(""));
    }

    useEffect(() => {
        generateStrongPassword();
    });

    return (
        <div className="strong-password">
        <h2>Your Strong Password</h2>
        <p className="password-output">{password}</p>
        <button
            onClick={generateStrongPassword}
            className="password-generate-button"
        >
            Generate
        </button>
        </div>
    );
}

export { StrongPassword };

import { useState, useEffect } from "react";

// Define the SimplePassword component
function SimplePassword() {
    // State to hold the generated password
    const [password, setPassword] = useState("");

    // Mocked word bank (this can be replaced by fetching from an API or local file)
    const wordBank = [
        "password",
        "example",
        "secure",
        "random",
        "simple",
        "user",
    ];

    // Helper functions
    function getRandomWord() {
        const randomIndex = Math.floor(Math.random() * wordBank.length);
        return wordBank[randomIndex];
    }

    function charReplacement(basePassword: string) {
        const lettersConversionHash: { [key: string]: string[] } = {
            a: ["@", "4"],
            b: ["6", "8"],
            e: ["3"],
            i: ["!", "1"],
            l: ["|", "7"],
            o: ["0"],
            p: ["9"],
            s: ["$", "5"],
            t: ["+"],
            z: ["2"],
        };

        const passwordChars = basePassword.split("");
        let replacementCount = 0;

        while (replacementCount < 2) {
            const index = Math.floor(Math.random() * passwordChars.length);
            const char = passwordChars[index];

            if (lettersConversionHash[char]) {
                const replacements = lettersConversionHash[char];
                passwordChars[index] =
                replacements[Math.floor(Math.random() * replacements.length)];
                replacementCount++;
            }
        }

        return passwordChars.join("");
    }

    function randomUpcase(basePassword: string) {
        const passwordChars = basePassword.split("");
        const randomIndex = Math.floor(Math.random() * passwordChars.length);
        passwordChars[randomIndex] = passwordChars[randomIndex].toUpperCase();
        return passwordChars.join("");
    }

    // Main function to generate the simple password
    function generateSimplePassword() {
        const word1 = getRandomWord();
        const word2 = getRandomWord();

        const alteredWord1 = randomUpcase(charReplacement(word1));
        const alteredWord2 = randomUpcase(charReplacement(word2));

        const finalPassword = `${alteredWord1}${alteredWord2}`;
        setPassword(finalPassword);
    }

    // Generate a password on component mount
    useEffect(() => {
        generateSimplePassword();
    });

    return (
        <div className="simple-password">
            <h2>Your Simple Password</h2>
            <p className="password-output">{password}</p>
        <button
            onClick={generateSimplePassword}
            className="password-generate-button"
        >
            Generate New Password
        </button>
        </div>
    );
}

export { SimplePassword };

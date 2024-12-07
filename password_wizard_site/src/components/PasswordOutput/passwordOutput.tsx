import { useState, useEffect } from "react";

function PasswordOutput() {
    const [password, setPassword] = useState("");
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    const letters = "abcdefghijklmnopqrstuvwxyz".split("");
    const symbols = ["!","@","#","$","%","^","&","*","-","_","+","=","|",":","/","?"];
    const lettersConversionHash = {
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

    // Helper Methods
    const getRandomWord = async () => {
        const words = ["password", "example", "secure", "random"]; // Example word bank
        return words[Math.floor(Math.random() * words.length)];
    };

    const charReplacement = (basePassword: string) => {
        const passwordChars = basePassword.split("");
        let replacementCount = 0;

        while (replacementCount < 2) {
        const index = Math.floor(Math.random() * passwordChars.length);
        const char = passwordChars[index];

        if (lettersConversionHash[char]) {
            passwordChars[index] =
            lettersConversionHash[char][
                Math.floor(Math.random() * lettersConversionHash[char].length)
            ];
            replacementCount++;
        }
        }
        return passwordChars.join("");
    };

    const randomUpcase = (basePassword: string) => {
        const passwordChars = basePassword.split("");
        const randomIndex = Math.floor(Math.random() * passwordChars.length);
        passwordChars[randomIndex] = passwordChars[randomIndex].toUpperCase();
        return passwordChars.join("");
    };

    const simplePassword = async () => {
        const word1 = await getRandomWord();
        const word2 = await getRandomWord();

        if (!word1 || !word2) {
        console.error("Error: Failed to generate random words.");
        return "";
        }

        const alteredWord1 = randomUpcase(charReplacement(word1));
        const alteredWord2 = randomUpcase(charReplacement(word2));

        return `${alteredWord1}${alteredWord2}`;
    };

    // Generate a password when the component mounts
    useEffect(() => {
        (async () => {
        const generatedPassword = await simplePassword();
        setPassword(generatedPassword);
        })();
    }, []);

    // Handle button click
    const handleGeneratePassword = async () => {
        const newPassword = await simplePassword();
        setPassword(newPassword);
    };

    return (
        <div>
        <h1>Your Password: {password}</h1>
        <button
            className="password-generate-button"
            onClick={handleGeneratePassword}
        >
            Generate New Password
        </button>
        </div>
    );
}

export { PasswordOutput };

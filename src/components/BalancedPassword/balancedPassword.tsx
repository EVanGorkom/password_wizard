import { useEffect } from "react";

interface BalancedPasswordProps {
    onPasswordGenerate: (password: string) => void;
    triggerGenerate: number;
}

function BalancedPassword({
    onPasswordGenerate,
    triggerGenerate,
}: BalancedPasswordProps) {
    const wordBank = [
        "password",
        "example",
        "secure",
        "random",
        "balanced",
        "user",
    ];

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
        const eligibleIndexes = passwordChars
        .map((char, index) => (lettersConversionHash[char] ? index : null))
        .filter((index) => index !== null);

        if (eligibleIndexes.length === 0) {
        return basePassword;
        }

        let replacementCount = 0;
        while (replacementCount < 3 && eligibleIndexes.length > 0) {
        const randomIndex = eligibleIndexes[
            Math.floor(Math.random() * eligibleIndexes.length)
        ] as number;

        const char = passwordChars[randomIndex];
        const replacements = lettersConversionHash[char];

        passwordChars[randomIndex] =
            replacements[Math.floor(Math.random() * replacements.length)];
        eligibleIndexes.splice(eligibleIndexes.indexOf(randomIndex), 1);
        replacementCount++;
        }

        return passwordChars.join("");
    }

    function randomUpcase(basePassword: string) {
        const passwordChars = basePassword.split("");
        const randomIndex = Math.floor(Math.random() * passwordChars.length);
        passwordChars[randomIndex] = passwordChars[randomIndex].toUpperCase();
        return passwordChars.join("");
    }

    function generateBalancedPassword() {
        const word1 = getRandomWord();
        const word2 = getRandomWord();

        const alteredWord1 = randomUpcase(charReplacement(word1));
        const alteredWord2 = randomUpcase(charReplacement(word2));

        const finalPassword = `${alteredWord1}${alteredWord2}`;
        onPasswordGenerate(finalPassword);
    }

    useEffect(() => {
        generateBalancedPassword();
    }, [triggerGenerate]);

    return (
        <div className="panel">
            <div className="balanced-password">
            <p>
                This password will consist of a random combination of words with some
                letters being substituted for numbers and symbols where appropriate.
            </p>
            </div>
        </div>
    );
}

export { BalancedPassword };

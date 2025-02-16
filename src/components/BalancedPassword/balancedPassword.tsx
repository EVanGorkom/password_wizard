import { useEffect, useCallback } from "react";

interface BalancedPasswordProps {
    onPasswordGenerate: (password: string) => void;
    triggerGenerate: number;
}

function BalancedPassword({
    onPasswordGenerate,
    triggerGenerate,
}: BalancedPasswordProps) {
    async function getRandomWord(): Promise<string> {
        try {
        const response = await fetch("wordbanks/words.txt");
        if (!response.ok) {
            throw new Error(`Failed to fetch words`);
        }

        const text = await response.text();
        const words = text
            .split("\n")
            .map((word) => word.trim())
            .filter((word) => word.length > 0);

        return words[Math.floor(Math.random() * words.length)];
        } catch (error) {
        console.error("Error loading word bank:", error);
        return "fallback";
        }
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
        .filter((index) => index !== null) as number[];

        if (eligibleIndexes.length === 0) {
        return basePassword;
        }

        let replacementCount = 0;
        while (replacementCount < 2 && eligibleIndexes.length > 0) {
        const randomIndex =
            eligibleIndexes[Math.floor(Math.random() * eligibleIndexes.length)];

        const char = passwordChars[randomIndex];
        const replacements = lettersConversionHash[char];

        passwordChars[randomIndex] =
            replacements[Math.floor(Math.random() * replacements.length)];

        eligibleIndexes.splice(eligibleIndexes.indexOf(randomIndex), 1);
        replacementCount++;
        }

        return passwordChars.join("");
    }

    function randomUpcase(word: string) {
        if (word.length === 0) return word;

        const chars = word.split("");
        const randomIndex = Math.random() < 0.5 ? 0 : chars.length - 1;

        chars[randomIndex] = chars[randomIndex].toUpperCase();
        return chars.join("");
    }

    const generateBalancedPassword = useCallback(async () => {
        const word1 = await getRandomWord();
        const word2 = await getRandomWord();

        const alteredWord1 = randomUpcase(charReplacement(word1));
        const alteredWord2 = randomUpcase(charReplacement(word2));

        const finalPassword = `${alteredWord1}${alteredWord2}`;
        onPasswordGenerate(finalPassword);
    }, [onPasswordGenerate]);

    useEffect(() => {
        generateBalancedPassword();
    }, [triggerGenerate, generateBalancedPassword]);

    return (
        <div className="panel">
        <div className="balanced-password">
            <p>
            This password will consist of a random combination of words with
            letters being substituted for numbers and symbols where appropriate.
            </p>
        </div>
        </div>
    );
}

export { BalancedPassword };

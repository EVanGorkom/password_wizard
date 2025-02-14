import { useEffect, useCallback } from "react";

type SimplePasswordProps = {
    onPasswordGenerate: (password: string) => void;
    triggerGenerate: number;
};

    function SimplePassword({
    onPasswordGenerate,
    triggerGenerate,
        }: SimplePasswordProps) {
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    const symbols = [
        "!",
        "@",
        "#",
        "$",
        "%",
        "^",
        "&",
        "*",
        "-",
        "_",
        "+",
        "=",
        "|",
        ":",
        "/",
        "?",
    ];

    async function fetchRandomWord() {
        try {
        const response = await fetch("words.txt");
        if (!response.ok) {
            throw new Error(`Failed to fetch words.txt: ${response.statusText}`);
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

    const getRandomNumber = useCallback(() => {
        return numbers[Math.floor(Math.random() * numbers.length)];
    }, []);

    const getRandomSymbol = useCallback(() => {
        return symbols[Math.floor(Math.random() * symbols.length)];
    }, []);

    const randomUpcase = useCallback((word: string) => {
        const chars = word.split("");
        const randomIndex = Math.floor(Math.random() * chars.length);
        chars[randomIndex] = chars[randomIndex].toUpperCase();
        return chars.join("");
    }, []);

    const addSymbolOrNumber = useCallback(
        (word: string) => {
        const shouldAddToStart = Math.random() < 0.5;
        const isNumber = Math.random() < 0.5;
        const char = isNumber ? getRandomNumber() : getRandomSymbol();
        return shouldAddToStart ? `${char}${word}` : `${word}${char}`;
        },
        [getRandomNumber, getRandomSymbol]
    );

    const generateSimplePassword = useCallback(async () => {
        const word1 = randomUpcase(await fetchRandomWord());
        const word2 = randomUpcase(await fetchRandomWord());

        const finalPassword = `${addSymbolOrNumber(word1)}${addSymbolOrNumber(
        word2
        )}`;
        onPasswordGenerate(finalPassword);
    }, [addSymbolOrNumber, onPasswordGenerate, randomUpcase]);

    useEffect(() => {
        if (triggerGenerate) {
        generateSimplePassword();
        }
    }, [triggerGenerate, generateSimplePassword]);

    return (
        <div className="panel">
        <div className="simple-password">
            <p>
            This password will consist of a combination of words and include at
            least one symbol, one number, and one uppercase letter.
            </p>
        </div>
        </div>
    );
}

export { SimplePassword };

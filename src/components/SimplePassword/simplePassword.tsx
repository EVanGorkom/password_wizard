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
            const response = await fetch("public/wordbanks/words.txt");
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

    const getRandomNumber = useCallback(() => {
        return numbers[Math.floor(Math.random() * numbers.length)];
    }, []);

    const getRandomSymbol = useCallback(() => {
        return symbols[Math.floor(Math.random() * symbols.length)];
    }, []);

    const randomUpcase = useCallback((word: string) => {
        if (word.length === 0 ) return word;

        const chars = word.split("");
        const randomIndex = Math.random() < 0.5 ? 0 : chars.length - 1;
        
        chars[randomIndex] = chars[randomIndex].toUpperCase();
        return chars.join("");
    }, []);

    const addSymbolOrNumber = useCallback(
        (word: string) => {
            const number = getRandomNumber();
            const symbol = getRandomSymbol();

            const firstChar = Math.random() < 0.5 ? number : symbol;
            const secondChar = firstChar === number ? symbol : number;

            const shouldAddToStart = Math.random() < 0.5;

            if (shouldAddToStart) {
                return `${firstChar}${word}${secondChar}`;
            } else {
                return `${secondChar}${word}${firstChar}`;
            }
        },
        [getRandomNumber, getRandomSymbol]
    );


    const generateSimplePassword = useCallback(async () => {
        const word1 = randomUpcase(await fetchRandomWord());
        const word2 = randomUpcase(await fetchRandomWord());

        const stagingPassword = `${addSymbolOrNumber(word1)}${addSymbolOrNumber(word2)}`;
        const finalPassword = stagingPassword.slice(1);

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

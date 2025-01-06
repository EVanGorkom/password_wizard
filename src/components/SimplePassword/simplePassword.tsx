import { useEffect, useCallback } from "react";

type SimplePasswordProps = {
    onPasswordGenerate: (password: string) => void;
    triggerGenerate: number; 
};

function SimplePassword({
    onPasswordGenerate,
    triggerGenerate,
}: SimplePasswordProps) {
    const wordBank = [
        "password",
        "example",
        "secure",
        "random",
        "simple",
        "user",
    ];
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

    const getRandomWord = useCallback(() => {
        const randomIndex = Math.floor(Math.random() * wordBank.length);
        return wordBank[randomIndex];
    }, []);

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

    const generateSimplePassword = useCallback(() => {
        const word1 = addSymbolOrNumber(randomUpcase(getRandomWord()));
        const word2 = addSymbolOrNumber(randomUpcase(getRandomWord()));

        const finalPassword = `${word1}${word2}`;
        onPasswordGenerate(finalPassword);
    }, [addSymbolOrNumber, getRandomWord, randomUpcase, onPasswordGenerate]);

    useEffect(() => {
        if (triggerGenerate) {
        generateSimplePassword();
        }
    }, [triggerGenerate, generateSimplePassword]);

    return (
        <div className="simple-password">
        <p>
            This password will consist of a combination of words and include at
            least one symbol, one number, and one uppercase letter.
        </p>
        </div>
    );
}

export { SimplePassword };

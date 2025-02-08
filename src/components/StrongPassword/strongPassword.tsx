import { useEffect } from "react";

interface StrongPasswordProps {
    onPasswordGenerate: (password: string) => void;
    triggerGenerate: number;
}

function StrongPassword({
    onPasswordGenerate,
    triggerGenerate,
}: StrongPasswordProps) {
    const letters = "abcdefghijklmnopqrstuvwxyz".split("");
    const numbers = "1234567890".split("");
    const symbols = "!@#$%^&*-_+=|:/?".split("");

    function getRandomItem(array: string[]) {
        return array[Math.floor(Math.random() * array.length)];
    }

    function randomUpcase(char: string) {
        return Math.random() < 0.5 ? char.toUpperCase() : char;
    }

    function generateStrongPassword() {
        const minLength = 10;
        const maxLength = 16;
        const passwordLength =
        Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

        const passwordComponents: string[] = [
        randomUpcase(getRandomItem(letters)),
        getRandomItem(numbers),
        getRandomItem(symbols),
        ];

        while (passwordComponents.length < passwordLength) {
        const charType = Math.floor(Math.random() * 3);
        if (charType === 0)
            passwordComponents.push(randomUpcase(getRandomItem(letters)));
        else if (charType === 1) passwordComponents.push(getRandomItem(numbers));
        else passwordComponents.push(getRandomItem(symbols));
        }

        for (let i = passwordComponents.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [passwordComponents[i], passwordComponents[j]] = [
            passwordComponents[j],
            passwordComponents[i],
        ];
        }

        const finalPassword = passwordComponents.join("");
        onPasswordGenerate(finalPassword);
    }

    useEffect(() => {
        generateStrongPassword();
    }, [triggerGenerate]);

    return (
        <div className="panel">
            <div className="strong-password">
            <p>
                This password will consist of a random combination of letters, symbols,
                and numbers with a random assortment of uppercase letters as well.
            </p>
            </div>
        </div>
    );
}

export { StrongPassword };

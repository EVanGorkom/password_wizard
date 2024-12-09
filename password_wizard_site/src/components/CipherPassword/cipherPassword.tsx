interface CipherPasswordProps {
    userInput: string;
}

function CipherPassword({ userInput }: CipherPasswordProps) {
    const caesarianShift = (input: string, shift: number): string => {
        const letters = "abcdefghijklmnopqrstuvwxyz";
        const shiftedInput = input
        .toLowerCase()
        .split("")
        .map((char) => {
            if (letters.includes(char)) {
            const originalIndex = letters.indexOf(char);
            const shiftedIndex = (originalIndex + shift) % letters.length;
            return letters[shiftedIndex];
            }
            return char; // Non-alphabetical characters remain unchanged
        })
        .join("");

        return shiftedInput;
    };

    const generateCipher = (): string => {
        if (!userInput) return "Enter text to cipher";
        const shift = Math.floor(Math.random() * 25) + 1; // Random shift between 1 and 25
        return caesarianShift(userInput, shift);
    };

    return (
        <div>
        <h3>Ciphered Password:</h3>
        <p className="ciphered-password">{generateCipher()}</p>
        </div>
    );
}

export { CipherPassword };

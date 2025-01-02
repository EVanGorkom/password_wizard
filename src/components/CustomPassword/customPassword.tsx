import { useState } from "react";

interface CustomPasswordProps {
    customInput: string;
    onPasswordGenerate: (password: string) => void;
}

function CustomPassword({
    customInput,
    onPasswordGenerate,
}: CustomPasswordProps) {
    const [includeSymbols, setIncludeSymbols] = useState(false);
    const [includeNumbers, setIncludeNumbers] = useState(false);
    const [applyCipher, setApplyCipher] = useState(false);
    const [applyScramble, setApplyScramble] = useState(false);
    const [applyLeetSpeech, setApplyLeetSpeech] = useState(false);
    const [selectedSymbols, setSelectedSymbols] = useState([
        "!",
        "@",
        "#",
        "$",
        "%",
        "^",
        "&",
        "*",
        "(",
        ")",
    ]);
    const [selectedNumbers, setSelectedNumbers] = useState([
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
    ]);

    const handleGeneratePassword = () => {
        let password = customInput;

        // Add symbols
        if (includeSymbols) {
        const randomSymbol =
            selectedSymbols[Math.floor(Math.random() * selectedSymbols.length)];
        password += randomSymbol;
        }

        // Add numbers
        if (includeNumbers) {
        const randomNumber =
            selectedNumbers[Math.floor(Math.random() * selectedNumbers.length)];
        password += randomNumber;
        }

        // Apply cipher
        if (applyCipher) {
        const caesarianShift = (input: string, shift: number): string => {
            const letters = "abcdefghijklmnopqrstuvwxyz";
            return input
            .toLowerCase()
            .split("")
            .map((char) => {
                if (letters.includes(char)) {
                const originalIndex = letters.indexOf(char);
                const shiftedIndex = (originalIndex + shift) % letters.length;
                return letters[shiftedIndex];
                }
                return char;
            })
            .join("");
        };
        const randomShift = Math.floor(Math.random() * 25) + 1;
        password = caesarianShift(password, randomShift);
        }

        // Scramble the password
        if (applyScramble) {
        password = password
            .split("")
            .sort(() => Math.random() - 0.5)
            .join("");
        }

        // Apply leet speech
        if (applyLeetSpeech) {
        const leetMap: { [key: string]: string } = {
            a: "@",
            e: "3",
            i: "1",
            o: "0",
            s: "$",
            t: "7",
        };
        password = password
            .split("")
            .map((char) => leetMap[char.toLowerCase()] || char)
            .join("");
        }

        onPasswordGenerate(password);
    };

    return (
        <div>
        <p>
            Customize your password by selecting options below. Start with a base
            word or phrase, then add features to increase its security.
        </p>

        <div>
            <label>
            <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
            />
            Add Symbols
            </label>
            {includeSymbols && (
            <div>
                <h4>Select Symbols:</h4>
                {["!", "@", "#", "$", "%", "^", "&", "*", "(", ")"].map(
                (symbol) => (
                    <label key={symbol}>
                    <input
                        type="checkbox"
                        checked={selectedSymbols.includes(symbol)}
                        onChange={(e) => {
                        if (e.target.checked) {
                            setSelectedSymbols((prev) => [...prev, symbol]);
                        } else {
                            setSelectedSymbols((prev) =>
                            prev.filter((s) => s !== symbol)
                            );
                        }
                        }}
                    />
                    {symbol}
                    </label>
                )
                )}
            </div>
            )}
        </div>

        <div>
            <label>
            <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
            />
            Add Numbers
            </label>
            {includeNumbers && (
            <div>
                <h4>Select Numbers:</h4>
                {["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].map(
                (number) => (
                    <label key={number}>
                    <input
                        type="checkbox"
                        checked={selectedNumbers.includes(number)}
                        onChange={(e) => {
                        if (e.target.checked) {
                            setSelectedNumbers((prev) => [...prev, number]);
                        } else {
                            setSelectedNumbers((prev) =>
                            prev.filter((n) => n !== number)
                            );
                        }
                        }}
                    />
                    {number}
                    </label>
                )
                )}
            </div>
            )}
        </div>

        <div>
            <label>
            <input
                type="checkbox"
                checked={applyCipher}
                onChange={(e) => setApplyCipher(e.target.checked)}
            />
            Cipher
            </label>
            <label>
            <input
                type="checkbox"
                checked={applyScramble}
                onChange={(e) => setApplyScramble(e.target.checked)}
            />
            Scramble
            </label>
            <label>
            <input
                type="checkbox"
                checked={applyLeetSpeech}
                onChange={(e) => setApplyLeetSpeech(e.target.checked)}
            />
            Leet Speech
            </label>
        </div>

        <button onClick={handleGeneratePassword}>Generate Password</button>
        </div>
    );
}

export { CustomPassword };

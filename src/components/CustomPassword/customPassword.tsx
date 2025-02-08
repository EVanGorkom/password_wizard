import { useEffect, useState, useCallback } from "react";

interface CustomPasswordProps {
    onPasswordGenerate: (password: string) => void;
    triggerGenerate: number;
}

function CustomPassword({
    onPasswordGenerate,
    triggerGenerate,
}: CustomPasswordProps) {
    const [customInput, setCustomInput] = useState("");
    const [includeSymbols, setIncludeSymbols] = useState(false);
    const [includeNumbers, setIncludeNumbers] = useState(false);
    const [applyScramble, setApplyScramble] = useState(false);
    const [applyLeetSpeech, setApplyLeetSpeech] = useState(false);
    const [applyCipher, setApplyCipher] = useState(false);
    const [selectedSymbols, setSelectedSymbols] = useState([
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

    const handleCustomInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setCustomInput(event.target.value);
    };

    const generatePassword = useCallback(() => {
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
            b: "6",
            l: "|",
            p: "9",
            t: "+",
            z: "2",
        };
        password = password
            .split("")
            .map((char) => leetMap[char.toLowerCase()] || char)
            .join("");
        }

        onPasswordGenerate(password);
    }, [
        customInput,
        includeSymbols,
        includeNumbers,
        applyScramble,
        applyLeetSpeech,
        applyCipher,
        selectedSymbols,
        selectedNumbers,
        onPasswordGenerate,
    ]);

    useEffect(() => {
        generatePassword();
    }, [triggerGenerate, generatePassword]);

    return (
        <div>
        <div className="panel">
            <h4 className="section-title">Base Input</h4>
            <p>
            Start by entering a base word or phrase. This will serve as the
            foundation for your password.
            </p>
            <input
            type="text"
            placeholder="Enter base word/phrase"
            value={customInput}
            onChange={handleCustomInputChange}
            />
        </div>

        <div className="panel">
            <h4 className="section-title">Customization Options:</h4>
            <p>Select additional symbols and numbers to enhance your password:</p>
            
            <div className="symbol-number-button">
                <button 
                    className={`password-button ${includeSymbols ? "active" : ""}`} 
                    onClick={() => setIncludeSymbols(!includeSymbols)}
                    >
                    Adjust Symbol Mix-ins
                </button>

                {includeSymbols && (
                    <div className="symbol-number-container">
                        {["!", "@", "#", "$", "%", "^", "&", "*", "-", "_", "+", "=", "|", ":", "/", "?"].map((symbol) => (
                            <label key={symbol} className={`symbol-number-checkbox ${selectedSymbols.includes(symbol) ? "active" : ""}`}>
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
                        ))}
                    </div>
                )}

                <button 
                    className={`password-button ${includeNumbers ? "active" : ""}`} 
                    onClick={() => setIncludeNumbers(!includeNumbers)}
                    >
                    Adjust Number Mix-ins
                </button>
            </div>

            <div className="symbol-number-container-parent">


                {includeNumbers && (
                    <div className="symbol-number-container">
                        {["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].map(
                            (number) => (
                                <label key={number} className={`symbol-number-checkbox ${selectedNumbers.includes(number) ? "active" : ""}`}>
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

            <h4>Word Mixers:</h4>
            <p>Select one or more mixers to enhance your base password's security:</p>
            <div className="mixer-container">
                <label className={`mixer-option ${applyScramble ? "active" : ""}`}>
                <input
                    type="checkbox"
                    checked={applyScramble}
                    onChange={(e) => setApplyScramble(e.target.checked)}
                    />
                Scramble
                </label>
                <label className={`mixer-option ${applyLeetSpeech ? "active" : ""}`}>
                <input
                    type="checkbox"
                    checked={applyLeetSpeech}
                    onChange={(e) => setApplyLeetSpeech(e.target.checked)}
                    />
                Leet Speech
                </label>
                <label className={`mixer-option ${applyCipher ? "active" : ""}`}>
                <input
                    type="checkbox"
                    checked={applyCipher}
                    onChange={(e) => setApplyCipher(e.target.checked)}
                    />
                Cipher
                </label>
            </div>
            </div>
        </div>
    );
}

export { CustomPassword };

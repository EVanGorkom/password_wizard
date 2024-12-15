interface PasswordOptionsProps {
    setPasswordType: React.Dispatch<
        React.SetStateAction<"simple" | "balanced" | "strong" | "cipher">
    >;
}

function PasswordOptions({ setPasswordType }: PasswordOptionsProps) {
    const handleOptionChange = (
        type: "simple" | "balanced" | "strong" | "cipher") => {
        setPasswordType(type);
    };

    return (
        <div className="flex-auto">
            <button
                onClick={() => handleOptionChange("simple")}
                className="option-button"
            >
                Create Simple Password
            </button>
            <button
                onClick={() => handleOptionChange("balanced")}
                className="option-button"
            >
                Create Balanced Password
            </button>
            <button
                onClick={() => handleOptionChange("strong")}
                className="option-button"
            >
                Create Strong Password
            </button>
            <button
                onClick={() => handleOptionChange("cipher")}
                className="option-button"
            >
                Jumble My Password
            </button>
        </div>
    );
}

export { PasswordOptions };

interface PasswordOptionsProps {
    setPasswordType: React.Dispatch<React.SetStateAction<"simple" | "cipher">>;
}

function PasswordOptions({ setPasswordType }: PasswordOptionsProps) {
    const handleOptionChange = (type: "simple" | "cipher") => {
        setPasswordType(type);
    };

    return (
        <div className="password-options">
        <button
            onClick={() => handleOptionChange("simple")}
            className="option-button"
        >
            Create Simple Password
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
